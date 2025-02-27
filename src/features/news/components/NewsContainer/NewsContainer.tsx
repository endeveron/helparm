'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Heading } from 'components/Heading';
import { NewsList } from 'features/news/components/NewsList/NewsList';
import { selectNewsList, setNewsList } from 'features/news/store';
import { INews } from 'features/news/types';
import { useFetch } from 'hooks/useFetch';

import './NewsContainer.scss';

interface NewsContainerProps {
  limit?: number;
  title?: string;
  onNewsClick?: (data: INews) => void;
}

const NewsContainer = ({ limit, title, onNewsClick }: NewsContainerProps) => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNewsList);
  const pathname = usePathname();
  const router = useRouter();
  const [fetchNews, isLoading] = useFetch<INews[]>();

  const handleNewsClick = (data: INews) => {
    if (pathname !== '/news') {
      router.push(`/news?url=${data.url}`);
      // Set current article
    }
    onNewsClick && onNewsClick(data);
  };

  // Fetch the news
  useEffect(() => {
    if (news.length) return;
    (async () => {
      const { data, error } = await fetchNews('/api/news');
      if (error) console.error(error);
      if (data) dispatch(setNewsList(data));
    })();
  }, [news, dispatch]); // eslint-disable-line

  const titleEl = title && (
    <Heading as="h2" className="news-container__title anim--d125s">
      {title}
    </Heading>
  );

  return (
    <div className="news-container anim--main-news">
      {titleEl}
      <NewsList
        news={news}
        limit={limit}
        isLoading={isLoading}
        handleNewsClick={handleNewsClick}
      />
    </div>
  );
};

export { NewsContainer };
