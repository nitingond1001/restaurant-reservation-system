"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = require("./routes/authRoutes");
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const tableRoutes_1 = require("./routes/tableRoutes");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Root route FIRST
app.get('/', (_req, res) => {
    res.render('index');
});
(0, authRoutes_1.setAuthRoutes)(app);
(0, reservationRoutes_1.default)(app);
(0, tableRoutes_1.setTableRoutes)(app);
(0, dashboardRoutes_1.setDashboardRoutes)(app);
app.use(errorMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
