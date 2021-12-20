export default {
  '/socket.io': {
    target: 'http://47.93.45.233:8080',
    ws: true,
    // pathRewrite: { '/socket.io': '' },
    // changeOrigin: true,
    // secure: false,
  },
}