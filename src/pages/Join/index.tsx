import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import {
  Box, FormControl, FormControlLabel, Checkbox,
  TextField, Button,
} from '@mui/material';

import Form, { FormRef } from '@/components/Form';

import style from './style.module.less';

export default (props: any) => {
  const form = useRef<FormRef>();
  const navigate = useNavigate();

  const joinMeeting = async () => {
    form.current?.submit((values: any) => {
      console.log('====', values);
      return;
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
        <Form
          ref={form}
          defaultValues={{
            roomId: '',
            username: '',
          }}
          rules={{
            roomId: {required: '房间ID不能为空'}
          }}
        >
          <TextField
            name="roomId"
            label="房间ID"
            variant="standard"
            autoFocus
            fullWidth
          />
          <TextField
            name="username"
            label="用户名"
            margin="normal"
            variant="standard"
            fullWidth
          />

          <FormControlLabel name="video" control={<Checkbox size="small" defaultChecked />} label="视频" />
          <FormControlLabel name="audio" control={<Checkbox size="small" />} label="声音" />

        </Form>

        <Button variant="contained" fullWidth onClick={joinMeeting}>确定</Button>
      </Box>
    </div>
  );
}
