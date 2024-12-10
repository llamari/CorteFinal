import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const fav = async (id, filmes, setFilmes) => {
  try {
    // Atualiza o atributo 'fav' no backend
    await axios.patch(`http://localhost:5000/filmes/${id}/fav`);

    // Atualiza o estado local para refletir a mudança
    const updatedFilmes = filmes.map(filme => 
      filme.id === id ? { ...filme, fav: true } : filme
    );
    setFilmes(updatedFilmes); // Atualiza o estado com a nova lista de filmes
    console.log('Filme marcado como favorito');
  } catch (error) {
    console.error('Erro ao marcar como favorito:', error);
  }
};

const unfav = async (id, filmes, setFilmes) => {
  try {
    // Atualiza o atributo 'fav' no backend
    await axios.patch(`http://localhost:5000/filmes/${id}/fav`);

    // Atualiza o estado local para refletir a mudança
    const updatedFilmes = filmes.map(filme => 
      filme.id === id ? { ...filme, fav: false } : filme
    );
    setFilmes(updatedFilmes); // Atualiza o estado com a nova lista de filmes
    console.log('Filme desmarcado como favorito');
  } catch (error) {
    console.error('Erro ao desfavoritar:', error);
  }
};

function Movie() {
  const { id } = useParams(); // Obtém o id da URL
  const [filmes, setFilmes] = useState([]);

  // Função para buscar filmes
  const fetchFilmes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filmes');
      setFilmes(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
    fetchFilmes();
  }, []);

  return (
    <div>
      {filmes
        .filter(filme => filme.id === parseInt(id)) // Compara id convertendo para número
        .map(filme => (
          <div className='info' key={filme.id}>
            <img src={filme.capa} alt={filme.titulo} width="70%" id='cape' />
            <h1 id='title'>{filme.titulo}</h1>
            <p id='sinopse'>{filme.descricao}</p>
            <p id='note'><b>{filme.nota}/10</b></p>
            {filme.fav ? 
              <div>
                <button onClick={() => unfav(filme.id, filmes, setFilmes)} className="favorito">Favorito</button>
              </div>
              : 
              <div>
                <button onClick={() => fav(filme.id, filmes, setFilmes)} className="favoritar">Favoritar</button>
              </div>
            }
          </div>
        ))}
    </div>
  );
}

export default Movie;