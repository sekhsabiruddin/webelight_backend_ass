// auth.routes.ts
import express from 'express';
import { Request, Response } from 'express';
import { registerUser, loginUser, registerAdmin, loginAdmin } from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User and Admin authentication operations
 */

/**
 * @swagger
 * /auth/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Error registering user
 */
router.post('/user/register', async (req: Request, res: Response) => {
    await registerUser(req, res);
});

/**
 * @swagger
 * /auth/user/login:
 *   post:
 *     summary: Log in as an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Incorrect username or password
 *       '500':
 *         description: Error logging in user
 */
router.post('/user/login', async (req: Request, res: Response) => {
    await loginUser(req, res);
});

/**
 * @swagger
 * /auth/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Admin registered successfully
 *       '500':
 *         description: Error registering admin
 */
router.post("/admin/register", async (req: Request, res: Response) => {
    await registerAdmin(req, res);
});

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: Log in as an existing admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Admin logged in successfully
 *       '401':
 *         description: Incorrect username or password
 *       '500':
 *         description: Error logging in admin
 */
router.post("/admin/login", async (req: Request, res: Response) => {
    await loginAdmin(req, res);
});

export default router;
