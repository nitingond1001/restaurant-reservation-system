import { Router } from 'express';
import AuthController from '../controllers/authController';

const authController = new AuthController();

export function setAuthRoutes(app: Router) {
    app.post('/register', authController.registerUser.bind(authController));
    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}