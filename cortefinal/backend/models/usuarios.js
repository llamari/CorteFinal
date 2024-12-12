const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    _id: Number,
    nome: String,
    email: String,
    senha: String,
}, {collection: 'Usuários'});

module.exports = mongoose.model('Usuário', usuarioSchema);