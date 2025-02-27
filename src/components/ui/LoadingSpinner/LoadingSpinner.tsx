import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner ${className}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { LoadingSpinner };
