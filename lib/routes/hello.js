export default {
  method: 'GET',
  path: '/',
  handler: (request) => {
    request.logger.info('Welcome to API!')
    return { message: 'Hi', serverDateTime: new Date() }
  }
}
