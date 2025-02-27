import { InferSchemaType, Schema, model, models } from 'mongoose';

import { NumReq, Str, StrReq } from 'types/db';

const pointSchema = new Schema(
  {
    type: {
      type: String,
    },
    coordinates: {
      type: [Number],
    },
  },
  { _id: false }
);

const visitorSchema = new Schema(
  {
    ip: StrReq,
    visits: NumReq,
    location: {
      country: Str,
      countryCode: Str,
      region: Str,
      city: Str,
      flag: Str,
      geoPoint: pointSchema,
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);

type Visitor = InferSchemaType<typeof visitorSchema> & {
  _id: Schema.Types.ObjectId;
};
const VisitorModel = models.Visitor || model<Visitor>('Visitor', visitorSchema);

export { VisitorModel };
export type { Visitor };
