'use client';

import { ArticleCardList } from 'components/article/ArticleCardList/ArticleCardList';
import { articleItems } from 'data/article';

const MainArticleList = () => (
  <ArticleCardList items={articleItems} className="anim--main-article-list" />
);
export { MainArticleList };
