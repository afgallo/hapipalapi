import Path from 'path'
import Dotenv from 'dotenv'
import Confidence from '@hapipal/confidence'
import Toys from '@hapipal/toys'

// Pull .env into process.env
Dotenv.config({ path: Path.resolve(process.cwd(), 'src/server', '.env') })

// Glue manifest as a confidence store
export default new Confidence.Store({
  server: {
    host: '0.0.0.0',
    port: {
      $param: 'PORT',
      $coerce: 'number',
      $default: 3000
    },
    debug: false
  },
  register: {
    plugins: [
      {
        plugin: '../src/lib', // Main plugin
        options: {}
      },
      {
        plugin: 'hapi-pino',
        options: {
          $filter: 'NODE_ENV',
          $default: {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true
              }
            }
          },
          test: {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true
              }
            },
            level: {
              $filter: { $env: 'ENABLE_LOG_TEST' },
              $default: 'silent',
              1: 'debug'
            },
            logEvents: {
              $filter: { $env: 'ENABLE_LOG_TEST' },
              $default: false,
              1: ['onPostStart', 'onPostStop', 'response', 'request-error']
            }
          }
          // Override for Production
          // production: {}
        }
      },
      {
        plugin: {
          $filter: 'NODE_ENV',
          $default: '@hapipal/hpal-debug',
          production: Toys.noop
        }
      }
    ]
  }
})
