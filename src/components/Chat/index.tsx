import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import Icon from '@/components/Icon';

import style from './style.module.less';

export default () => {
  const [ list, setList ] = useState<any>([]);

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
        {list.map((d: any) => (
          <li key={d.id}>
            <Avatar>
              {d.user.peerName && d.user.peerName[0].toUpperCase()}
            </Avatar>
            {d.content}
          </li>
        ))}
      </ul>
      <div className={style.input}>
        <input type="text" placeholder="说些什么" onKeyUp={handleKeyPress} />
        <span className={style.prefix}>
          <Icon type="right" />
        </span>
        <span className={style.suffix}>
          <Icon type="like" />
        </span>
      </div>
    </div>
  )
}