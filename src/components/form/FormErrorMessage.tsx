'use client';

import { FieldErrors } from 'react-hook-form';
import { IFormInputs } from 'types/form';

interface FormErrorMessageProps {
  fieldName: string;
  errors: FieldErrors<IFormInputs>;
}

const FormErrorMessage = ({ fieldName, errors }: FormErrorMessageProps) => {
  const error = errors[fieldName];
  const errorMessage = error?.message;
  const patternError = error?.type === 'pattern';

  if (!error) return null;

  return (
    <div className="form-error-message">
      {errorMessage}
      {patternError && 'Invalid input data'}
    </div>
  );
};

export { FormErrorMessage };
