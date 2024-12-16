// controllers/filmesController.js
const Filmes = require('../models/filme');

const getFilmes = async (req, res) => {
  try {
    const filmes = await Filmes.find();
    res.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ message: 'Erro ao buscar filmes' });
  }
};

const updateFavorito = async (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const filme = await Filmes.findById(numericId);

    if (!filme) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    filme.fav = !filme.fav;
    await filme.save();

    res.json({ message: filme.fav ? "Favoritado" : "Desfavoritado", filme });
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { getFilmes, updateFavorito };