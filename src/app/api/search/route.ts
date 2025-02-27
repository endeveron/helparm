import { searchArticles } from 'features/search/controllers';
import { NextResponse } from 'next/server';

import logger from 'utils/logger';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const query = url.searchParams.get('q');
  logger.b('GET /search', query);

  if (!query)
    return NextResponse.json({
      error: 'Невалідний запит.',
    });

  try {
    const { data, error } = await searchArticles(query);
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('GET /search', err);
    return NextResponse.json({
      error: err.message || 'Помилка отримання новин.',
    });
  }
};
