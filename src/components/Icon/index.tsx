import React from 'react';

import style from './style.module.less';

export default (props: any) => {
  const { type, className = '', rotate, danger } = props;

  return (
    <span className={`${style.icon} ${className}`}>
      <svg
        aria-hidden="true"
        style={{
          transform: `rotate(${rotate}deg)`,
          color: danger ? '#ef5350' : undefined,
        }}
      >
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    </span>
  );
}