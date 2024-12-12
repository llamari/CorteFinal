// routes/listasRoutes.js
const express = require('express');
const router = express.Router();
const { getListas, criaLista, addFilmeToLista, deleteLista, deleteFilmeFromLista } = require('../controllers/listasController');

// Definindo as rotas
router.get('/listas', getListas); // Rota para pegar todas as listas
router.post('/listas', criaLista); // Rota para criar uma nova lista
router.patch('/:id/adicionar', addFilmeToLista); // Rota para adicionar filme na lista
router.delete('/:id/deletar', deleteLista); // Rota para deletar uma lista
router.delete('/:id/deletar/filme/:filmeId', deleteFilmeFromLista); // Rota para deletar filme de uma lista

module.exports = router;
