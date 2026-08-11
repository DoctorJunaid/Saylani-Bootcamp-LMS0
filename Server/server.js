import "dotenv/config"; 
import app from "./app.js"; // app instance ko import kiya
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 9000;


// 1. Pehle Database Connect karein
connectDB()
  .then(() => {
    // 2. DB connect hone ke baad server start karein
    app.listen(PORT, () => {  
      console.log(`Server Running on PORT http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Server ko crash hone se bachane ke liye exit code
  });
