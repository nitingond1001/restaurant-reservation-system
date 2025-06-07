import { Application, Request, Response } from 'express';
import AuthController from '../controllers/authController';
import User from '../models/userModel'; // adjust path as needed

const authController = new AuthController();

export function setAuthRoutes(app: Application) {
    // Registration form (GET)
    app.get('/register', (_req: Request, res: Response) => {
        res.render('register');
    });

    // Login form (GET)
    app.get('/login', (_req: Request, res: Response) => {
        res.render('login');
    });

    // Registration handler (POST)
    app.post('/register', async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            // Basic validation
            if (!username || !email || !password) {
                return res.status(400).send('All fields are required.');
            }
            // Check if user exists
            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).send('User already exists.');
            }
            // Create user
            const user = new User({ name: username, email, password });
            await user.save();
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).send('Registration failed.');
        }
    });

    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}