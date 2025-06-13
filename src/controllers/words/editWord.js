import { wordsModel } from "../../db/models/Wordmodel.model";

export const editWord = async (req, res) => {

  const { wordId } = req.params;
  const { en, ua, category, isIrregular } = req.body;
  if (!wordId) {
    return res.status(400).json({ error: "Word ID is required" });
  } 
  if (!en || !ua || !category) {
    return res.status(400).json({ error: "Missing required fields: en, ua, category" });
  }
  if (!isIrregular) {
    return res.status(400).json({ error: "isIrregular field is required" });
  }
  await wordsModel.findByIdAndUpdate(wordId, {
    en,
    ua,
    category,
    isIrregular,
  }, { new: true });

  res.status(200).json({
    _id: wordId,
    en,
    ua,
    category,
    isIrregular,
    owner: "64bfc0d7cd20e3eff55ae6d7",
    progress: 0,
  });
};