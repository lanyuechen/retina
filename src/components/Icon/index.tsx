import React from 'react';

import style from './style.less';

export default (props: any) => {
  const { type, className = '', rotate } = props;

  return (
    <span className={`${style.icon} ${className}`}>
      <svg
        aria-hidden="true"
        style={{
          transform: `rotate(${rotate}deg)`
        }}
      >
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    </span>
  );
}