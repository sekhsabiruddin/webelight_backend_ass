// productController.ts
import { Request, Response } from 'express';
import Product from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};
