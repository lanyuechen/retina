import React from 'react';

import style from './style.less';

export default (props: any) => {
  const { children, width } = props;

  return (
    <div
      className={style.aspectCard}
      style={{ width }}
    >
      <div>
        {children}
      </div>
    </div>
  );
}