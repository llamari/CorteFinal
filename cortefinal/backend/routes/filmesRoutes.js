// routes/filmesRoutes.js
const express = require('express');
const router = express.Router();
const { getFilmes, updateFavorito } = require('../controllers/filmesController');

router.get('/filmes', getFilmes);
router.patch('/:id/fav', updateFavorito);

module.exports = router;
