import { ChangeEvent, forwardRef } from 'react';

interface FormSelectProps {
  optionList: {
    name: string;
    title: string;
    selectTitle: string;
  }[];
  defaultValue: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (props, ref) => {
    return (
      <select
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        className={`form-input form-input--select`}
        placeholder={props.placeholder}
        ref={ref}
      >
        {props.optionList.map((category) => (
          <option
            className="select-option"
            value={category.name}
            key={category.name}
          >
            {category.selectTitle}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export { FormSelect };
