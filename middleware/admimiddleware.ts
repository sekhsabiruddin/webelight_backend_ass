import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET as Secret;

// Middleware to verify admin token
export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
        return res.status(401).json({ message: 'Unauthorized - Admin token not found' });
    }
    try {
        if (!secretKey) {
            throw new Error('JWT secret key is not defined');
        }
        const decoded = jwt.verify(adminToken, secretKey);
        if (decoded && typeof decoded === 'object' && decoded.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden - Admin role required' });
        }
    } catch (error:any) {
        return res.status(401).json({ message: 'Unauthorized - Invalid admin token', error: error.message });
    }
};
