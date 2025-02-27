export interface INews {
  source: string;
  title: string;
  sourceTitle: string;
  url: string;
  date: string;
}

export interface INewsArticle {
  date: string;
  source: string;
  sourceTitle: string;
  title: string;
  imgSrc: string;
  url: string;
  paragraphs: string[];
  lead?: string;
}

export interface INewsSlice {
  list: INews[];
  timestamp: number;
}
