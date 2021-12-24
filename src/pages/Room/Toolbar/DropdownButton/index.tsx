import React from 'react';
import { Button, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Icon from '@/components/Icon';
import Popover from '@/components/Popover';

import style from './style.less';

export default (props: any) => {
  const { dropdown, badge, children, onClick } = props;

  const menu = (
    <MenuList>
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
    </MenuList>
  );

  return (
    <Button variant="text" onClick={onClick} style={{flexDirection: 'column'}}>
      {children}
      {dropdown && (
        <Popover overlay={menu}>
          <span className={style.extra}>
            <Icon type="up" />
          </span>
        </Popover>
      )}
      {!!badge && (
        <Popover overlay={menu}>
          <span className={style.extra}>
            {badge}
          </span>
        </Popover>
      )}
    </Button>
  );
}
