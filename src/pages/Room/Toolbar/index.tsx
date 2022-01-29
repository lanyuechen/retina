import React from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Radio, Toolbar, Box, Badge, Button } from '@mui/material';
import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';
import Popover from '@/components/Popover';

import ButtonWithMenu from './ButtonWithMenu';
import IconWithText from './IconWithText';

interface PropType {
  peers: any[];
  devices: MediaDeviceInfo[];
  onAction: (key: string) => void;
}

const BUTTON_WIDTH = 80;

export default (props: PropType) => {
  const { peers, devices, onAction } = props;
  const me = peers[0] || {};

  const menu = (
    <MenuList>
      <MenuItem onClick={() => onAction('share')}>
        <ListItemIcon>
          <Icon type="share-screen" />
        </ListItemIcon>
        <ListItemText>共享桌面</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onAction('recorder')}>
        <ListItemIcon>
          <Icon type="recording" />
        </ListItemIcon>
        <ListItemText>录制视频</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="setting" />
        </ListItemIcon>
        <ListItemText>设置</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onAction('leave')}>
        <ListItemIcon color="error">
          <Icon type="phone" />
        </ListItemIcon>
        <ListItemText>挂断</ListItemText>
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
    <Toolbar>
      <ButtonWithMenu sx={{width: BUTTON_WIDTH}} menu={audioDevices} onClick={() => onAction('toggle-audio')}>
        <IconWithText icon={<AudioIcon active={me.audioStream} />} text="音频" />
      </ButtonWithMenu>

      <ButtonWithMenu sx={{width: BUTTON_WIDTH}} menu={videoDevices} onClick={() => onAction('toggle-video')}>
        <IconWithText icon={<VideoIcon active={me.videoStream} />} text="视频" />
      </ButtonWithMenu>

      <Button sx={{width: BUTTON_WIDTH}} onClick={() => onAction('show-peers')}>
        <Badge badgeContent={peers.length} color="error">
          <IconWithText icon={<Icon type="user" />} text="参会人" />
        </Badge>
      </Button>

      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button sx={{ width: BUTTON_WIDTH, color: 'rgb(52, 199, 58)' }} onClick={() => onAction('share')}>
          <IconWithText icon={<Icon type="share-screen" />} text="共享" />
        </Button>

        <Button sx={{width: BUTTON_WIDTH}} onClick={() => onAction('recorder')}>
          <IconWithText icon={<Icon type="recording" />} text="录屏" />
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button sx={{width: BUTTON_WIDTH}} color="error" onClick={() => onAction('leave')}>
          <IconWithText icon={<Icon type="phone" />} text="挂断" />
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Popover overlay={menu}>
          <Button sx={{width: BUTTON_WIDTH}}>
            <IconWithText icon={<Icon type="menu" />} text="更多" />
          </Button>
        </Popover>
      </Box>
    </Toolbar>
  );
}
