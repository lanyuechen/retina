/* eslint-disable no-console */

const COLORS: any = {
  info: '#000000',
  warn: '#E6A23C',
  error: '#F56C6C',
};

const SCOPE: any = {
  // WebSocket: 'darkgoldenrod',
  achex: 'darkcyan',
  webRTC: 'darkseagreen',
  room: 'darksalmon',
}

const log = (type: string) => (group: string, ...args: any[]) => {
  if (!SCOPE[group]) {
    return;
  }

  const groupColor = SCOPE[group] || '#409EFF';
  const typeColor = COLORS[type];
  
  const [desc, ...others] = args;

  const now = (window.performance.now() / 1000).toFixed(3);

  const params = [
    `%c ${now} %c ${group} %c ${desc}`,
    'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff; font-weight: bold;',
    `background: ${groupColor}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff; font-weight: bold;`,
    `color: ${typeColor}; font-weight: bold;`,
  ];

  if (others.length) {
    console.groupCollapsed(...params);
    console.log(...others);
    console.groupEnd();
  } else {
    console.log(...params);
  }
}

export default {
  info: log('info'),
  warn: log('warn'),
  error: log('error'),
}
