'use client';

import { createRef, useCallback, useEffect, useState } from 'react';

import { ArticleCardList } from 'components/article/ArticleCardList/ArticleCardList';
import { SearchBox } from 'features/search/components/SearchBox/SearchBox';
import { IArticleItem } from 'types/article';
import { createCardListFromArticles } from 'utils/article';

import './SearchClient.scss';

const searchArticles = async (query: string) => {
  const errMsg = 'Помилка отримання даних статті.';
  try {
    const res = await fetch(`/api/search?q=${query}`);
    if (!res.ok) return { error: errMsg, data: null };
    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: errMsg, data: null };
  }
};

const SearchClient = () => {
  const [query, setQuery] = useState('');
  const [articleCards, setArticleCards] = useState<
    IArticleItem[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = createRef<HTMLInputElement>();

  const handleSearch = useCallback(async () => {
    if (!query) setArticleCards(undefined);

    setIsLoading(true);
    const { data: articles, error: searchError } = await searchArticles(query);
    setIsLoading(false);
    if (searchError) setError(searchError);
    if (articles) {
      setArticleCards(createCardListFromArticles(articles));
    }
  }, [query]);

  useEffect(() => {
    query && handleSearch();
  }, [query, handleSearch]);

  const handleClear = () => {
    setArticleCards(undefined);
  };

  // Set focus to the input element
  useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, [inputRef]);

  const noResultMessage = articleCards?.length === 0 && (
    <div className="search__message anim">
      Не знайдено. Спробуйте змінити запит.
    </div>
  );

  const articleCardListEl = !!articleCards?.length && (
    <ArticleCardList items={articleCards} />
  );

  return (
    <div className="search">
      <div className="search__header">
        <SearchBox
          ref={inputRef}
          onSearch={(query) => setQuery(query)}
          onClear={handleClear}
          isLoading={isLoading}
          placeholder="Пошук в статтях"
          className="search__box"
        />
      </div>
      <div className="search__result">
        {articleCardListEl}
        {noResultMessage}
      </div>
    </div>
  );
};

export { SearchClient };
