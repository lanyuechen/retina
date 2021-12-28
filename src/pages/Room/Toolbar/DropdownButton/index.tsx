import React from 'react';
import { Button } from '@mui/material';
import Icon from '@/components/Icon';
import Popover from '@/components/Popover';

import style from './style.less';

export default (props: any) => {
  const { dropdown, badge, children, onClick } = props;

  return (
    <Button variant="text" onClick={onClick} style={{flexDirection: 'column'}}>
      {children}
      {dropdown && (
        <Popover overlay={dropdown}>
          <span className={style.extra}>
            <Icon type="up" />
          </span>
        </Popover>
      )}
      {!!badge && (
        <span className={style.extra}>
          {badge}
        </span>
      )}
    </Button>
  );
}
