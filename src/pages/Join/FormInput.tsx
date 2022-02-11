import React, { forwardRef } from 'react';
import { FormControl, InputBase, FormHelperText, useTheme } from '@mui/material';

export default forwardRef((props: any, ref: any) => {
  const { name, label, error, helperText, required, ...others } = props;

  const theme = useTheme();

  return (
    <FormControl
      fullWidth
      error={error}
      hiddenLabel
      sx={{
        marginTop: theme.spacing(1),
        '& .MuiInputBase-input': {
          borderRadius: '4px',
          padding: '8px 12px',
          color: 'rgba(255, 255, 255, 0.8)',
          transition: theme.transitions.create('border-color'),
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderColor: error ? theme.palette.error.main : 'rgba(255, 255, 255, 0.5)',
          '&:focus': {
            borderColor: 'rgba(255, 255, 255, 0.8)',
          },
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
      }}
    >
      <InputBase
        ref={ref}
        fullWidth
        error={error}
        name={name}
        {...others}
      />
      <FormHelperText error={error}>
        {helperText || ' '}
      </FormHelperText>
    </FormControl>
  );
});
