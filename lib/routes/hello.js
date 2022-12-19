export default {
  method: 'GET',
  path: '/',
  handler: (request) => {
    request.server.logger.info('Welcome to API!')
    return { message: 'Welcome' }
  }
}
