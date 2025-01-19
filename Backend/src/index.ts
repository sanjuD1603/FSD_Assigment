import express from "express";
import connectdb from "./config/db.js";
import dotenv from 'dotenv';
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();


app.use("/products", productRoutes);
connectdb();
 
app.listen(5000,() => {
    console.log('Server is running on port 5000');
});


