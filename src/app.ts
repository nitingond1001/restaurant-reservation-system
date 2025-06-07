import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { setAuthRoutes } from "./routes/authRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import { setTableRoutes } from "./routes/tableRoutes";
import { setDashboardRoutes } from "./routes/dashboardRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error("❌ DB_URI is missing from environment variables");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAuthRoutes(app);
reservationRoutes(app);
setTableRoutes(app);
setDashboardRoutes(app);
app.use(errorMiddleware);

app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");

console.log("🌐 Trying to connect to MongoDB...");

mongoose
  .connect(DB_URI, {
    dbName: "reservation_db", // ✅ Only this is needed
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.get("/", (_req, res) => {
      res.render("index");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(error);
    process.exit(1);
  });

