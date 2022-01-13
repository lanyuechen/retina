import React, { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Collapse } from '@mui/material';


import style from './style.module.less';

export default (props: any) => {
  const { room } = props;
  const [ messages, setMessages ] = useState<any>([]);

  useEffect(() => {
    room.on('data-channel-message', (message: any) => {
      updateList(message);
    });
  }, []);

  const updateList = (message: any) => {
    setMessages((msgs: any[]) => [
      ...msgs,
      {
        id: Math.random() + '',
        message,
        ct: new Date().toISOString(),
      }
    ])
  }

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      room.broadcast({
        text: e.target.value,
      });

      updateList({ text: e.target.value });
      
      e.target.value = '';
    }
  }

  return (
    <div className={style.chat}>
      <List>
        <TransitionGroup>
          {messages.map((item: any) => (
            <Collapse key={item.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    L
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.message.text} secondary={item.ct} />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>

      <input type="text" placeholder="说些什么" onKeyUp={handleKeyPress} />
    </div>
  )
}