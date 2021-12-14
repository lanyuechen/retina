import React from 'react';
import { Avatar, Tag } from 'antd';
import AspectCard from '@/components/AspectCard';
import { AudioIcon } from '@/components/ToggleIcon';
import Video from '@/components/Video';
import Tool from '@/components/Tool';

import style from './style.less';

interface PropType {
  peer: any;
  active?: boolean;
  showTool?: boolean;
  cover?: boolean;
}

export default (props: PropType) => {
  const { peer, showTool = true, cover } = props;

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
      
      <Tag className={style.tag}>
        {!peer.audio && <AudioIcon active={false} />}
        <span className={style.name}>
          {peer.nickname}
          {peer.isMe ? '(我)' : ''}
        </span>
      </Tag>

      {showTool && <Tool className={style.tool} peer={peer} />}

    </AspectCard>
  );
};
