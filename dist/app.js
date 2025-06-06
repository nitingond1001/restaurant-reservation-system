"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
import { setAuthRoutes } from "./routes/authRoutes";
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
import { setTableRoutes } from "./routes/tableRoutes";
import { setDashboardRoutes } from "./routes/dashboardRoutes";
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, setAuthRoutes)(app);
(0, reservationRoutes_1.default)(app);
(0, setTableRoutes)(app);
(0, setDashboardRoutes)(app);
app.use(errorMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
