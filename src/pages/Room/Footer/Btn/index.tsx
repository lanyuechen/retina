import React from 'react';
import { Dropdown } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import style from './style.less';

export default (props: any) => {
  const { icon, dropdown, children, onClick, badge, style: containerStyle } = props;
  
  return (
    <span className={style.container} onClick={onClick} style={containerStyle}>
      <div className={style.btn}>
        <div className={style.icon}>
          {icon}
        </div>
        <div className={style.name}>
          {children}
          {badge !== undefined && (
            <small className={style.badge}>
              {badge}
            </small>
          )}
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