import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Divider, Button, Typography, Card, CardContent, CardActions, Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@/components/Icon';
import Timer from '@/components/Timer';
import Popover from '@/components/Popover';
import message from '@/components/message';

import style from './style.module.less';

const menuData = [
  { name: 'gallery', title: '宫格视图', icon: 'layout-grid' },
  // { name: 'thumbnail', title: '缩略图视图' },
  { name: 'speaker', title: '演讲者视图', icon: 'layout-speaker' },
];

export default (props: any) => {
  const { layout, onLayoutChange } = props;
  const { id } = useParams<{id: string}>();

  var menuInfo = (
    <Card sx={{ width: 320 }}>
      <CardContent>
        <Typography gutterBottom variant="h6">
          nickname
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item xs={3}>会议ID</Grid>
          <Grid item xs={9}>{id}</Grid>
        
          <Grid item xs={3}>会议链接</Grid>
          <Grid item xs={9}>https://lanyuechen.github.io/retina/#/entry</Grid>
        
          <Grid item xs={3}>电话拨入</Grid>
          <Grid item xs={9}>
            +86 10 8888 8888(中国大陆) <br />
            <a>更多电话号码</a>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <CopyToClipboard
          text={`会议ID: ${id}\n会议链接: https://lanyuechen.github.io/retina/#/entry\n电话拨入: +86 10 8888 8888(中国大陆)`}
          onCopy={() => message.success('复制成功')}
        >
          <Button size="small">复制入会信息</Button>
        </CopyToClipboard>
        <Button size="small">分享至会话</Button>
      </CardActions>
    </Card>
  );

  var menu = (
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
              {d.title}
            </div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Grid container className={style.container}>
      <Grid item xs={8}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            '& hr': {
              mx: 0.5,
            },
          }}
        >
          <Popover overlay={menuInfo}>
            <span className={style.dropdown}>
              ID: {id} <Icon type="down" />
            </span>
          </Popover>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Timer />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Popover overlay={menu}>
          <span className={style.dropdown} style={{float: 'right'}}>
            <Icon type="appstore" />&nbsp;
            {menuData.find(d => d.name === layout)?.title} <Icon type="down" />
          </span>
        </Popover>
      </Grid>
    </Grid>
  )
}
