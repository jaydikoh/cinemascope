const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to User model
    createdAt: { type: Date, default: Date.now },
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
      type: [String], // Array of genre names
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
    //   required: true,
      ref: 'User'
    },
    comments: [commentSchema], // Embedded comments schema
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


