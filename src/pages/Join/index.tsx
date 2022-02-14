import React, { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { Box, Button, useMediaQuery } from '@mui/material';

import Form, { FormRef } from '@/components/Form';
import MultiAvatar from '@/components/MultiAvatar';
import FormInput from './FormInput';

import style from './style.module.less';

const checkboxSx = {
  color: '#fff',
  '&.Mui-checked': {
    color: '#fff',
  },
};

export default () => {
  const form = useRef<FormRef>();
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:500px)');

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
      <div className={style.loginBox} style={matches ? { border: 'none' } : {}}>
        <Box sx={{display: 'flex', justifyContent: 'center', mb: '36px'}}>
          <MultiAvatar />
        </Box>
        <Form
          ref={form}
          defaultValues={{
            roomId: '',
            username: '',
            video: true,
            audio: false,
          }}
          rules={{
            roomId: {required: '房间ID不能为空'},
            username: {required: '用户名不能为空'},
          }}
        >
          <FormInput name="roomId" placeholder="请输入房间ID" />
          <FormInput name="username" placeholder="请输入用户名" />

          <Form.Checkbox name="video" label="视频" sx={checkboxSx} />
          <Form.Checkbox name="audio" label="音频" sx={checkboxSx} />
        </Form>

        <Button
          variant="outlined"
          color="inherit"
          disableElevation
          fullWidth
          onClick={joinMeeting}
        >
          确定
        </Button>
      </div>
    </div>
  );
}
