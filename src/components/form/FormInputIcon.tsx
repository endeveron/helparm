import { WithChildren } from 'types/common';

interface FormInputIconProps extends WithChildren {
  className?: string;
  onClick?: () => void;
}

const FormInputIcon = ({
  className,
  children,
  onClick,
}: FormInputIconProps) => {
  return (
    <div onClick={onClick} className={`form-input-icon ${className}`}>
      {children}
    </div>
  );
};

export { FormInputIcon };
