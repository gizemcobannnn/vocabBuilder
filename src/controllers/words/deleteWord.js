import { wordsModel } from "../../db/models/Wordmodel.model";
export const deleteWord = async (req, res) => {
  const { wordId } = req.params;
  if (!wordId) {
    return res.status(400).json({ error: "Word ID is required" });
  }
  const word = await wordsModel.findaByIdAndDelete(wordId);
  if (!word) {
    return res.status(404).json({ error: "Word not found" });
  }

  res.status().json({
    message: "This word was deleted",
    id: wordId,
  });
};
