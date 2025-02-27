import { setOfferList } from 'features/offers/store';
import { IOffer } from 'features/offers/types';
import { AppDispatch } from 'redux/store';

interface IAddOfferToStoreArgs {
  newOffer: IOffer;
  offers: IOffer[];
  dispatch: AppDispatch;
}

export const addOfferToStore = ({
  newOffer,
  offers,
  dispatch,
}: IAddOfferToStoreArgs) => {
  const offersClone = structuredClone(offers);
  offersClone.unshift(newOffer);
  dispatch(setOfferList(offersClone));
};

interface IRemoveOfferFromStoreArgs {
  _id: string;
  offers: IOffer[];
  dispatch: AppDispatch;
}

export const removeOfferFromStore = ({
  _id,
  offers,
  dispatch,
}: IRemoveOfferFromStoreArgs) => {
  const offersClone = structuredClone(offers);
  const filteredOffers = offersClone.filter((offer) => offer._id !== _id);
  dispatch(setOfferList(filteredOffers));
};
