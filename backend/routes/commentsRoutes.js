const express = require('express');
const router = express.Router();
const { GetComments, CreateComment, LikeComment } = require('../controllers/commentsController');
const { verifyToken } = require('../middleware/jwtMiddleware');

router.get('/:movieId', GetComments); // Rota para pegar comentários de um filme
router.post('/:movieId', verifyToken, CreateComment); // Rota para criar um comentário
router.post('/like/:id', verifyToken, LikeComment); // Rota para curtir um comentário

module.exports = router;