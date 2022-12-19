import Code from '@hapi/code'
import Lab from '@hapi/lab'
import { deployment } from '../server/index.js'
import { Package } from '../lib/helpers/pkg.js'

export const lab = Lab.script()
const { describe, it } = lab
const { expect } = Code

describe('Deployment', () => {
  it('registers the main plugin.', async () => {
    const server = await deployment()

    expect(server.registrations[Package.name]).to.exist()
  })
})
