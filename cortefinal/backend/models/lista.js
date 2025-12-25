// models/Lista.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  }
});

// Definição do Schema para Lista
const ListaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  filmes: [{
    type: movieSchema,
    required: false,
  }],
  idDono: {
    type: String,
    required: false,
  }
});

const Lista = mongoose.model('Lista', ListaSchema);

module.exports = Lista;
