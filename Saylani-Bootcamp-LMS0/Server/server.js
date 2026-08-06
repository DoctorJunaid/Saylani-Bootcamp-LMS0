import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

 const PORT = process.env.PORT || 9000;

app.get("/", (req , res) =>{
  res.send("API is running")
})

app.listen(PORT, ()=>{
  console.log(`Server Running on PORT http://localhost:${PORT}`)
})