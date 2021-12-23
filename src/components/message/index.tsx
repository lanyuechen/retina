import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, Alert } from '@mui/material';

type TypeProp = 'success' | 'error' | 'info' | 'warning';

const message = (type: TypeProp = 'info') => (message: string) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    div.parentNode?.removeChild?.(div);
  }

  const snackbar = (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      onClose={close}
    >
      <Alert onClose={close} severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  ReactDOM.render(snackbar, div);

  return {
    close
  }
}

export default {
  success: message('success'),
  error: message('error'),
  warning: message('warning'),
  info: message('info'),
}