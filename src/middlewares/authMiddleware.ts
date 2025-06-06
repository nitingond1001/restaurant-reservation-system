import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: typeof User.prototype;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
        if (err || !decoded || typeof decoded !== 'object' || !('id' in decoded)) {
            return res.status(401).json({ message: 'Token is not valid.' });
        }

        try {
            const user = await User.findById((decoded as { id: string }).id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server error.' });
        }
    });
};

export default authMiddleware;