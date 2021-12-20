import React from 'react';
import { Avatar, Tag } from 'antd';
import AspectCard from '@/components/AspectCard';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import Video from '@/components/Video';
import Tool from '@/components/Tool';

import style from './style.less';

interface PropType {
  peer: any;
  active?: boolean;
  showTag?: boolean;
  showTool?: boolean;
  cover?: boolean;
}

export default (props: PropType) => {
  const { peer, showTag = true, showTool = true, cover } = props;

  return (
    <AspectCard className={style.container} active={true} cover={cover}>
      <Video src={peer.mediaStream} />

      {/* {!peer.video && (
        <Avatar
          size={80}
          style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
        >
          {peer.nickname}
        </Avatar>
      )} */}
      
      {showTag && (
        <Tag className={style.tag}>
          {peer.audio ? <AudioOutlined /> : <AudioMutedOutlined className="color-danger" />}
          <span className={style.name}>
            {peer.nickname}
            {peer.isMe ? '(我)' : ''}
          </span>
        </Tag>
      )}

      {showTool && <Tool className={style.tool} peer={peer} />}

    </AspectCard>
  );
};
