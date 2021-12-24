import React, { useState } from 'react';
import Icon from '@/components/Icon';

import ModalJoin from './ModalJoin';

import style from './style.less';

const BoxBtn = (props: any) => {
  const { children, icon, ...others } = props;
  return (
    <div className={style.button} {...others}>
      <div className={style.icon}>
        {icon}
      </div>
      <div className={style.title}>{children}</div>
    </div>
  )
}

export default () => {
  const [ joinMeetingVisible, setJoinMeetingVisible ] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.iconContainer}>
          <BoxBtn
            icon={<Icon type="camera" />}
            onClick={() => setJoinMeetingVisible(true)}
          >
            新会议
          </BoxBtn>
          <BoxBtn
            icon={<Icon type="plus-square" />}
            onClick={() => setJoinMeetingVisible(true)}
          >
            加入会议
          </BoxBtn>
        </div>
        <div className={style.info}>
          <h2>流畅可协同的音视频会议</h2>
          <ul>
            <li>点击“新会议”，立即发起会议</li>
            <li>点击“加入会议”，输入房间ID及用户名快速加入会议</li>
          </ul>
        </div>
      </div>
      {joinMeetingVisible && (
        <ModalJoin visible={joinMeetingVisible} onCancel={() => setJoinMeetingVisible(false)} />
      )}
    </div>
  )
}
