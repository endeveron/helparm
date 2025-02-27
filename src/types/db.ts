import { ObjectId } from 'mongoose';

export type Id = ObjectId | string;

export const Str = {
  type: String,
};

export const Num = {
  type: Number,
};

export const StrReq = {
  type: String,
  required: true,
};

export const NumReq = {
  type: Number,
  required: true,
};
