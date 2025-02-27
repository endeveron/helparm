import { montserrat } from 'app/layout';
import { WithChildren } from 'types/common';

interface HeadingProps extends WithChildren {
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'thead';
  className?: string;
}

const Heading = ({ as = 'div', className, children }: HeadingProps) => {
  const CustomTag = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <CustomTag className={`${className} ${montserrat.className}`}>
      {children}
    </CustomTag>
  );
};

export { Heading };
