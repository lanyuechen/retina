import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Menu, Dropdown, Modal } from 'antd';
import {
  ControlOutlined,
  UserAddOutlined,
  MoreOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import Icon from '@/component/Icon';
import { AudioIcon, VideoIcon } from '@/component/ToggleIcon';
import Btn from './Btn';
import { MeetingContext } from '@/pages/Meeting';
import style from './style.module.scss';

interface PropType {
  showParticipants: () => void;
}

export default (props: PropType) => {
  const { showParticipants } = props;
  const { participants, service } = useContext(MeetingContext);
  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item icon={<Icon type="icon-cc" />}>
        打开字幕
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-live" />}>
        转播画面
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-effect" />}>
        特效
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-setting" />}>
        设置
      </Menu.Item>
    </Menu>
  );

  const me = participants[0];

  const leave = () => {
    Modal.confirm({
      title: '提示',
      content: '是否要退出会议？',
      okText: '是',
      cancelText: '否',
      onOk: () => {
        service.close();
        history.push('/');
      }
    })
  }

  return (
    <div className={style.container}>
      <Btn
        icon={<AudioIcon active={me.audio} />}
        onClick={me.audio ? service.stopLocalAudio : service.startLocalAudio}
        dropdown={menu}
      >
        麦克风
      </Btn>
      <Btn
        icon={<VideoIcon active={me.video} />}
        onClick={me.video ? service.stopLocalPreview : service.startLocalPreview}
        dropdown={menu}
      >
        摄像头
      </Btn>
      <Btn
        icon={<UserAddOutlined />}
        onClick={showParticipants}
      >
        参会人
        <small
          style={{
            position: 'absolute', 
            top: -24, 
            right: 0,
            fontWeight: 'bold'
          }}
        >
          {participants.length}
        </small>
      </Btn>
      <Btn 
        icon={<Icon type="icon-share-screen" style={{color: 'rgb(52, 199, 58)'}} />}
        onClick={service.openShare}
        // dropdown={menu}
      >
        共享
      </Btn>
      <Btn icon={<Icon type="icon-recording" />}>开始录制</Btn>
      <Dropdown overlay={menu} trigger={['click']}>
        <Btn icon={<MoreOutlined rotate={90} />}>
          更多
        </Btn>
      </Dropdown>
      <Btn 
        icon={<PhoneOutlined className="color-danger" rotate={225} />}
        onClick={leave}
        style={{float: 'right'}}
      >
        离开
      </Btn>
    </div>
  )
}
