import classNames from 'classnames';

import { WithChildren } from 'types/common';

interface FormFieldProps extends WithChildren {
  className?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
}

const FormField = ({
  className,
  isRequired,
  isInvalid,
  children,
}: FormFieldProps) => (
  <div
    className={classNames('form-field', className, {
      'form-field--required': isRequired,
      'form-field--invalid': isInvalid,
    })}
  >
    {children}
  </div>
);

export { FormField };
