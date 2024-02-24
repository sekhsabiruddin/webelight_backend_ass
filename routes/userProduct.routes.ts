// userProduct.routes.ts
import express from 'express';
import { getProducts, filterProducts, getPaginatedProducts } from '../controllers/userProduct.controller';
import { verifyUserToken } from '../middleware/authmiddleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Products
 *   description: API endpoints for accessing products (user)
 */

/**
 * @swagger
 * /user/products:
 *   get:
 *     summary: Get all products
 *     tags: [User Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error
 */
router.get('/', verifyUserToken, getProducts);

/**
 * @swagger
 * /user/products/filter:
 *   get:
 *     summary: Filter products
 *     tags: [User Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: integer
 *         description: Minimum price of products
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: integer
 *         description: Maximum price of products
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search products by name (partial match)
 *     responses:
 *       '200':
 *         description: Successfully filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error
 */
router.get('/filter', verifyUserToken, filterProducts);

/**
 * @swagger
 * /user/products/paginate:
 *   get:
 *     summary: Get paginated products
 *     tags: [User Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of products per page (default is 10)
 *     responses:
 *       '200':
 *         description: Successfully retrieved paginated products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedProducts'
 *       '500':
 *         description: Internal server error
 */
router.get('/paginate', verifyUserToken, getPaginatedProducts);

export default router;
