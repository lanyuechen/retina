import React from 'react';
import { Box, Avatar, Chip } from '@mui/material';
import AspectCard from '@/components/AspectCard';
import Video from '@/components/Video';
import Tool from '@/components/Tool';
import { AudioIcon } from '@/components/SwitchButton';

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

      {!peer.video && (
        <div className={style.icon}>
          <Avatar>
            {peer.nickname}
          </Avatar>
        </div>
      )}

      {showTag && (
        <Chip
          size="small"
          className={style.tag}
          icon={<AudioIcon active={peer.audio} />}
          label={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
        />
      )}

      {showTool && <Tool className={style.tool} peer={peer} />}

    </AspectCard>
  );
};
