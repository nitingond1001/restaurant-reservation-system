import { Application, Request, Response } from 'express';
import AuthController from '../controllers/authController';

const authController = new AuthController();

export function setAuthRoutes(app: Application) {
    // Registration form (GET)
    app.get('/register', (_req: Request, res: Response) => {
        res.render('register'); // or res.send('Register Page');
    });

    // Registration handler (POST)
    app.post('/register', (_req: Request, _res: Response) => {
        // registration logic
    });

    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}