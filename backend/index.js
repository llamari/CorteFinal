const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dbConfig = require('./config/db');		
// const filmesRoutes = require('./routes/filmesRoutes');		
const listasRoutes = require('./routes/listasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Para parsear o corpo das requisições como JSON


// Conexão com o MongoDB (caso esteja utilizando o MongoDB)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB!');
}).catch(err => {
  console.log('Erro ao conectar ao MongoDB:', err);
});

// Rotas
// app.use('/', filmesRoutes);	
app.use('/api', listasRoutes);  // Prefixo /api para todas as rotas definidas em listasRoutes
app.use('/login', usuariosRoutes);
app.use('/comments', commentsRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

