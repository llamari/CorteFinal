// controllers/listasController.js
const Listas = require('../models/lista'); // Certifique-se de que o nome do modelo é 'Lista'
const Filmes = require('../models/filme');

// Função para pegar todas as listas
const getListas = async (req, res) => {
  try {
    const listas = await Listas.find();
    res.json(listas);
  } catch (error) {
    console.error('Erro ao buscar listas:', error);
    res.status(500).json({ error: 'Erro ao buscar listas' });
  }
};

// Função para criar uma nova lista
const criaLista = async (req, res) => {
    const { nome } = req.body;  // Pega o nome da lista a partir do corpo da requisição
  
    if (!nome) {
      return res.status(400).json({ error: 'O nome da lista é obrigatório' });
    }
  
    try {
      // Criação de uma nova lista
      const novaLista = new Listas({
        titulo: nome,  // Usando o nome da lista
        filmes: [],  // A lista começa sem filmes
      });
  
      // Salva a lista no banco de dados
      await novaLista.save();
  
      // Retorna a nova lista criada
      res.status(201).json(novaLista);
      console.log('Lista salva');
    } catch (error) {
      console.error('Erro ao criar a lista:', error);
      res.status(500).json({ error: 'Erro ao criar a lista', details: error.message });
    }
  };

// Função para adicionar um filme à lista
const addFilmeToLista = async (req, res) => {
  try {
    const { id } = req.params;
    const { filmeId } = req.body;

    const lista = await Listas.findById(id);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }

    const filme = await Filmes.findById(filmeId);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    // Adicionar o filme à lista, se não estiver já na lista
    if (!lista.filmes.includes(filmeId)) {
      lista.filmes.push(filmeId);
      await lista.save();
    }

    res.json(lista);
  } catch (error) {
    console.error('Erro ao adicionar filme na lista:', error);
    res.status(500).json({ error: 'Erro ao adicionar filme na lista' });
  }
};

// Função para deletar uma lista
const deleteLista = async (req, res) => {
  const { id } = req.params;

  try {
    const lista = await Listas.findByIdAndDelete(id);
    if (!lista) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }

    res.json({ message: 'Lista deletada' });
  } catch (error) {
    console.error('Erro ao deletar lista:', error);
    res.status(500).json({ message: 'Erro ao deletar a lista', details: error.message });
  }
};

// Função para deletar um filme da lista
const deleteFilmeFromLista = async (req, res) => {
  const { id, filmeId } = req.params;

  try {
    const lista = await Listas.findById(id);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }

    // Filtra o filme a ser removido da lista
    lista.filmes = lista.filmes.filter(filme => filme.toString() !== filmeId);

    await lista.save();
    res.json({ message: 'Filme deletado da lista.' });
  } catch (error) {
    console.error('Erro ao deletar o filme:', error);
    res.status(500).json({ message: 'Erro ao deletar o filme' });
  }
};

module.exports = { getListas, criaLista, addFilmeToLista, deleteLista, deleteFilmeFromLista };
