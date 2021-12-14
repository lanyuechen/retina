import React from 'react';
import { Avatar, Tag } from 'antd';
import AspectCard from '@/component/AspectCard';
import { AudioIcon } from '@/component/ToggleIcon';
import VideoView from './VideoView';
import { ParticipantType } from '@/pages/Meeting/data';
import Tool from '@/pages/Meeting/Tool';
import style from './style.module.scss';

interface PropType {
  participant: ParticipantType;
  active?: boolean;
  showTag?: boolean;
  showTool?: boolean;
  cover?: boolean;
}

export default (props: PropType) => {
  const { participant, showTag = true, showTool = true, cover } = props;

  return (
    <AspectCard className={style.container} active={participant.active} cover={cover}>
      <VideoView participant={participant} />

      {!participant.video && (
        <Avatar
          size={80}
          style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
        >
          {participant.peerName}
        </Avatar>
      )}
      
      {showTag && <Tag className={style.tag}>
        {/* <span className={style.host}>主持人</span> */}
        {!participant.audio && <AudioIcon active={false} />}
        <span className={style.name}>
          {participant.peerName}
          {participant.local ? '(我)' : ''}
        </span>
      </Tag>}

      {showTool && <Tool className={style.tool} participant={participant} />}

    </AspectCard>
  );
};
