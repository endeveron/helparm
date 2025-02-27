import { WithChildren } from 'types/common';

interface FormLabelProps extends WithChildren {}

const FormLabel = ({ children }: FormLabelProps) => {
  return <label className="form-label">{children}</label>;
};

export { FormLabel };
