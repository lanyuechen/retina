import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Modal, Button } from 'antd';
import Btn from '@/pages/Meeting/Footer/Btn';
import { AudioIcon, VideoIcon } from '@/component/ToggleIcon';
import VideoCard from '@/pages/Meeting/Content/VideoCard';
import { MeetingContext } from '@/pages/Meeting';
import useRtc from '@/hooks/use-rtc';

export default (props: any) => {
  const { visible, onCancel } = props;
  const history = useHistory();
  const [ form ] = Form.useForm();
  // const { participants, service } = useRtc({
  //   roomId: Math.random() + '',
  //   username: '我自己',
  //   audio: true,
  //   video: true,
  // });
  //默认音视频都打开
  const [audioOn,setAudioOn] = useState(true)
  const [videoOn,setVideoOn] = useState(true)

  const joinMeeting = async () => {
    const values = await form.validateFields();
    history.push(`/meeting/${values.roomId}?serveraddr=${values.serveraddr}&username=${values.username}&audio=${audioOn ? 'open' : 'close'}&video=${videoOn ? 'open' : 'close'}`);
  }

  //const me = participants[0];

  const footer = (
    <>
      <Btn
        style={{float: 'left'}}
        icon={<AudioIcon active={audioOn} />}
        onClick={()=>setAudioOn(!videoOn)}
      >
        麦克风
      </Btn>
      <Btn
        style={{float: 'left'}}
        icon={<VideoIcon active={videoOn} />}
        onClick={()=>setVideoOn(!audioOn)}
      >
        摄像头
      </Btn>
      <Button onClick={onCancel}>取消</Button>
      <Button type="primary" onClick={joinMeeting}>加入会议</Button>
    </>
  );

  return (
    <Modal
      title="加入会议"
      visible={visible}
      onCancel={onCancel}
      footer={footer}
    >
      <Form form={form}>
        <Form.Item name="roomId" label="房间ID" rules={[{required: true}]}>
          <Input placeholder="请输入房间ID" />
        </Form.Item>
        <Form.Item name="username" label="用户名" rules={[{required: true}]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="serveraddr" label="服务器" initialValue="wss://superrtc.com/websocket2" rules={[{required: true}]}>
          <Input placeholder="请输入服务器地址" />
        </Form.Item>
      </Form>
      {/* <MeetingContext.Provider value={{ participants, service }}>
        <VideoCard participant={me} showTag={false} showTool={false} />
      </MeetingContext.Provider> */}
    </Modal>
  )
}
