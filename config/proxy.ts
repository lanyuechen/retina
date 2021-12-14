export default {
  '/socket.io': {
    target: 'http://localhost:8080',
    ws: true,
    // pathRewrite: { '/socket.io': '' },
    // changeOrigin: true,
    // secure: false,
  },
}