import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    category: string;
    price: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true }
});

export default mongoose.model<Product>('Product', ProductSchema);
