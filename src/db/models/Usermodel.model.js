import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  name: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    email: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    token: {
    type: mongoose.Schema.Types.String,
    required: true, 
    ref: 'user',
  },
    results: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'results'  // örnek olarak başka bir koleksiyon adı
},{
    
}],
    totalPages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // 'users' koleksiyonuna referans
    required: true
  },
    page: {
    type: Number,
    required: true, 
    ref: 'user',
  },
    perPage: {
    type: Number,
    ref: 'users', // 'users' koleksiyonuna referans
    required: true
  }
}, {
  timestamps: true,   
  versionKey: false   
});

const users = mongoose.model('users', userSchema);
export { users };
