const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  },
  { timestamps: true }
);

const movieSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true, // Ensure movie IDs are unique
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    image: {
      type: String
    },
    genres: {
      type: [String], 
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment', 
      },
     ], 
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // References users who favorited this movie
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;


