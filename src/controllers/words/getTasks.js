export const getTasks = async(req,res)=>{
    res.status(200).json(
        {
  "words": [
    {
      "_id": "64c44e7b9307a6e92f3a25c3",
      "ua": "знати",
      "task": "en"
    },
    {
      "_id": "64c44ea29307a6e92f3a25c8",
      "ua": "кіт",
      "task": "en"
    },
    {
      "_id": "64c44eb59307a6e92f3a25cd",
      "ua": "пес",
      "task": "en"
    }
  ]
}
    )
}