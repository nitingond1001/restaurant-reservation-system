"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = require("./routes/authRoutes");
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const tableRoutes_1 = require("./routes/tableRoutes");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
if (!DB_URI) {
    console.error("❌ DB_URI is missing from environment variables");
    process.exit(1);
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, authRoutes_1.setAuthRoutes)(app);
(0, reservationRoutes_1.default)(app);
(0, tableRoutes_1.setTableRoutes)(app);
(0, dashboardRoutes_1.setDashboardRoutes)(app);
app.use(errorMiddleware_1.default);
app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");
console.log("🌐 Trying to connect to MongoDB...");
mongoose_1.default
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
