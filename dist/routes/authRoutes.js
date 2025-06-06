"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../controllers/authController"));
const authController = new authController_1.default();
function setAuthRoutes(app) {
    app.post('/register', authController.registerUser.bind(authController));
    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}
const _setAuthRoutes = setAuthRoutes;
export { _setAuthRoutes as setAuthRoutes };
