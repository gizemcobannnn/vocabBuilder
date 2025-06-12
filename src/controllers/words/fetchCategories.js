//import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const fetchCategories= async(req,res)=>{
    
    res.status(200).json({
        categories
    })
}