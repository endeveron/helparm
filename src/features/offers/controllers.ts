import { IOffer } from 'features/offers/types';
import { dbConnect } from 'lib/mongo';
import { OfferModel } from 'models/offer';
import { IControllerResult } from 'types/common';

import logger from 'utils/logger';

export const getOffers = async (): IControllerResult<IOffer[]> => {
  try {
    await dbConnect();
    const offers = await OfferModel.find({}).sort({ created: -1 });
    return { data: offers };
  } catch (err: any) {
    logger.r('features/offers/controllers getOffers', err);
    return {
      error: `Не вдалося отримати список оголошень. ${err.message}`,
      data: null,
    };
  }
};

export const createOffer = async (
  offerData: IOffer
): IControllerResult<IOffer> => {
  try {
    await dbConnect();
    const offer = new OfferModel(offerData);
    await offer.save();
    return { data: offer };
  } catch (err: any) {
    logger.r('features/offers/controllers createOffer', err);
    return {
      error: `Не вдалося створити пропозицію. ${err.message}`,
      data: null,
    };
  }
};

export const deleteOffer = async (_id: string): IControllerResult<string> => {
  try {
    await dbConnect();
    await OfferModel.findByIdAndDelete(_id);
    return { data: _id };
  } catch (err: any) {
    logger.r('features/offers/controllers deleteOffer', err);
    return {
      error: `Не вдалося видалити пропозицію. ${err.message}`,
      data: null,
    };
  }
};
