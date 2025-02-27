import { MongoClient } from 'mongodb';

declare global {
  var _mongoose: {
    conn: any | null;
    promise: Promise<Mongoose> | null;
  };
}
