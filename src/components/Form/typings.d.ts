
export interface FormRef {
  submit: (data: Object, e?: Event) => void;
  getValues: (payload?: string | string[]) => Object;
  setValue: (name: string, value: unknown, config?: Object) => void;
}
