import mongodb from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully✅');
 } catch (error) {
    console.error('MongoDB connection error❌:', error);
    process.exit(1); // Exit process with failure
 }
}

export default connectDB;