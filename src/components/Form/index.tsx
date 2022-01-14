import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';

export type { FormRef } from './typings';

import Checkbox from './Checkbox';

interface IForm extends React.ForwardRefExoticComponent<any> {
  Checkbox: typeof Checkbox;
};

const Form = forwardRef((props: any, ref: any) => {
  const { children, defaultValues, rules } = props;

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues
  });

  useImperativeHandle(ref, () => ({
    submit: (onValid: () => void) => handleSubmit(onValid)(),
    getValues,
    setValue,
  }), []);

  return React.Children.map(children, (child) => (
    <Controller
      name={child.props.name}
      control={control}
      rules={rules[child.props.name]}
      render={({ field, fieldState }) => React.cloneElement(child, {
        ...child.props,
        ...field,
        required: !!rules[child.props.name]?.required,
        error: fieldState.invalid,
        helperText: fieldState.invalid ? fieldState.error?.message : undefined,
      })}
    />
  ));
}) as IForm;

Form.Checkbox = Checkbox;

export default Form;