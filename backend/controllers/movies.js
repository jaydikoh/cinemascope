const Movie = require('../models/movie');
const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const Comment = require("../models/comment");
// const { findById } = require('../models/user');

// All paths start with /api/movies
module.exports = {
    create,
    index,
    delete1,
    update,
    show,
    fetchAndSave,
    addFavorite,
    createComment,
    deleteComment,
    updateComment,
    getFavorites
}

async function fetchAndSave(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}`);
    const data = await response.json();

    const movies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      genres: movie.genre_ids, 
      image: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    }));
    // Save movies to database
    for (const movie of movies) {
      await Movie.findOneAndUpdate({ id: movie.id }, movie, { upsert: true, new: true });
    }

    res.status(200).json({ message: 'Movies successfully fetched and saved to database!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/movies (INDEX action)
async function index(req, res) {
    try {
      const movies = await Movie.find({});
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  async function getFavorites(req, res) {
    try {
      const userId = req.user._id; // Get the logged-in user's ID
      const favoriteMovies = await Movie.find({ favorites: userId }); // Find movies where the user has favorited
      res.status(200).json(favoriteMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// GET /api/movies/:movietId (SHOW action)
async function show(req, res) {
    try {
      const {movieId} = req.params;
      const foundMovie = await Movie.findOne({ id: movieId}).populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' }, // Populate author's name
      });
      if (!foundMovie) {
        res.status(404);
        throw new Error('Movie not found');
      }
      res.status(200).json(foundMovie);
    } catch (err) {
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  };
  
  // POST /api/movies (CREATE action)
  async function create(req, res) {
    try {
      const createdMovie = await Movie.create(req.body);
      res.status(201).json(createdMovie);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };
  
  // DELETE /api/movies/:movieId (DELETE action)
  async function delete1(req, res) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);
      if (!deletedMovie) {
        res.status(404);
        throw new Error('Movie not found');
      }
      res.status(200).json(deletedMovie);
    } catch (err) {
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  };
  
  // PUT /api/movies/:movieId (UPDATE action)
  async function update(req, res) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.movieId,
        req.body,
        { new: true }
      );
      if (!updatedMovie) {
        res.status(404);
        throw new Error('Movie not found');
      }
      res.status(200).json(updatedMovie);
    } catch (err) {
      if (res.statusCode !== 404) res.status(500);
      res.json({ err: err.message });
    }
  };

  async function addFavorite(req, res) {
    try {
      const { movieId } = req.params;
      const userId = req.user._id; 
      
      let movie = await Movie.findOne({ id: movieId });
      const isFavorited = movie.favorites.some((id) => id.toString() === userId.toString());
      
      if (isFavorited) {
        movie.favorites = movie.favorites.filter((id) => id.toString() !== userId.toString());
      } else {
        movie.favorites.push(userId);
      }
      await movie.save();
      
      res.status(200).json({
        message: isFavorited ? 'Removed from watchlist' : 'Added to watchlist',
        movie,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // /api/comments (create comment)
  async function createComment(req, res) {
  try {
    const movie = await Movie.findOne({ id: req.params.movieId });
    req.body.author = req.user._id;
    const comment = await Comment.create(req.body);
    movie.comments = [comment._id, ...movie.comments]
    await movie.save()
    await movie.populate({
      path: 'comments',
      populate: { path: 'author', select: 'name' }});
    res.status(201).json(movie);
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: err.message });
  }
}

async function deleteComment(req, res) {
  try {
    const { commentId, movieId } = req.params;
    const userId = req.user._id; // Logged-in user's ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Ensure only the author can delete their comment
    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }
    await Comment.findByIdAndDelete(commentId);
    await Movie.findOneAndUpdate(
      { id: movieId },
      { $pull: { comments: commentId } } // Removes the comment ID from the comments array
    );
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ err: err.message });
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const userId = req.user._id; // Logged-in user's ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }
    comment.text = req.body.text;
    await comment.save();
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ err: err.message });
  }
}