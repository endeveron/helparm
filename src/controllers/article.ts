import { ArticleModel } from 'models/article';
import { dbConnect } from 'lib/mongo';
import { IArticle } from 'types/article';
import { IControllerResult } from 'types/common';

import logger from 'utils/logger';

export const getArticles = async (): IControllerResult<IArticle[]> => {
  try {
    await dbConnect();
    const articles = await ArticleModel.find({});
    return {
      data: articles,
    };
  } catch (err: any) {
    logger.r('controllers/article getArticles', err);
    return {
      error: `Не вдалося отримати список статей. ${err.message}`,
      data: null,
    };
  }
};

export const getArticleByName = async (
  name: string
): IControllerResult<IArticle> => {
  try {
    await dbConnect();

    const article = await ArticleModel.findOne({ name });
    return {
      data: article,
    };
  } catch (err: any) {
    logger.r('controllers/article getArticle', err);
    return {
      error: `Помилка отримання даних статті. ${err.message}`,
      data: null,
    };
  }
};
