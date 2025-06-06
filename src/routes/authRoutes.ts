import { Application, Request, Response } from 'express';
import AuthController from '../controllers/authController';
import path from 'path';

const authController = new AuthController();

export function setAuthRoutes(app: Application) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    // Registration form (GET)
    app.get('/register', (_req: Request, res: Response) => {
        res.render('register');
    });

    // Registration handler (POST)
    app.post('/register', (_req: Request, _res: Response) => {
        // registration logic
    });

    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}