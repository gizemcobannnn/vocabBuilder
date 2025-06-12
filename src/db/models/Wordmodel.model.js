import mongoose from 'mongoose';

const myWordsSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, //  Test için required=false yaptık, sonra true'ya alabiliriz.
    ref: 'user',
  },
});

const myWords = mongoose.model('mywords', myWordsSchema);
export { myWords };
