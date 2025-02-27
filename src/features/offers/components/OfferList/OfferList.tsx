'use client';

import { useAppDispatch } from 'redux/store';
import { v4 as uid } from 'uuid';

import { LoadingSpinner } from 'components/ui/LoadingSpinner/LoadingSpinner';
import { OfferCard } from 'features/offers/components/OfferCard/OfferCard';
import { IOffer } from 'features/offers/types';
import { removeOfferFromStore } from 'features/offers/utils';

import './OfferList.scss';

interface OfferListProps {
  items: IOffer[];
  isLoading: boolean;
}

const OfferList = ({ items, isLoading }: OfferListProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteOffer = (_id: string) => {
    removeOfferFromStore({ _id, offers: items, dispatch });
  };

  const noResultEl = (
    <div className="offer-list__no-result">Оголошення відсутні</div>
  );

  const listEl = (
    <div className="offer-list anim anim-children">
      {items.map((item) => (
        <OfferCard {...item} onDeleted={handleDeleteOffer} key={uid()} />
      ))}
    </div>
  );

  if (isLoading) return <LoadingSpinner className="offers__loading accent" />;
  if (items.length) return listEl;
  return noResultEl;
};

export { OfferList };
