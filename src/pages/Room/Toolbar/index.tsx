import React from 'react';
import { Stack } from '@mui/material';
import {
  UserAddOutlined,
  MoreOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';
import DropdownButton from './DropdownButton';

interface PropType {
  peers: any[];
  onAction: (key: string) => void;
}

export default (props: PropType) => {
  const { peers, onAction } = props;
  const me = peers[0];

  return (
    <Stack direction="row" alignItems="center" style={{height: '100%'}}>
      <DropdownButton onClick={() => onAction('toggle-audio')} dropdown>
        <AudioIcon active={me.audio} />
        <small style={{fontSize: '10px'}}>麦克风</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('toggle-video')} dropdown>
        <VideoIcon active={me.video} />
        <small style={{fontSize: '10px'}}>摄像头</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('show-peers')} badge={peers.length}>
        <UserAddOutlined />
        <small style={{fontSize: '10px'}}>参会人</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('share')}>
        <Icon type="icon-share-screen" style={{color: 'rgb(52, 199, 58)'}} />
        <small style={{fontSize: '10px'}}>共享</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('share')}>
        <Icon type="icon-recording" />
        <small style={{fontSize: '10px'}}>开始录制</small>
      </DropdownButton>
      <DropdownButton dropdown>
        <MoreOutlined rotate={90} />
        <small style={{fontSize: '10px'}}>更多</small>
      </DropdownButton>

      <DropdownButton onClick={() => onAction('leave')}>
        <PhoneOutlined className="color-danger" rotate={225} />
        <small style={{fontSize: '10px'}}>离开</small>
      </DropdownButton>
    </Stack>
  );
}
