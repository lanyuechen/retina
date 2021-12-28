import React from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { VideoIcon, PinIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';

interface PropType {
  peer: any;
  [key: string]: any;
}

export default (props: PropType) => {
  const { peer } = props;

  return (
    <MenuList>
      <MenuItem key="toggle-video">
        <ListItemIcon>
          <VideoIcon active={!peer.video} />
        </ListItemIcon>
        <ListItemText>{peer.video ? '关闭视频' : '开启视频'}</ListItemText>
      </MenuItem>
      <MenuItem key="toggle-pin">
        <ListItemIcon>
          <PinIcon active={!peer.pinned} />
        </ListItemIcon>
        <ListItemText>{peer.pinned ? '取消固定' : '固定视频'}</ListItemText>
      </MenuItem>
      <MenuItem key="set-host">
        <ListItemIcon>
          <Icon type="user" />
        </ListItemIcon>
        <ListItemText>设为主持人</ListItemText>
      </MenuItem>
      <MenuItem key="set-uion-host">
        <ListItemIcon>
          <Icon type="user" />
        </ListItemIcon>
        <ListItemText>设为联席主持人</ListItemText>
      </MenuItem>
      <MenuItem key="remove">
        <ListItemIcon>
          <Icon type="user-delete" danger />
        </ListItemIcon>
        <ListItemText>从会议中移除</ListItemText>
      </MenuItem>
    </MenuList>
  );
};
