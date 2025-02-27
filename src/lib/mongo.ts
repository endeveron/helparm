import mongoose, { ConnectOptions } from 'mongoose';

import logger from 'utils/logger';

const uri = process.env.MONGODB_URI as string;
if (!uri)
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, options as ConnectOptions)
      .then((mongoose) => {
        logger.b('Connected to database');
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    logger.r('DB connection', error);
    throw new Error('Database connection error');
  }

  return cached.conn;
};
