/* eslint-disable no-console */

const COLORS: any = {
  info: '#409EFF',
  warn: '#E6A23C',
  error: '#F56C6C',
};

const SCOPE = [
  'WebSocket',
  'webRTC',
  'achex',
  'room'
];

const log = (type: string) => (group: string, ...args: any[]) => {
  if (!SCOPE.includes(group)) {
    return;
  }

  const color = COLORS[type];
  const [desc, ...others] = args;

  const params = [
    `%c ${group} %c`,
    `background: ${color}; padding: 1px; border-radius: 3px; color: #fff`,
    'background:transparent',
    desc
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
