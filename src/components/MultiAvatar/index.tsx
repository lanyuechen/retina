import { useMemo } from 'react';
import multiavatar from './multiavatar';

import style from './style.module.less';

export default () => {
  const html = useMemo(() => multiavatar(), []);

  return (
    <div className={style.multiavatar} dangerouslySetInnerHTML={{__html: html}} />
  );
}