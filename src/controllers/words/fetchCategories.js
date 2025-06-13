//import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { wordsModel } from '../../db/models/Wordmodel.model';

export const fetchCategories= async(req,res)=>{
    const categories= await wordsModel.getDistinct('category');
    if (!categories || categories.length === 0) {
        return res.status(404).json({ error: 'No categories found' });
    }
    res.status(200).json({
        categories
    })
}