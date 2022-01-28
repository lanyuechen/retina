import React from 'react';
import { Stack, Typography } from '@mui/material';

export default (props: any) => {
  const { icon, text } = props;

  return (
    <Stack sx={{width: 40, height: 40, '& svg': {width: 24, height: 24}}}>
      {icon}
      <Typography variant="caption" color="default">
        {text}
      </Typography>
    </Stack>
  );
}
