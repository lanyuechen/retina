import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import Icon from '@/components/Icon';
import { UpOutlined } from '@ant-design/icons';

import style from './style.less';

export default (props: any) => {
  const { dropdown, badge, children, onClick } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
    >
      <MenuItem>
        <ListItemIcon>
          <Icon type="icon-cc" />
        </ListItemIcon>
        <ListItemText>打开字幕</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="icon-live" />
        </ListItemIcon>
        <ListItemText>转播画面</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="icon-effect" />
        </ListItemIcon>
        <ListItemText>特效</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Icon type="icon-setting" />
        </ListItemIcon>
        <ListItemText>设置</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Button variant="text" onClick={onClick} style={{flexDirection: 'column'}}>
      {children}
      {dropdown && (
        <span className={style.extra} onClick={handleClick}>
          <UpOutlined />
        </span>
      )}
      {!!badge && (
        <span className={style.extra}>
          {badge}
        </span>
      )}
      {menu}
    </Button>
  );
}
