import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Button, Typography, Card, CardContent, CardActions, Stack, Toolbar } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@/components/Icon';
import Timer from '@/components/Timer';
import Popover from '@/components/Popover';
import message from '@/components/message';

import style from './style.module.less';

const menuData = [
  { name: 'gallery', title: '宫格视图', icon: 'layout-grid' },
  { name: 'speaker', title: '演讲者视图', icon: 'layout-speaker' },
];

export default (props: any) => {
  const { layout, onLayoutChange } = props;
  const { id } = useParams<{id: string}>();

  const menuInfo = (
    <Card sx={{ width: 320 }}>
      <CardContent>
        <Typography variant="subtitle2">
          房间ID
        </Typography>
        <Typography variant="body2" sx={{color: '#888'}} gutterBottom>
          {id}
        </Typography>

        <Typography variant="subtitle2">
          房间链接
        </Typography>
        <Typography variant="body2" sx={{color: '#888'}}>
          https://lanyuechen.github.io/retina/#/join
        </Typography>
      </CardContent>
      <CardActions>
        <CopyToClipboard
          text={`房间ID: ${id}\n房间链接: https://lanyuechen.github.io/retina/#/join`}
          onCopy={() => message.success('复制成功')}
        >
          <Button size="small">复制房间信息</Button>
        </CopyToClipboard>
      </CardActions>
    </Card>
  );

  const menu = (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          {menuData.map((d: any) => (
            <div
              key={d.name}
              onClick={() => onLayoutChange(d.name)}
              className={`${style.layoutCard} ${layout === d.name ? style.active : ''}`}
            >
              <div className={style.icon} data-type={d.name}>
                <Icon type={d.icon} />
              </div> 
              <Typography variant="caption">
                {d.title}
              </Typography>
            </div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Toolbar variant="dense">
      <Popover overlay={menuInfo}>
        <Button size="small" sx={{ color: '#fff' }}>
          ID: {id} <Icon type="down" />
        </Button>
      </Popover>

      <Divider sx={{ mx: 1, my: 2, background: '#fff' }} variant="middle" orientation="vertical" flexItem />

      <Typography variant="subtitle2" sx={{ color: '#fff' }}>
        <Timer />
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <Box>
        <Popover overlay={menu}>
          <Button sx={{ color: '#fff' }}>
            <Icon type="layout-grid" />&nbsp;
            {menuData.find(d => d.name === layout)?.title} <Icon type="down" />
          </Button>
        </Popover>
      </Box>
    </Toolbar>
  );
}
