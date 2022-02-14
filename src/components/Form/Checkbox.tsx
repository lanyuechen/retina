import React, { forwardRef } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

interface Props {

}

export interface ICheckbox extends React.FC<Props> {
  
}

export default forwardRef((props: any, ref: any) => {
  const { name, label, value, onChange, sx } = props;

  return (
    <FormControlLabel
      name={name}
      label={label}
      control={<Checkbox ref={ref} checked={value} size="small" onChange={onChange} sx={sx} />}
    />
  );
});