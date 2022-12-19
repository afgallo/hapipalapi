/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
export default (server, options) => {
  return {
    options: {
      auth: false,
      onConnection: (socket) => {
        console.log('New client connected', socket.id)
      },
      onDisconnection: (socket) => {
        console.log('Client disconnected', socket.id)
      },
      onMessage: (socket, message) => {
        console.log('message received', socket.id, message)
      }
    }
  }
}
