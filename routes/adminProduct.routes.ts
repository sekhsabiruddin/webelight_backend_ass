// adminProduct.routes.ts
import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/adminProduct.controller';
import { verifyAdminToken } from "../middleware/admimiddleware";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Products
 *   description: API endpoints for managing products (admin only)
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/', verifyAdminToken, createProduct);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error
 */
router.get('/', verifyAdminToken, getProducts);

/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', verifyAdminToken, updateProduct);

/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', verifyAdminToken, deleteProduct);

export default router;
