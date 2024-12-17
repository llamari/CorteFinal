import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Popup from "../../Componentes/popup/index (2)";

const fav = async (id, filmes, setFilmes) => {
  try {
    // Garante que o ID seja enviado como número
    const numericId = parseInt(id);

    // Atualiza o atributo 'fav' no backend
    await axios.patch(`http://localhost:5000/api/67607a7e9a92c2b898ab1e42/adicionar`, {
      filmeId: id
    });

    // Atualiza o estado local para refletir a mudança
    const updatedFilmes = filmes.map(filme => 
      filme._id === numericId ? { ...filme, fav: !filme.fav } : filme
    );
    await axios.patch(`http://localhost:5000/${id}/fav`);

    setFilmes(updatedFilmes); // Atualiza o estado com a nova lista de filmes
    console.log('Filme marcado como favorito');
  } catch (error) {
    console.error('Erro ao marcar como favorito:', error.message);
  }
};

const unfav = async (id, filmes, setFilmes) => {
  try {
    // Garante que o ID seja enviado como número
    const numericId = parseInt(id);

    // Remover o filme da lista de favoritos
    const response = await axios.delete(`http://localhost:5000/api/67607a7e9a92c2b898ab1e42/deletar/filme/${id}`);
    console.log('Filme deletado: ', response.data);

    // Atualiza o estado local para refletir a mudança
    const updatedFilmes = filmes.map(filme => 
      filme._id === numericId ? { ...filme, fav: !filme.fav } : filme
    );
    await axios.patch(`http://localhost:5000/${id}/fav`);

    setFilmes(updatedFilmes); // Atualiza o estado com a nova lista de filmes
    console.log('Filme desmarcado como favorito');
  } catch (error) {
    console.error('Erro ao remover como favorito:', error.message);
  }
};


function Movie() {
  const { id } = useParams(); // Obtém o id da URL
  const [filmes, setFilmes] = useState([]);
  const [listas, setListas] = useState([])

  // Função para buscar filmes
  const fetchFilmes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filmes');
      setFilmes(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const ChamaListas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listas')
      setListas(response.data);
    } catch (error) {
      console.error("Erro ao chamar listas: ", error);
    }
  }

  useEffect(() => {
    fetchFilmes();
    ChamaListas();
  }, []);

  return (
    <div>
      {filmes
        .filter(filme => filme._id === parseInt(id)) // Compara id convertendo para número
        .map(filme => (
          <div className='info' key={filme.id}>
            <img src={filme.capa} alt={filme.titulo} width="70%" id='cape' />
            <h1 id='title'>{filme.titulo}</h1>
            <p id='sinopse'>{filme.descricao}</p>
            <p id='note'><b>{filme.nota}/10</b></p>
            <div className="display">
              {filme.fav ? 
                <div>
                  <button onClick={() => fav(filme._id, listas, setListas)} className="favorito">Favorito</button>
                </div>
                : 
                <div>
                  <button onClick={() => unfav(filme._id, filmes, setFilmes)} className="favoritar">Favoritar</button>
                </div>
              }
              <Popup/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Movie;