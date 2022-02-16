import React from 'react';

import style from './style.module.less';

export default (props: any) => {
  const { children } = props;

  return (
    <div
      className={style.aspectCard}
      style={props.style}
    >
      <div>
        {children}
      </div>
    </div>
  );
}