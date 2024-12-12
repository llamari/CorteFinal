// models/Lista.js
const mongoose = require('mongoose');

// Definição do Schema para Lista
const ListaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  filmes: [{
    type: Number,
    required: false,  // Filme é opcional no início
  }],
  idDono: {
    type: Number,
    required: false, //depois mudar para verdadeiro 
  }
});

const Lista = mongoose.model('Lista', ListaSchema);

module.exports = Lista;
