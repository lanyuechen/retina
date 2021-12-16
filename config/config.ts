import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

let publicPath = '/retina/';
if (process.env.NODE_ENV === 'production') {
  publicPath = 'https://cdn.jsdelivr.net/gh/lanyuechen/retina@gh-pages/';
}

export default defineConfig({
  title: 'RETINA',
  history: {
    type: 'hash'
  },
  ignoreMomentLocale: true,
  routes,
  proxy,
  hash: true,
  publicPath,  // jsdelivr cdn 加速
  antd: {},
  define: {
    PUBLIC_PATH: publicPath,
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
});
