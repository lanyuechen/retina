import React from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { VideoIcon, PinIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';

interface PropType {
  peer: any;
  [key: string]: any;
}

export default (props: PropType) => {
  const { peer } = props;
  const theme = useTheme();

  return (
    <MenuList>
      <MenuItem key="toggle-video">
        <ListItemIcon>
          <VideoIcon active={!peer.videoStream} />
        </ListItemIcon>
        <ListItemText>{peer.videoStream ? '关闭视频' : '开启视频'}</ListItemText>
      </MenuItem>
      <MenuItem key="toggle-pin">
        <ListItemIcon>
          <PinIcon active={!peer.pinned} />
        </ListItemIcon>
        <ListItemText>{peer.pinned ? '取消固定' : '固定视频'}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem key="remove" sx={{color: theme.palette.error.main}}>
        <ListItemIcon>
          <Icon type="user-delete" danger />
        </ListItemIcon>
        <ListItemText>从房间中移除</ListItemText>
      </MenuItem>
    </MenuList>
  );
};
