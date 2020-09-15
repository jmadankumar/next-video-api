import mongoose from 'mongoose';
import { DatabaseError } from '../helper/error';

export default function initDatabase(): void {
  const DB_NAME = process.env.DB_NAME;
  const DB_URL = process.env.DB_URL;
  const DB_PORT = process.env.DB_PORT;

  if (DB_NAME && DB_URL && DB_PORT) {
    mongoose.connect(`${DB_URL}:${DB_PORT}`, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
      throw new DatabaseError(error.message);
    });

    connection.once('open', function () {
      console.log('connected');
    });
  } else {
    throw new DatabaseError('Invalid Database Connection options');
  }
}
