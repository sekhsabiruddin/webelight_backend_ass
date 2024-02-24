import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import AdminModel from '../models/admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();



// Retrieve JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET;

// Check if JWT_SECRET is defined
if (!secretKey) {
    console.error('JWT_SECRET is not defined in the environment variables.');
    process.exit(1); // Exit the process if JWT_SECRET is not defined
}


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword, role: 'user' });
        await newUser.save();
        
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        // Generate JWT token using secret key
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey);

        // Set cookie with JWT token
        res.cookie('userToken', token, { httpOnly: true });

        res.json({ message: 'User login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModel({ username, password: hashedPassword, role: 'admin' });
        await newAdmin.save();
        
        res.json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminModel.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        // Generate JWT token using secret key
        const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, secretKey);

        // Set cookie with JWT token
        res.cookie('adminToken', token, { httpOnly: true });

        res.json({ message: 'Admin login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin', error });
    }
};
