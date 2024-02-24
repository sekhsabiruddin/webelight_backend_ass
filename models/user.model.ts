import mongoose, { Schema, Document } from 'mongoose';

interface User extends mongoose.Document {
    username: string;
    password: string;
    role: string;
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
