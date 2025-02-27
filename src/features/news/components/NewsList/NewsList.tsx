'use client';

import { useMemo } from 'react';
import { v4 as uid } from 'uuid';

import { ViewLoading } from 'components';
import { NewsCard } from 'features/news/components/NewsCard/NewsCard';
import { INews } from 'features/news/types';

import './NewsList.scss';

interface NewsListProps {
  news: INews[];
  handleNewsClick: (data: INews) => void;
  isLoading: boolean;
  limit?: number;
}

const NewsList = ({
  news,
  limit = 6,
  isLoading,
  handleNewsClick,
}: NewsListProps) => {
  const listItems: INews[] = useMemo(() => news.slice(0, limit), [news, limit]);

  if (isLoading) return <ViewLoading />;

  return (
    <div className="news-list card-list">
      {listItems.map((data) => (
        <NewsCard {...data} onClick={() => handleNewsClick(data)} key={uid()} />
      ))}
    </div>
  );
};

export { NewsList };
