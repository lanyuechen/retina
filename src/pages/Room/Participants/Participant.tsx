import React from 'react';
import { List, Avatar } from 'antd';
import { AudioIcon, VideoIcon } from '@/components/ToggleIcon';
import Tool from '@/components/Tool';
import style from './style.less';

export default (props: {peer: any}) => {
  const { peer } = props;

  return (
    <List.Item
      className={style.peer}
      actions={[
        <span key="1">
          <AudioIcon active={peer.audio} />
        </span>, 
        <span key="2">
          <VideoIcon active={peer.video} />
        </span>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {peer.nickname && peer.nickname[0].toUpperCase()}
          </Avatar>
        }
        title={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
        description={peer.isMe && <div className={style.host}>主持人</div>}
      />
      
      <Tool className={style.tool} peer={peer} />

    </List.Item>
  )
}