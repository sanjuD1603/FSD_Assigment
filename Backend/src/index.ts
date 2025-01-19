import express from "express";
import connectdb from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();



connectdb();
 
app.listen(5000,() => {
    console.log('Server is running on port 5000');
});


