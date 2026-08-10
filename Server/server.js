import express from "express";
import { connectDB } from "./config/db.js";
import configDotenv from "dotenv";
import studentRoutes from "./routes/student.Routes.js";
import projectRoutes from "./routes/project.Routes.js";
import taskRoutes from "./routes/task.Routes.js";
import teamRoutes from "./routes/team.Routes.js";
import adminRouter from "./routes/admin.Routes.js";
import { protectAdmin } from "./middleware/auth.middleware.js";



const app = express();
app.use(express.json());

// Routes
app.use("/api/admin", adminRouter)
app.use("/api/student",protectAdmin, studentRoutes)
app.use("/api/tasks",protectAdmin, taskRoutes);
app.use("/api/teams",protectAdmin, teamRoutes);
app.use("/api/projects",protectAdmin, projectRoutes);

const PORT = process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("API is running")
})




app.listen(PORT, ()=>{  
  console.log(`Server Running on PORT http://localhost:${PORT}`)
})

