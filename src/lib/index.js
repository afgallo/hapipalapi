import HauteCouture from '@hapipal/haute-couture'
import { Package } from './helpers/pkg.js'

export const plugin = {
  pkg: Package,
  register: async (server, options) => {
    await HauteCouture.compose(server, options)
  }
}
