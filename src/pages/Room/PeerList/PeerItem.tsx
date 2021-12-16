import React from 'react';
import { List, Avatar } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

import Icon from '@/components/Icon';
import Tool from '@/components/Tool';

import style from './style.less';

export default (props: {peer: any}) => {
  const { peer } = props;
  console.log('====', peer)

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