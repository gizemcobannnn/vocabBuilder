export const getOwnWord = async(req,res)=>{
    res.status(200).json(
        {
  "results": [
    {
      "_id": "64c6e8d7abbd3d21328a00cf",
      "en": "run-ran-run",
      "ua": "бігти",
      "category": "verb",
      "isIrregular": true,
      "owner": "64c6dde64b0c8534d41f9b5c",
      "progress": 50
    },
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
  "page": 1,
  "perPage": 7
}
    )
}