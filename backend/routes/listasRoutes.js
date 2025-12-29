// routes/listasRoutes.js
const express = require('express');
const router = express.Router();
const { getListas, criaLista, addFilmeToLista, deleteLista, deleteFilmeFromLista } = require('../controllers/listasController');
const { verifyToken } = require('../middleware/jwtMiddleware');

// Definindo as rotas
router.get('/listas', verifyToken, getListas); // Rota para pegar todas as listas
router.post('/listas', verifyToken, criaLista); // Rota para criar uma nova lista
router.patch('/:id/adicionar', verifyToken, addFilmeToLista); // Rota para adicionar filme na lista
router.delete('/:id/deletar', verifyToken, deleteLista); // Rota para deletar uma lista
router.delete('/:id/deletar/filme/:filmeId', verifyToken, deleteFilmeFromLista); // Rota para deletar filme de uma lista

module.exports = router;
