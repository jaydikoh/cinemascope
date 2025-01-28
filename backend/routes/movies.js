const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const ensureLoggedIn = require('../middleware/ensureLoggedIn'); // Ensure user is logged in


// All paths start with '/api/posts'
router.get('/fetch-and-save', moviesCtrl.fetchAndSave);

// POST /api/posts
router.post('/', moviesCtrl.create);
// GET /api/posts
router.get('/', moviesCtrl.index);

router.get('/:movieId', moviesCtrl.show)

router.delete('/:movieId', moviesCtrl.delete1)

router.get('/:movieId', moviesCtrl.update)

router.post('/:movieId/favorite', ensureLoggedIn, moviesCtrl.addFavorite);




module.exports = router;

