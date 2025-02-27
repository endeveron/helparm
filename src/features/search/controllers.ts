import { dbConnect } from 'lib/mongo';
import { ArticleModel } from 'models/article';
import { IArticle } from 'types/article';
import { IControllerResult } from 'types/common';
import logger from 'utils/logger';

export const searchArticles = async (
  query: string
): IControllerResult<IArticle[]> => {
  try {
    await dbConnect();

    // Detect the phrase
    const isPhrase = /\s/g.test(query);
    if (isPhrase) query = `"${query}"`;

    const articles = await ArticleModel.find({
      $text: { $search: query },
    });

    return {
      data: articles,
    };
  } catch (err: any) {
    logger.r('controllers/article searchArticles', err);
    return {
      error: `Помилка обробки запиту. ${err.message}`,
      data: null,
    };
  }
};
