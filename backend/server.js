// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import gridRoutes from "./routes/gridRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import governmentRoutes from "./routes/governmentRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import { initDemo } from "./utils/seed.js";
import { scheduleJobs } from "./utils/scheduler.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import assistantRoutes from "./routes/assistant.js";

import connectDB from "./config/db.js";

// Connect to Mongo
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/assistant", assistantRoutes);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/grid-data", gridRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/government", governmentRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/ai", aiRoutes);

// health
app.get("/", (req, res) =>
  res.json({ status: "GreenNova backend (DEMO_MODE)", demo: process.env.DEMO_MODE === "true" })
);

// Error handler (last)
app.use(errorHandler);

// Start
async function start() {
  try {
    if (process.env.DEMO_MODE === "true") {
      console.log("⚠️ DEMO_MODE enabled — seeding in-memory demo data");
      initDemo();
    } else {
      console.log("🔌 Production / DB mode — connect to DB here (not configured)");
    }

    scheduleJobs(); // safe scheduler that checks arrays
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`));
  } catch (err) {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  }
}

start();
