import { useState } from 'react';

import { OfferCategoryItem } from 'features/offers/components/OfferCategoryItem/OfferCategoryItem';
import { offerCategories } from 'features/offers/data/categories';
import { clearOfferSearch, setOfferSearchQuery } from 'features/offers/store';
import { useAppDispatch } from 'redux/store';

import './OfferCategoryList.scss';

interface OfferCategoryListProps {
  onSelected: (name: string) => void;
}

const OfferCategoryList = ({ onSelected }: OfferCategoryListProps) => {
  const dispatch = useAppDispatch();

  const [activeItem, setActiveItem] = useState('all');

  const handleClick = (name: string) => {
    setActiveItem(name);
    onSelected(name);

    dispatch(clearOfferSearch(true));
    dispatch(setOfferSearchQuery(''));
  };

  return (
    <div className="offer-category-list">
      <div className="offer-category-list__content-wrapper">
        <OfferCategoryItem
          title="Усі"
          isActive={activeItem === 'all'}
          onClick={() => handleClick('all')}
          key="all"
        />
        {offerCategories.map((category) => {
          const isActive = activeItem === category.name;
          return (
            <OfferCategoryItem
              title={category.title}
              isActive={isActive}
              onClick={() => handleClick(category.name)}
              key={category.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export { OfferCategoryList };
