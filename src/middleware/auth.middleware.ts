import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies?.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
