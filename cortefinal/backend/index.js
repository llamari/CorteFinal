const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const listasRoutes = require('./routes/listasRoutes'); // Importa as rotas

const dbConfig = require('./config/db');		
const filmesRoutes = require('./routes/filmesRoutes');		
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Para parsear o corpo das requisições como JSON

dbConfig();

// Conexão com o MongoDB (caso esteja utilizando o MongoDB)
mongoose.connect('mongodb://localhost:27017/seuBanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB!');
}).catch(err => {
  console.log('Erro ao conectar ao MongoDB:', err);
});

// Rotas
app.use('/', filmesRoutes);	
app.use('/api', listasRoutes);  // Prefixo /api para todas as rotas definidas em listasRoutes

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//a freira, chuck, toy story, o amor é cego, 50 tons de preto, trocando talentos, intocáveis, stuart little, um sonho possivel, até que a morte nos separe, até que a sorte nos separe, harry potter:o prisioneiro de askaban