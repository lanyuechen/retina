import React from 'react';
import { Dropdown } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import style from './style.module.scss';

export default (props: any) => {
  const { icon, dropdown, children, onClick, style: containerStyle } = props;
  
  return (
    <span className={style.container} onClick={onClick} style={containerStyle}>
      <div className={style.btn}>
        <div className={style.icon}>
          {icon}
        </div>
        <div className={style.name}>
          {children}
        </div>
      </div>
      {dropdown && (
        <Dropdown overlay={dropdown} placement="topCenter">
          <span className={style.suffix} onClick={(e) => e.stopPropagation()}>
            <UpOutlined />
          </span>
        </Dropdown>
      )}
    </span>
  )
}