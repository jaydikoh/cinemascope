const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const ensureLoggedIn = require('../middleware/ensureLoggedIn'); // Ensure user is logged in


// All paths start with '/api/posts'
router.get('/fetch-and-save', moviesCtrl.fetchAndSave);

// POST /api/movies
router.post('/', moviesCtrl.create);
// POST /api/movies
router.get('/', moviesCtrl.index);
// GET /api/movies
router.get('/:movieId', moviesCtrl.show)
// DELETE /api/movies
router.delete('/:movieId', moviesCtrl.delete1)
// POST /api/movies

router.get('/:movieId', moviesCtrl.update)
// POST /api/movies

router.post('/:movieId/favorite', ensureLoggedIn, moviesCtrl.addFavorite);
// POST /api/movies/:movieId/comments
router.post('/:movieId/comments', moviesCtrl.createComment);




module.exports = router;

