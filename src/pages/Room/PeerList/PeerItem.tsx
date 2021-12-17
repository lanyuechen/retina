import React from 'react';
import { List, Avatar } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

import Icon from '@/components/Icon';
import Tool from '@/components/Tool';
import useRoom from '@/utils/use-room';

import style from './style.less';

export default (props: {peer: any}) => {
  const { peer } = props;

  const room = useRoom();

  const handleAction = (key: string) => {
    if (key === 'toggle-video') {
      room.toggleVideo();
    } else if (key === 'toggle-audio') {
      room.toggleAudio();
    }
  }

  return (
    <List.Item
      className={style.peer}
      actions={[
        <span key="1">
          {peer.audio ? <AudioOutlined /> : <AudioMutedOutlined className="color-danger" />}
        </span>, 
        <span key="2">
          {peer.video ? <Icon type="icon-camera" /> : <Icon type="icon-camera-disabled" className="color-danger" />}
        </span>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {peer.nickname}
          </Avatar>
        }
        title={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
        description={peer.isMe && <div className={style.host}>主持人</div>}
      />
      
      <Tool className={style.tool} peer={peer} onAction={handleAction} />

    </List.Item>
  )
}