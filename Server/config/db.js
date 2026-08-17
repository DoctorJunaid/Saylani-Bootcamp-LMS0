import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);   // yeh line add karo
configDotenv();



export const connectDB = async () => {
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
    
    });
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error("DB Error:", error.message);
     process.exit(1);
  }
};




