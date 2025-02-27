'use client';

import { memo } from 'react';
import { v4 as uid } from 'uuid';

import { ArticleCard } from 'components/article/ArticleCard/ArticleCard';
import { IArticleItem } from 'types/article';

import './ArticleCardList.scss';

interface ArticleCardListProps {
  items: IArticleItem[];
  className?: string;
}

const ArticleCardList = memo(({ items, className }: ArticleCardListProps) => {
  return (
    <div className={`article-card-list card-list anim-children ${className}`}>
      {items.map((card) => (
        <ArticleCard {...card} key={uid()} />
      ))}
    </div>
  );
});

ArticleCardList.displayName = 'ArticleCardList';

export { ArticleCardList };
