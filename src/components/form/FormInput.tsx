import { roboto } from 'app/layout';
import { FormEvent, forwardRef } from 'react';

interface FormInputProps {
  type?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <input
      onChange={props.onChange}
      type={props.type || 'text'}
      ref={ref}
      className="form-input"
      {...props}
    />
  );
});

FormInput.displayName = 'FormInput';

export { FormInput };
