import React, { useMemo } from 'react';
import { Drawer, Divider, IconButton, Typography, AppBar, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Icon from '@/components/Icon';
import Loading from '@/components/LoadingFullSize';

import style from './style.module.less';

export default (props: any) => {
  const { drawer, drawerVisible, header, children, loading, onClose } = props;
  const drawerWidth = Math.min(window.innerWidth, props.drawerWidth || 320);
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:600px)');

  const transition = useMemo(() => theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }), [theme]);

  return (
    <div className={style.container}>
      <div
        className={style.main}
        style={{
          marginRight: matches || drawerVisible ? 0 : -drawerWidth,
          transition,
        }}
      >
        <AppBar position="static">
          {header}
        </AppBar>

        <div className={style.content}>
          {loading ? <Loading /> : children}
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
        variant={matches ? 'temporary' : 'persistent'}
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