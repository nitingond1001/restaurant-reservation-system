import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

interface RegisterUserRequest extends Request {
    body: {
        username: string;
        password: string;
        email: string;
    };
}

class AuthController {
    async registerUser(req: RegisterUserRequest, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).send("All fields are required.");
                return;
            }
            const existing = await User.findOne({ email });
            if (existing) {
                res.status(409).send("User already exists.");
                return;
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name: username, email, password: hashedPassword });
            await user.save();
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).send("Registration failed.");
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            // Allow login by name or email
            const user = await User.findOne({
                $or: [{ name: username }, { email: username }]
            });
            if (!user) {
                res.status(401).send("Invalid username/email or password.");
                return;
            }
            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).send("Invalid username/email or password.");
                return;
            }
            // On success, redirect or render dashboard
            res.redirect("/dashboard");
        } catch (err) {
            console.error(err);
            res.status(500).send("Login failed.");
        }
    }

    async logoutUser(_req: Request, _res: Response): Promise<void> {
        // Logic for user logout
    }

    authenticate(_req: Request, _res: Response, next: NextFunction): void {
        // authentication logic here
        next();
    }
}

export default AuthController;