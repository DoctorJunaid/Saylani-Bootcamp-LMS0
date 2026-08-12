import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

let isConnected = false; // Track connection status

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is missing!");
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error;
  }
};