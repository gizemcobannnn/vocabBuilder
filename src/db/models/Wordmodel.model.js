import mongoose from 'mongoose';

const myWordsSchema = new mongoose.Schema({

  en: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    ua: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    category: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    isIrregular: {
    type: mongoose.Schema.Types.Boolean,
    required: true, 
    ref: 'user',
  },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // 'users' koleksiyonuna referans
    required: true
  }
}, {
  timestamps: true,   
  versionKey: false   
});

const wordsModel = mongoose.model('wordsModel', myWordsSchema);
export { wordsModel };
