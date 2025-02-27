import { NextRequest, NextResponse } from 'next/server';

import { VisitorsResData } from 'types/analytics';
import { CounterModel } from 'models/counter';
import logger from 'utils/logger';
import { dbConnect } from 'lib/mongo';
import {
  MAX_COUNTER_INCREASE,
  MIN_COUNTER_INCREASE,
} from 'features/analytics/configs';

// Update the visitors number
export const GET = async (
  req: NextRequest
): Promise<NextResponse<VisitorsResData>> => {
  try {
    await dbConnect();

    const counter = await CounterModel.findOne({ name: 'visitors' });
    const currentValue = counter?.value;
    if (!currentValue) {
      return NextResponse.json({
        error: 'Не вдалося отримати дані користувачів.',
        data: null,
      });
    }

    // Get a random value between the MIN_COUNTER_INCREASE and MAX_COUNTER_INCREASE
    const delta = MAX_COUNTER_INCREASE - MIN_COUNTER_INCREASE;
    const rand = Math.random();
    const addNumber = Math.floor(rand * delta) + MIN_COUNTER_INCREASE;
    // Increase the visitors number
    const newVisitorsNumber = currentValue + addNumber;
    counter.value = newVisitorsNumber;
    // Save new value
    await counter.save();

    return NextResponse.json({
      data: newVisitorsNumber,
    });
  } catch (err) {
    logger.r('', err);
    return NextResponse.json({
      error: 'Не вдалося отримати дані користувачів.',
      data: null,
    });
  }
};
