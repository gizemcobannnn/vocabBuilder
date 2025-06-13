//import { MyProducts } from '../../db/models/MyProducts.model.js';
import mongoose from "mongoose";
import createHttpError from "http-errors";
import MyWords from "../../db/models/Wordmodel.model";
const getWords = async (req, res) => {
  const { productId, productWeight, date } = req.body;
  const owner = req.user._id;
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  if (!date || isNaN(Date.parse(date))) {
    throw createHttpError(400, "Invalid date!");
  }

  const dateFormatted = new Date(date).toLocaleDateString().split("T")[0];

  const allWords = await MyWords.get(
    {
      productId,
      productWeight,
      date: dateFormatted,
      owner,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  res.status(200).json({
    results: [],
    totalPages: 1,
    page: 1,
    perPage: 2,
  });
};

export { getWords };
