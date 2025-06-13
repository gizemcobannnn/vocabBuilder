import {Schema} from 'mongoose';

const ResultsSchema = new Schema({
  id:{
    type:Object,

  },
  en:{
    type:String,
    required:true
  },
  ua:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  isIrregular:{
    type:Boolean,
    required:true
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:'users', // 'users' koleksiyonuna referans
    required:true
  },
  progress:{
    type:Number,
    required:true
  },

},{
    timestamps: true,
    versionKey:false
})