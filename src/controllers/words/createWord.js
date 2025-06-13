//import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { wordsModel } from "../../db/models/Wordmodel.model.js";
export const createWord = async (req, res) => {
  const { en, ua, category, isIrregular } = req.body;
  if (!en || !ua || !category) {
    throw createHttpError(400, "Missing required fields: en, ua, category");
  }
  if (!mongoose.isValidObjectId(category)) {
    throw createHttpError(400, "Invalid category ID");
  }
  const newWord = wordsModel.create({
    en,
    ua,
    category,
    isIrregular,
  });
  res.status(20).json({
    _id: "64c2d5652afb66061c3bd0ac",
    newWord,
    owner: "64bfc0d7cd20e3eff55ae6d7",
    progress: 0,
  });
};
