import mongoose from 'mongoose';

export interface IArticleItem {
  title: string;
  description: string;
  iconName: string;
  navLink: string;
}

export interface IArticleHeader {
  icon: string;
  title: string;
}

export interface IArticleFooter {
  nav: [
    {
      to: string;
      link: string;
      title: string;
    }
  ];
}

export interface IArticleSection {
  title: string;
  content: [];
}

export type ArticleSectionElType =
  | 'text'
  | 'list'
  | 'accent'
  | 'links'
  | 'table'
  | 'html';

export interface ArticleSectionEl {
  type: ArticleSectionElType;
  data: any;
}

// article.data.text list item
export interface IArticleTextItem {
  id: string;
  value: string;
}

// article.data
export interface ArticleData {
  lang: 'ua' | 'en';
  text: IArticleTextItem[];
  links?: IArticleTextItem[];
  ui?: IArticleTextItem[];
}

export interface IArticle {
  name: string;
  card: {
    iconName: string;
    title: string;
    description: string;
  };
  view: {
    header: IArticleHeader;
    sections: IArticleSection[];
    footer: IArticleFooter;
  };
  data: ArticleData[];
  _id: mongoose.ObjectId;
}

export type LinkItem = {
  title: string;
  link: string;
};

export interface IArticleRenderData {
  name: string;
  header: IArticleHeader;
  sections: IArticleSection[];
  footer: IArticleFooter;
  textMap: Map<string, string>;
  linkMap?: Map<string, string>;
  uiMap?: Map<string, string>;
}
