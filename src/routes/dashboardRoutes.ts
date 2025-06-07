import { Router } from 'express';
import AuthController from '../controllers/authController';
import { Application, Request, Response } from 'express';
import User from '../models/userModel'; // Adjust the path if needed

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

export function setDashboardRoutes(app: Application) {
    app.get('/admin/users', async (_req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.render('users', { users });
        } catch (err) {
            res.status(500).send('Error fetching users');
        }
    });
}