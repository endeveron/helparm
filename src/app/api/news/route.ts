import { getNews } from 'features/news/controllers';
import { NextResponse } from 'next/server';

import logger from 'utils/logger';

export const GET = async (req: Request) => {
  logger.b('GET /news');

  try {
    const { data, error } = await getNews();
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('GET /news', err);
    return NextResponse.json({
      error: err.message || 'Помилка отримання новин.',
    });
  }
};
