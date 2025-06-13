import { resultsModel } from '../../models/resultsModel.js';
export const getOwnWord = async(req,res)=>{
  const { page = 1, perPage = 7 } = req.query;
  const ownerId = req.user._id; // Assuming req.user contains the authenticated user's info
  const results= await resultsModel.getDistinct('owner', ownerId);
  if(!results || results.length ===0){
    res.status(404).json({ error: 'No words found for this user' });
    return;
  }
    res.status(200).json(
        {
  "results": [
    {
      "_id": "64c6e8ecabbd3d21328a00d4",
      "en": "cat",
      "ua": "кіт",
      "category": "noun",
      "owner": "64c6dde64b0c8534d41f9b5c",
      "progress": 50
    },
    {
      "_id": "64c6e8f4abbd3d21328a00d9",
      "en": "dog",
      "ua": "пес",
      "category": "noun",
      "owner": "64c6dde64b0c8534d41f9b5c",
      "progress": 0
    }
  ],
  "totalPages": 1,
  page,
  perPage,
}
    )
}