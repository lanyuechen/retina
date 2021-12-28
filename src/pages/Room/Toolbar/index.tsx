import React from 'react';
import { Stack, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Radio } from '@mui/material';
import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';
import DropdownButton from './DropdownButton';

interface PropType {
  peers: any[];
  devices: MediaDeviceInfo[];
  onAction: (key: string) => void;
}

export default (props: PropType) => {
  const { peers, devices, onAction } = props;
  const me = peers[0];

  const menu = (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <Icon type="cc" />
        </ListItemIcon>
        <ListItemText>打开字幕</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="live" />
        </ListItemIcon>
        <ListItemText>转播画面</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="effect" />
        </ListItemIcon>
        <ListItemText>特效</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="setting" />
        </ListItemIcon>
        <ListItemText>设置</ListItemText>
      </MenuItem>
    </MenuList>
  );

  const videoDevices = (
    <MenuList>
      {devices.filter(d => d.kind === 'videoinput').map(d => (
        <MenuItem key={d.deviceId}>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemText><Icon type="camera" /> {d.label}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );

  const audioDevices = (
    <MenuList>
      {devices.filter(d => d.kind === 'audioinput').map(d => (
        <MenuItem key={d.deviceId}>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemText><Icon type="mic" /> {d.label}</ListItemText>
        </MenuItem>
      ))}
      <Divider />
      {devices.filter(d => d.kind === 'audioinput').map(d => (
        <MenuItem key={d.deviceId}>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemText><Icon type="mic" /> {d.label}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <Stack direction="row" alignItems="center" style={{height: '100%'}}>
      <DropdownButton onClick={() => onAction('toggle-audio')} dropdown={audioDevices}>
        <AudioIcon active={!me.audioStream} />
        <small style={{fontSize: '10px'}}>麦克风</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('toggle-video')} dropdown={videoDevices}>
        <VideoIcon active={!me.videoStream} />
        <small style={{fontSize: '10px'}}>摄像头</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('show-peers')} badge={peers.length}>
        <Icon type="user" />
        <small style={{fontSize: '10px'}}>参会人</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('share')}>
        <Icon type="share-screen" style={{color: 'rgb(52, 199, 58)'}} />
        <small style={{fontSize: '10px'}}>共享</small>
      </DropdownButton>
      <DropdownButton onClick={() => onAction('share')}>
        <Icon type="recording" />
        <small style={{fontSize: '10px'}}>开始录制</small>
      </DropdownButton>
      <DropdownButton dropdown={menu}>
        <Icon type="more" rotate={90} />
        <small style={{fontSize: '10px'}}>更多</small>
      </DropdownButton>

      <DropdownButton onClick={() => onAction('leave')}>
        <Icon type="phone" danger />
        <small style={{fontSize: '10px'}}>离开</small>
      </DropdownButton>
    </Stack>
  );
}
