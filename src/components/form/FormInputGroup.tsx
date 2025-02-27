import { WithChildren } from 'types/common';

interface FormInputGroupProps extends WithChildren {}

const FormInputGroup = ({ children }: FormInputGroupProps) => {
  return <div className="form-input-group">{children}</div>;
};

export { FormInputGroup };
