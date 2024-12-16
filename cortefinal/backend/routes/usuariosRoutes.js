const express = require('express')
const router = express.Router();
const { getUsuario, cadastra, verifica } = require('../controllers/usuariosController');

router.get('/users', getUsuario);
router.post('/cadastro', cadastra);
router.post('/login', verifica);

module.exports = router;