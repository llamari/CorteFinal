// models/Filme.js
const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  capa: String,
  descricao: String,
  nota: Number,
  fav: Boolean,
}, { collection: 'Filmes' });

module.exports = mongoose.model('Filme', FilmeSchema);
