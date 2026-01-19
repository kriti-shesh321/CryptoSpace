import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return res.status(401).send('Unauthorized');

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, ENV.JWT_SECRET) as { userId: string; };
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}