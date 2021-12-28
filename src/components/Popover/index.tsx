import React, { useState } from 'react';

import { Popover } from '@mui/material';

export default (props: any) => {
  const { overlay, children } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = !!anchorEl;

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          onClick: handleClick,
        });
      })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {overlay}
      </Popover>
    </>
  );
}

