import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET as Secret;

export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.cookies.userToken;
    if (!userToken) {
        return res.status(401).json({ message: 'Unauthorized - user token not found' });
    }

    try {
        if (!secretKey) {
            throw new Error('JWT secret key is not defined');
        }
        const decoded = jwt.verify(userToken, secretKey);
        if (decoded && typeof decoded === 'object' && decoded.role === 'user') {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden - user role required' });
        }
    } catch (error:any) {
        return res.status(401).json({ message: 'Unauthorized - Invalid user token', error: error.message });
    }
};
