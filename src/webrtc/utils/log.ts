/* eslint-disable no-console */
export function trace(text: string, ...others: any[]) {
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(
    `%c [${now}] %c ${text} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent',
    ...others
  );
}