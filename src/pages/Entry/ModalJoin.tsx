import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton,
} from '@mui/material';

import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import VideoCard from '@/components/VideoCard';
import Form, { FormRef } from '@/components/Form';

export default (props: any) => {
  const { visible, onCancel } = props;
  const [me, setMe] = useState<any>();
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);
  const form = useRef<FormRef>();

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({
  //     audio,
  //     video,
  //   }).then(mediaStream => {
  //     setMe({
  //       nickname: 'myself',
  //       isMe: true,
  //       mediaStream
  //     });
  //   });
  // }, []);

  const newMeeting = async () => {
    form.current?.submit((values: any) => {
      history.push({
        pathname: `/room/${values.roomId}`,
        query: {
          u: values.username,
          a: audio ? 'on' : 'off',
          v: video ? 'on' : 'off',
        }
      })
    });
  }

  return (
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle>加入会议</DialogTitle>
      <DialogContent>
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
        </Form>
        {me && (
          <VideoCard peer={me} showTag={false} showTool={false} />
        )}
      </DialogContent>
      <DialogActions>
        <div style={{position: 'absolute', left: 8}}>
          <IconButton onClick={() => setAudio(!audio)}>
            <AudioIcon active={audio} />
          </IconButton>
          <IconButton onClick={() => setVideo(!video)}>
            <VideoIcon active={video} />
          </IconButton>
        </div>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={newMeeting}>确定</Button>
      </DialogActions>
    </Dialog>
  );
}
