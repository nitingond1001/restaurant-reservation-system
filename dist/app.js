// ... your imports ...
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Express app setup
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));

// Routes
(0, setAuthRoutes)(app);
(0, reservationRoutes_1.default)(app);
(0, setTableRoutes)(app);
(0, setDashboardRoutes)(app);
app.use(errorMiddleware_1.default);

// MongoDB connection + start server
const DB_URI = process.env.DB_URI || "";
mongoose.connect(DB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
