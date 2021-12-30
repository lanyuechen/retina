import React, { useState } from 'react';
import { Stack } from '@mui/material';

import Icon from '@/components/Icon';

import ModalJoin from './ModalJoin';

import style from './style.module.less';

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
      <Stack direction="row" spacing={4}>
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
      </Stack>
      {joinMeetingVisible && (
        <ModalJoin visible={joinMeetingVisible} onCancel={() => setJoinMeetingVisible(false)} />
      )}
    </div>
  )
}
