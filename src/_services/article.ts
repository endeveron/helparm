import { BASE_URL } from 'configs/constants';
import logger from 'utils/logger';

// const revalidate = 3600; // revalidate at most every hour

export const fetchArticles = async () => {
  // logger.b('services/article: fetchArticles');

  const res = await fetch(`/api/articles`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
};

export const fetchArticlesByQuery = async (query: string) => {
  // logger.b('services/article: fetchArticlesByQuery');

  const res = await fetch(`/api/articles/?q=${query}`);

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
};
