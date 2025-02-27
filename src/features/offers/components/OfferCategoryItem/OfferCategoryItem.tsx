import classNames from 'classnames';

import { IOfferCategoryItem } from 'features/offers/types';

import './OfferCategoryItem.scss';

interface OfferCategoryItemProps extends IOfferCategoryItem {
  onClick: () => void;
}

const OfferCategoryItem = ({
  title,
  isActive,
  onClick,
}: OfferCategoryItemProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={classNames('offer-category-item', {
        'offer-category-item--active': isActive,
      })}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export { OfferCategoryItem };
