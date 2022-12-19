import Code from '@hapi/code'
import Lab from '@hapi/lab'
import { deployment } from '../../server/index.js'

export const lab = Lab.script()
const { describe, it, before, after } = lab
const { expect } = Code
let server

before(async () => {
  server = await deployment()
})

after(async () => {
  await server.stop()
})

describe('API', () => {
  describe('Hello', () => {
    it('responds with welcome message', async () => {
      const response = await server.inject('/')

      expect(response.statusCode).to.equal(200)
      expect(response.result).to.be.an.object()
      expect(response.result.message).to.contain('Welcome')
    })
  })
})
