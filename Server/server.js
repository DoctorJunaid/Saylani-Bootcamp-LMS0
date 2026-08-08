import express from "express";
import { connectDB } from "./config/db.js";
import configDotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import studentRoutes from "./routes/student.Routes.js";
import teamRoutes from "./routes/teamRoutes.js";
configDotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("API is running")
})


app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);

app.listen(PORT, ()=>{
  console.log(`Server Running on PORT http://localhost:${PORT}`)
})

