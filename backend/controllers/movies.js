const Movie = require('../models/movie')

// const express = require('express')
// const router = express.Router()

// All paths start with /api/movies
module.exports = {
    create,
    index,
    delete1,
    update,
    show
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

// GET /api/movies/:movietId (SHOW action)
async function show(req, res) {
    try {
      const foundMovie = await Movie.findById(req.params.movieId);
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

