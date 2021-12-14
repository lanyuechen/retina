import React from 'react';
import style from './style.less';

export default (props: any) => {
  const { aspect = 0.55, className, children, active, cover } = props;

  if (cover) {
    return (
      <div
        className={`${style.box} ${className || ''} ${active ? style.active : ''}`}
        style={{width: '100%', height: '100%'}}
      >
        <div className={style.container}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`${style.box} ${className || ''} ${active ? style.active : ''}`}>
      <div className={style.back} style={{paddingBottom: `${aspect * 100}%`}}> </div>
      <div className={style.container}>
        {children}
      </div>
    </div>
  );
}