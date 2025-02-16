import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
import { connectDB, pool } from "./db/connection.js";

import authRoutes from "./routes/auth.route.js";
import dataRoutes from "./routes/data.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
// app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
