'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { OfferCategoryList } from 'features/offers/components/OfferCategoryList/OfferCategoryList';
import { Offers } from 'features/offers/components/Offers/Offers';
import { selectOfferList, setOfferList } from 'features/offers/store';
import { IOffer } from 'features/offers/types';
import { useFetch } from 'hooks/useFetch';
import { useAppDispatch, useAppSelector } from 'redux/store';

import './OfferContainer.scss';

interface OfferContainerProps {
  userOwnOnly?: boolean;
  hideCategories?: boolean;
  isFloatButton?: boolean;
}

const OfferContainer = ({
  isFloatButton,
  userOwnOnly,
}: OfferContainerProps) => {
  const dispatch = useAppDispatch();
  const fetchedOffers = useAppSelector(selectOfferList);
  const { data } = useSession();
  const userId = data?.user.id;

  const [offers, setOffers] = useState<IOffer[]>([]);
  const [category, setCategory] = useState('all');
  const [fetchOffers, isLoading] = useFetch<IOffer[]>();

  // Fetch the offers
  useEffect(() => {
    if (fetchedOffers.length) return;
    (async () => {
      const { data, error } = await fetchOffers('/api/offers');
      if (error) console.error(error);
      if (data) {
        dispatch(setOfferList(data));
        if (userOwnOnly) {
          const userOffers: IOffer[] = data.filter(
            (item) => item.author._id === userId
          );
          setOffers(userOffers);
        } else {
          setOffers(data);
        }
      }
    })();
  }, [fetchedOffers, dispatch]); // eslint-disable-line

  // Filter items by category
  useEffect(() => {
    if (!category || !fetchedOffers) return;

    let items = [];
    let filteredItems = [];
    if (userOwnOnly) {
      items = fetchedOffers.filter((item) => item.author._id === userId);
    } else {
      items = fetchedOffers;
    }

    if (category === 'all') {
      filteredItems = items;
    } else {
      filteredItems = [...items].filter((item) => item.category === category);
    }
    setOffers(filteredItems);
  }, [fetchedOffers, userId, userOwnOnly, category]);

  return (
    <div className="offer-container anim">
      {!!fetchedOffers?.length && (
        <OfferCategoryList onSelected={setCategory} />
      )}
      <Offers
        items={offers}
        isFloatButton={isFloatButton}
        isLoading={isLoading}
      />
    </div>
  );
};

export { OfferContainer };
