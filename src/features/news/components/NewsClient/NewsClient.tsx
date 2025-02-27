'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Heading } from 'components/Heading';
import { LoadingSpinner } from 'components/ui/LoadingSpinner/LoadingSpinner';
import { NewsArticle } from 'features/news/components/NewsArticle/NewsArticle';
import { NewsContainer } from 'features/news/components/NewsContainer/NewsContainer';
import { INews, INewsArticle } from 'features/news/types';
import { useMediaQuery } from 'hooks/useMediaQuery';

import './NewsClient.scss';

const fetchArticleDataByUrl = async (url: string) => {
  const errMsg = 'Помилка отримання даних статті.';
  try {
    const res = await fetch(`/api/news/article?url=${url}`);
    if (!res.ok) return { error: errMsg, data: null };
    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: errMsg, data: null };
  }
};

const NewsClient = () => {
  const isLargeScreen = useMediaQuery('(min-width: 992px)'); // 'lg' breakpoint

  const searchParams = useSearchParams();
  const url = searchParams?.get('url');

  const [articleData, setArticleData] = useState<INewsArticle | null>();
  const [isArticleLoading, setIsArticleLoading] = useState(false);
  // const [error, setError] = useState('');

  const getArticleData = useCallback(async (url: string) => {
    setIsArticleLoading(true);
    const { data, error: err } = await fetchArticleDataByUrl(url);
    if (data) setArticleData(data);
    // if (err) setError(err);
    setIsArticleLoading(false);
  }, []);

  const handleNewsClick = useCallback(
    (data: INews) => {
      if (!data.url) return;
      setArticleData(null);
      getArticleData(data.url);
      !isLargeScreen && scrollTop();
    },
    [isLargeScreen, getArticleData]
  );

  // Init article data
  useEffect(() => {
    if (!url) return;
    getArticleData(url);
  }, [url, getArticleData]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const newsContainerEl = useMemo(() => {
    return <NewsContainer onNewsClick={handleNewsClick} limit={30} />;
  }, [handleNewsClick]);

  const articleLoadingEl = <LoadingSpinner className="news__loading accent" />;

  return (
    <main className="news anim anim-children">
      <Heading as="h1" className="news__title view-title">
        Про головне
      </Heading>
      <div className="news__content anim">
        <div className="news__column news__article">
          {isArticleLoading && articleLoadingEl}
          {!!articleData && <NewsArticle {...articleData} />}
        </div>
        <div className="news__column news__list">{newsContainerEl}</div>
      </div>
    </main>
  );
};

export { NewsClient };
