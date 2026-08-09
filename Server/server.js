import express from "express";
import { connectDB } from "./config/db.js";
import configDotenv from "dotenv";
import studentRoutes from "./routes/student.Routes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/task.Routes.js";
import teamRoutes from "./routes/team.Routes.js";
configDotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/student", studentRoutes)
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("API is running")
})




app.listen(PORT, ()=>{  
  console.log(`Server Running on PORT http://localhost:${PORT}`)
})

