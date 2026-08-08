import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import studentRoutes from "./routes/student.Routes.js"
import configDotenv from "dotenv";
configDotenv.config()

const app = express();
app.use(express.json());

// Routes
app.use("/api", studentRoutes)

const PORT = process.env.PORT ;
connectDB();


app.get("/", (req , res) =>{
  res.send("API is running")
})

app.listen(PORT, ()=>{
  console.log(`Server Running on PORT http://localhost:${PORT}`)
})