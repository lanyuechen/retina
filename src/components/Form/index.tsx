import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';

export type { FormRef } from './typings';

import Checkbox from './Checkbox';
import Input from './Input';

interface IForm extends React.ForwardRefExoticComponent<any> {
  Checkbox: typeof Checkbox;
  Input: typeof Input;
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
Form.Input = Input;

export default Form;