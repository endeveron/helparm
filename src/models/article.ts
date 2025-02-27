import { Schema, model, models, InferSchemaType } from 'mongoose';

import { NumReq, Str, StrReq } from 'types/db';

const articleSectionSchema = new Schema(
  {
    title: StrReq,
    content: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  { _id: false }
);

const articleSearchItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      text: true,
      index: true,
      required: true,
    },
  },
  { _id: false }
);

const articleNoSearchItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const articleDataItemSchema = new Schema(
  {
    lang: {
      type: String,
      enum: ['ua', 'en'],
    },
    text: [articleSearchItemSchema],
    links: [articleNoSearchItemSchema],
    ui: [articleNoSearchItemSchema],
  },
  { _id: false }
);

const articleNavItemSchema = new Schema(
  {
    to: StrReq,
    link: StrReq,
    title: StrReq,
  },
  { _id: false }
);

const articleSchema = new Schema({
  index: NumReq,
  name: StrReq,
  view: {
    header: {
      icon: Str,
      title: StrReq,
    },
    sections: [articleSectionSchema],
    footer: {
      nav: [articleNavItemSchema],
    },
  },
  data: [articleDataItemSchema],
});

articleSchema.index({
  'data.text.value': 'text',
});

type Article = InferSchemaType<typeof articleSchema> & {
  _id: Schema.Types.ObjectId;
};
const ArticleModel = models.Article || model<Article>('Article', articleSchema);

export { ArticleModel };
export type { Article };
