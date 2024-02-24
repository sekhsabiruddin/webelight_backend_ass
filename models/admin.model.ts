import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Admin document
interface IAdmin extends Document {
    username: string;
    password: string;
    role: string;
}

// Define schema for Admin
const adminSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// Define and export Admin model
const AdminModel = mongoose.model<IAdmin>('Admin', adminSchema);

export default AdminModel;
