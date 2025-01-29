const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
      text: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to User model
    },
    { timestamps: true }
  );


  const Comment = mongoose.model('Comment', commentSchema);
  
  module.exports = Comment;
  