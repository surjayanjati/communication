import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import { connectToDatabase } from "./config/dbConfig";

const app = express();
const PORT = process.env.PORT;

// ✅ Middleware to parse JSON comes first
app.use(express.json());

// ✅ Then use routers
app.use("/api/v1", authRoutes);
async function startServer() {
  try {
    await connectToDatabase(); // ✅ Wait until DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("🔥 Could not start server:", err);
    process.exit(1);
  }
}

startServer();
