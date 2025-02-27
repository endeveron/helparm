import {
  Schema,
  model,
  models,
  InferSchemaType,
  Document,
  Model,
} from 'mongoose';
import { ICounter } from 'types/analytics';

import { Id, NumReq, StrReq } from 'types/db';

interface CounterDocument extends ICounter, Document<Id> {}

const counterSchema = new Schema(
  {
    name: StrReq,
    value: NumReq,
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
    versionKey: false,
  }
);

const CounterModel: Model<CounterDocument> =
  models.Counter || model('Counter', counterSchema);

export { CounterModel };
