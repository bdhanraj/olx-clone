const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true, 
    },
    price:{
        type: String,
        default: "General"
    },
    description:{
        type: String,
        required: true, 
    },
    image:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('posts', PostsSchema);