import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;
async function dbConnect() {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not provided in the environment variables");
    }
    await mongoose.connect(uri);
    console.log('Database Connected sucesssfully');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

export default dbConnect;
