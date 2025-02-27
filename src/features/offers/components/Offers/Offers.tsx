import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';

import { CreateOfferButton } from 'features/offers/components/CreateOfferButton/CreateOfferButton';
import { OfferList } from 'features/offers/components/OfferList/OfferList';
import {
  selectOfferSearchQuery,
  setOfferSearchQuery,
} from 'features/offers/store';
import { IOffer } from 'features/offers/types';
import { SearchBox } from 'features/search/components/SearchBox/SearchBox';
import { useAppDispatch, useAppSelector } from 'redux/store';

import './Offers.scss';

interface OffersProps {
  items: IOffer[];
  isLoading: boolean;
  isFloatButton?: boolean;
}

const Offers = memo(({ items, isFloatButton, isLoading }: OffersProps) => {
  const dispatch = useAppDispatch();
  const filterQuery = useAppSelector(selectOfferSearchQuery);
  const [resultItems, setResultItems] = useState<IOffer[]>([]);

  const filterItems = (items: IOffer[], filterQuery: string) => {
    let itemsCopy = [...items];
    if (filterQuery) {
      const qwery = filterQuery.toLowerCase();
      itemsCopy = itemsCopy.filter(
        (item) =>
          item.content.title.toLowerCase().includes(qwery) ||
          item.content.text.toLowerCase().includes(qwery)
      );
    }
    return itemsCopy;
  };

  // Handle items on filter query changes
  useEffect(() => {
    if (filterQuery) {
      setResultItems(filterItems(items, filterQuery));
    } else {
      setResultItems(items);
    }
  }, [items, filterQuery]);

  const handleSearch = (query: string) => {
    dispatch(setOfferSearchQuery(query));
  };

  const handleClear = () => {
    setResultItems(items);
  };

  // Initialize list items
  useEffect(() => {
    setResultItems(items);
  }, [items]);

  return (
    <div
      className={classNames('offers', {
        'offers--float-button': isFloatButton,
      })}
    >
      {isFloatButton && <CreateOfferButton isFloating={true} />}
      {items?.length > 1 && (
        <div className="offers__header anim">
          <SearchBox
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Пошук"
            className="offers__search"
          />
        </div>
      )}

      <div className="offers__items">
        <OfferList items={resultItems} isLoading={isLoading} />
      </div>
    </div>
  );
});

Offers.displayName = 'Offers';

export { Offers };
