import { getNewsArticle } from 'features/news/controllers';
import { NextResponse } from 'next/server';

import logger from 'utils/logger';

export const GET = async (req: Request) => {
  logger.b('GET /news/article');
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({
      error: `Відсутній параметр \'url\'. GET /news/article?url=${url}`,
    });
  }

  try {
    const { data, error } = await getNewsArticle(url);
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('GET /news/article', err);
    return NextResponse.json({
      error: err.message || 'Помилка отримання новин.',
    });
  }
};
