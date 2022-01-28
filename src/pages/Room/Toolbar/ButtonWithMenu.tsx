import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import Icon from '@/components/Icon';
import Popover from '@/components/Popover';

export default (props: any) => {
  const { menu, children, ...others } = props;

  return (
    <ButtonGroup sx={{position: 'relative'}}>
      <Button {...others} variant="text">
        {children}
      </Button>
      <Popover overlay={menu}>
        <Button size="small" variant="text" sx={{position: 'absolute', top: -5, right: -10}}>
          <Icon type="up" />
        </Button>
      </Popover>
    </ButtonGroup>
  );
}
