import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
} catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};