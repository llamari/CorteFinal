const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();  // Apenas uma instância do express

// Middleware
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => console.error(err));

// Modelo de Filme
const FilmeSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  capa: String,
  descricao: String,
  nota: Number,
  fav: Boolean,
}, { collection: 'Filmes' }); // Nome exato da coleção

const Filmes = mongoose.model('Filme', FilmeSchema);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rota para buscar filmes
app.get('/api/filmes', async (req, res) => {
  const filmes = await Filmes.find();
  res.json(filmes);
});

// Rota para alterar o status de favorito
app.patch('/api/filmes/:id/fav', async (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  // Verificar se o ID é um número válido
  if (isNaN(numericId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Buscar o filme pelo ID
    const movie = await Filmes.findById(numericId);

    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    // Alternar o valor de "fav"
    movie.fav = !movie.fav;
    await movie.save();

    res.json({ message: movie.fav ? "Favoritado" : "Desfavoritado", movie });
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Modelo de Lista
const ListaSchema = new mongoose.Schema({
  titulo: String,
  filmes: [Number],
}, { collection: 'Listas' }); // MongoDB gerenciará o _id automaticamente

const Listas = mongoose.model('Lista', ListaSchema);

// Rota para buscar listas
app.get('/api/listas', async (req, res) => {
  try {
    const listas = await Listas.find(); // Correção aqui: use Listas.find()
    res.json(listas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar listas' });
  }
});

// Rota para criar lista
// Rota para criar lista
app.post('/api/listas', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O nome da lista é obrigatório' });
    }

    const novaLista = new Listas({ titulo: nome, filmes: [] });
    await novaLista.save(); // Chamada save única

    res.status(201).json({
      id: novaLista._id, // Incluindo o id gerado automaticamente pelo MongoDB
      nome: novaLista.titulo,
      filmes: novaLista.filmes,
    });
  } catch (error) {
    console.error('Erro ao criar a lista:', error); // Exibir erro completo
    res.status(500).json({ error: 'Erro ao criar a lista', details: error.message });
  }
});


// Rota para adicionar filme a lista
app.patch('/api/listas/:id/adicionar', async (req, res) => {
  try {
    const { id } = req.params;
    const { filmeId } = req.body;
    
    console.log(`Adicionando filme ${filmeId} à lista ${id}`); // Log para depurar
    
    const lista = await Listas.findById(id);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }

    const filme = await Filmes.findById(filmeId);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    if (!lista.filmes.includes(filmeId)) {
      lista.filmes.push(filmeId);
      await lista.save();
    }

    res.json(lista);
  } catch (error) {
    console.error('Erro ao adicionar filme na lista:', error.message);
    res.status(500).json({ error: 'Erro ao adicionar filme na lista', details: error.message });
  }
});


// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
