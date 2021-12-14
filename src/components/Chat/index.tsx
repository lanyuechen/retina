import React, { useState } from 'react';
import { Avatar } from 'antd';
import { RightOutlined, LikeOutlined } from '@ant-design/icons';
import style from './style.less';

export default () => {
  const [ list, setList ] = useState([]);

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      setList([
        ...list, 
        {
          id: Math.random() + '',
          content: e.target.value,
          user: {
            peerName: 'L'
          }
        }
      ]);
      e.target.value = '';
    }
  }

  return (
    <div className={style.chat}>
      <ul className={style.message}>
        {list.map(d => (
          <li key={d.id}>
            <Avatar size={20}>
              {d.user.peerName && d.user.peerName[0].toUpperCase()}
            </Avatar>
            {d.content}
          </li>
        ))}
      </ul>
      <div className={style.input}>
        <input type="text" placeholder="说些什么" onKeyUp={handleKeyPress} />
        <span className={style.prefix}>
          <RightOutlined />
        </span>
        <span className={style.suffix}>
          <LikeOutlined />
        </span>
      </div>
    </div>
  )
}