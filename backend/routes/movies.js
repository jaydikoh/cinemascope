const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

// All paths start with '/api/posts'
router.get('/fetch-and-save', moviesCtrl.fetchAndSave);

// POST /api/posts
router.post('/', moviesCtrl.create);
// GET /api/posts
router.get('/', moviesCtrl.index);

router.get('/movieId', moviesCtrl.show)

router.delete('/movieId', moviesCtrl.delete1)

router.get('/movieId', moviesCtrl.update)



module.exports = router;

