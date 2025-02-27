import {
  createOffer,
  deleteOffer,
  getOffers,
} from 'features/offers/controllers';
import { NextResponse } from 'next/server';

import logger from 'utils/logger';

export const GET = async (req: Request) => {
  logger.b('GET /offers');

  try {
    const { data, error } = await getOffers();
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('GET /offers', err);
    return NextResponse.json({
      error: err.message || 'Помилка отримання оголошень.',
    });
  }
};

export const POST = async (req: Request) => {
  logger.b('POST /offers');
  const { offerData } = await req.json();

  try {
    const { data, error } = await createOffer(offerData);
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('POST /offers', err);
    return NextResponse.json({
      error: err.message || 'Помилка створення оголошення.',
    });
  }
};

export const DELETE = async (req: Request) => {
  logger.b('DELETE /offers');
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get('_id');

  if (!_id) {
    return NextResponse.json({
      error: 'Відсутній id оголошення.',
    });
  }

  try {
    const { data, error } = await deleteOffer(_id);
    if (error) return NextResponse.json({ error, data: null });
    return NextResponse.json(data);
  } catch (err: any) {
    logger.r('DELETE /offers', err);
    return NextResponse.json({
      error: err.message || 'Помилка видалення оголошення.',
    });
  }
};
