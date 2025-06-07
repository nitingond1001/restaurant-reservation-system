"use strict";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { setAuthRoutes } from "./routes/authRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import { setTableRoutes } from "./routes/tableRoutes";
import { setDashboardRoutes } from "./routes/dashboardRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error("❌ DB_URI is missing in environment variables");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAuthRoutes(app);
reservationRoutes(app);
setTableRoutes(app);
setDashboardRoutes(app);
app.use(errorMiddleware);

console.log("🌐 Trying to connect to MongoDB...");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "reservation_db", // Replace with your DB name if different
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err);
    process.exit(1);
  });
