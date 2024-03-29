import Path from 'path'
import Glue from '@hapi/glue'
import Exiting from 'exiting'
import { pathToFileURL } from 'url'
import Manifest from './manifest.js'

export const deployment = async ({ start } = {}) => {
  const manifest = Manifest.get('/', process.env)
  const server = await Glue.compose(manifest, { relativeTo: Path.resolve(process.cwd(), './lib') })

  if (start) {
    await Exiting.createManager(server).start()
    server.log(['start'], `Server started at ${server.info.uri}`)
    server.logger.debug('Server loaded with manifest %s', JSON.stringify(manifest, null, 2))
    return server
  }

  await server.initialize()

  return server
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  // module was not imported but called directly
  await deployment({ start: true })

  process.on('unhandledRejection', (e) => {
    throw e
  })
}
