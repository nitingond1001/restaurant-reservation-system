import { Router } from 'express';
import AuthController from '../controllers/authController';
import { Application, Request, Response } from 'express';

const router = Router();
const authController = new AuthController();

interface IUser {
    id: string;
    username: string;
    role: string;
    [key: string]: any;
}

interface IAuthenticatedRequest extends Request {
    user?: IUser;
}

// User Dashboard Routes
router.get(
    '/user/dashboard',
    authController.authenticate,
    (req: IAuthenticatedRequest, res: Response) => {
        res.render('userDashboard', { user: req.user });
    }
);

// Admin Dashboard Routes
router.get(
    '/admin/dashboard',
    authController.authenticate,
    (req: IAuthenticatedRequest, res: Response) => {
        if (req.user?.role === 'admin') {
            res.render('adminDashboard', { user: req.user });
        } else {
            res.status(403).send('Access denied');
        }
    }
);

export const setDashboardRoutes = (app: Application): void => {
    app.use('/dashboard', router);
};