import express from "express";
import cookieParser from 'cookie-parser';
import dbConnect from './config/db'; 
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/adminProduct.routes'
import userProduct from "./routes/userProduct.routes"
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
// Connect to the database
dbConnect();

// Use the authRoutes for handling "/auth" routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user",userProduct);
const port = process.env.PORT || 8000;
// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
