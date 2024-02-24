import { Request, Response } from 'express';
import Product from '../models/product.model';

interface FilterQuery {
    category?: string;
    price?: {
        $gte?: number;
        $lte?: number;
    };
    name?: RegExp;
}

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Filter products by category, price band, name, etc.
export const filterProducts = async (req: Request, res: Response) => {
    try {
        let query: FilterQuery = {};

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category as string;
        }

        // Filter by price range
        if (req.query.priceMin && req.query.priceMax) {
            query.price = {
                $gte: parseInt(req.query.priceMin as string),
                $lte: parseInt(req.query.priceMax as string)
            };
        } else if (req.query.priceMin) {
            query.price = { $gte: parseInt(req.query.priceMin as string) };
        } else if (req.query.priceMax) {
            query.price = { $lte: parseInt(req.query.priceMax as string) };
        }

        // Filter by name (partial match)
        if (req.query.name) {
            query.name = new RegExp(req.query.name as string, 'i');
        }

        const filteredProducts = await Product.find(query);
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};



export const getPaginatedProducts = async (req: Request, res: Response) => {
    try {
        // Pagination parameters (default to page 1 and page size 10 if not provided)
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        // Calculate skip value based on page number and page size
        const skip = (page - 1) * pageSize;

        // Query the database for products with pagination
        const products = await Product.find().skip(skip).limit(pageSize);

        // Count total number of products (for pagination metadata)
        const totalCount = await Product.countDocuments();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalCount / pageSize);

        // Return paginated results along with pagination metadata
        res.json({
            products,
            pagination: {
                page,
                pageSize,
                totalCount,
                totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};