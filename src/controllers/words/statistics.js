import wordsModel from "../../models/words.js";
export const statistics = async(req,res)=>{
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });  
  }
  const statistics = await wordsModel.aggregate([
    {
      $match: { owner: userId }
    },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
        categories: { $addToSet: "$category" }
      }
    } ])
    res.status(200).json({
  "totalCount": statistics
})
}