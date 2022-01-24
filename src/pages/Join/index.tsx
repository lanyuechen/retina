import React, { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import Form, { FormRef } from '@/components/Form';

import style from './style.module.less';

export default () => {
  const form = useRef<FormRef>();
  const navigate = useNavigate();

  const joinMeeting = async () => {
    form.current?.submit((values: any) => {
      navigate({
        pathname: `/room/${values.roomId}`,
        search: `?${createSearchParams({
          u: values.username,
          a: values.audio ? 'on' : 'off',
          v: values.video ? 'on' : 'off',
        })}`
      });
    });
  }

  return (
    <div className={style.container}>
      <Box sx={{ width: 300 }}>
        <h2>加入房间</h2>
        <Form
          ref={form}
          defaultValues={{
            roomId: 'test',
            username: '',
            video: true,
            audio: false,
          }}
          rules={{
            roomId: {required: '房间ID不能为空'}
          }}
        >
          <Form.Input name="roomId" label="房间ID" fullWidth />
          <Form.Input name="username" label="用户名" fullWidth />

          <Form.Checkbox name="video" label="视频" />
          <Form.Checkbox name="audio" label="音频" />

        </Form>

        <Button variant="contained" fullWidth onClick={joinMeeting}>确定</Button>
      </Box>
    </div>
  );
}
