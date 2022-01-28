import React, { useMemo } from 'react';
import { Drawer, Divider, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import Icon from '@/components/Icon';

import style from './style.module.less';

export default (props: any) => {
  const { drawer, drawerVisible, drawerWidth = 320, header, children, onClose } = props;
  const theme = useTheme();

  const transition = useMemo(() => theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }), [theme]);

  return (
    <div className={style.container}>
      <div
        className={style.main}
        style={{
          marginRight: drawerVisible ? 0 : -drawerWidth,
          transition,
        }}
      >
        <AppBar position="static">
          {header}
        </AppBar>

        <div className={style.content}>
          {children}
        </div>

        <AppBar position="static" color="default">
          {props.toolbar}
        </AppBar>
      </div>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={drawerVisible}
      >
        <Toolbar variant="dense">
          <IconButton onClick={onClose} color="inherit" edge="start" sx={{ mr: 1 }}>
            <Icon type="right" />
          </IconButton>
          <Typography variant="h6">
            参会人
          </Typography>
        </Toolbar>

        <Divider />
        
        {drawer}
      </Drawer>
    </div>
  );
}