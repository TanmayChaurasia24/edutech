import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is not defined');
  process.exit(1);
}

const mongoconnect = (): void => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Database connected'))
    .catch((error) =>
      console.error(`Error connecting to the database: ${error}`)
    );
};

export default mongoconnect;
