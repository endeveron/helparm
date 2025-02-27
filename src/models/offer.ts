import { createOfferForm } from 'configs/form';
import { InferSchemaType, Schema, model, models } from 'mongoose';

import { StrReq } from 'types/db';

const offerSchema = new Schema(
  {
    author: {
      _id: StrReq,
      name: {
        minlength: createOfferForm.AUTHOR_MIN_LENGTH,
        maxlength: createOfferForm.AUTHOR_MAX_LENGTH,
        ...StrReq,
      },
    },
    content: {
      title: {
        minlength: createOfferForm.TITLE_MIN_LENGTH,
        maxlength: createOfferForm.TITLE_MAX_LENGTH,
        ...StrReq,
      },
      text: {
        minlength: createOfferForm.TEXTAREA_MIN_LENGTH,
        maxlength: createOfferForm.TEXTAREA_MAX_LENGTH,
        ...StrReq,
      },
    },
    contacts: {
      phones: [
        {
          minlength: createOfferForm.PHONE_MIN_LENGTH,
          maxlength: createOfferForm.PHONE_MAX_LENGTH,
          ...StrReq,
        },
      ],
    },
    category: StrReq,
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);

type Offer = InferSchemaType<typeof offerSchema> & {
  _id: Schema.Types.ObjectId;
};
const OfferModel = models.Offer || model<Offer>('Offer', offerSchema);

export { OfferModel };
export type { Offer };
