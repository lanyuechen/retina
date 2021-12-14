import React, { useContext } from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { AudioIcon } from '@/component/ToggleIcon';
import { ParticipantType } from '@/pages/Meeting/data';
import { MeetingContext } from '@/pages/Meeting';
import ExtraMenu from './ExtraMenu';
import style from './style.module.scss';

interface PropType {
  className?: string;
  participant: ParticipantType;
}

export default (props: PropType) => {
  const { service } = useContext(MeetingContext);
  const { participant, className } = props;

  return (
    <div className={`${style.tool} ${className ? className : ''}`}>
      <Tooltip title="静音">
        <Button
          onClick={participant.audio ? service.stopLocalAudio : service.startLocalAudio}
          shape="circle"
          icon={<AudioIcon active={participant.audio} />}
        />
      </Tooltip>
    
      <Dropdown
        overlay={<ExtraMenu participant={participant} />}
        trigger={['click']}
      >
        <Button shape="circle" icon={<MoreOutlined rotate={90} />} />
      </Dropdown>
    </div>
  );
};
