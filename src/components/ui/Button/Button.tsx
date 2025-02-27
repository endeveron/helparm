'use client';

import classNames from 'classnames';

import { LoadingSpinner } from 'components/ui/LoadingSpinner/LoadingSpinner';

import './Button.scss';
import { roboto } from 'app/layout';

type ButtonVariant = 'normal' | 'accent' | 'text';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
  isLoading?: boolean;
};

const Button = ({
  children,
  className,
  isLoading,
  variant = 'normal',
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, roboto.className, {
        'button--accent': variant === 'accent',
        'button--text': variant === 'text',
        'button--loading': isLoading,
      })}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export { Button };
