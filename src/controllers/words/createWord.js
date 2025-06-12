//import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';


export const createWord = async(req,res)=>{

    res.status(20).json({
  "_id": "64c2d5652afb66061c3bd0ac",
  "en": "know-knew-known",
  "ua": "знати",
  "category": "verb",
  "isIrregular": true,
  "owner": "64bfc0d7cd20e3eff55ae6d7",
  "progress": 0

    })
}