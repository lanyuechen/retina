import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log(process.env.NODE_ENV)

let base = '/';
if (process.env.NODE_ENV === 'production') {
  // base = '/retina/';
  base = 'https://cdn.jsdelivr.net/gh/lanyuechen/retina@gh-pages/';
}

// https://vitejs.dev/config/
export default defineConfig({
  base,
  build: {
    assetsDir: ''
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://47.93.45.233:8080',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [react()],
})
