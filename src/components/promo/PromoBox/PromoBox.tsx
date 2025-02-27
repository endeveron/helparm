import classNames from 'classnames';

import { WithChildren } from 'types/common';

import './PromoBox.scss';

interface PromoBoxProps extends WithChildren {
  className?: string;
}

const PromoBox = ({ children, className }: PromoBoxProps) => {
  return (
    <div className={classNames('promo-box shadow--a', className)}>
      {children}
    </div>
  );
};

export { PromoBox };
