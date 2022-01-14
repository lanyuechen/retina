import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

export default forwardRef((props: any, ref: any) => {
  const { name, label, ...others } = props;

  return (
    <TextField
      ref={ref}
      name={name}
      label={label}
      margin="normal"
      variant="standard"
      {...others}
    />
  );
});
