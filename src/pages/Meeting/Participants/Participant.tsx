import React from 'react';
import { List, Avatar } from 'antd';
import { AudioIcon, VideoIcon } from '@/component/ToggleIcon';
import { ParticipantType } from '../data';
import Tool from '@/pages/Meeting/Tool';
import style from './style.module.scss';

export default (props: {participant: ParticipantType}) => {
  const { participant } = props;

  return (
    <List.Item
      className={style.participant}
      actions={[
        <span>
          <AudioIcon active={participant.audio} />
        </span>, 
        <span>
          <VideoIcon active={participant.video} />
        </span>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {participant.peerName && participant.peerName[0].toUpperCase()}
          </Avatar>
        }
        title={`${participant.peerName}${participant.local ? '(我)' : ''}`}
        description={participant.local && <div className={style.host}>主持人</div>}
      />
      
      <Tool className={style.tool} participant={participant} />

    </List.Item>
  )
}