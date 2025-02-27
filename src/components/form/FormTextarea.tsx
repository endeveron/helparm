import { forwardRef } from 'react';

interface FormTextareaProps {
  rows?: number;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        rows={props.rows}
        className="form-input form-input--textarea"
        {...props}
      />
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export { FormTextarea };
