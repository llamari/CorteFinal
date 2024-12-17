import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Favs() {
  const { user } = useParams();
  const [filmes, setFilmes] = useState([]);
  const [listas, setListas] = useState([]);

  // Função para buscar filmes do backend
  const fetchListas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listas'); // Endpoint do backend
      setListas(response.data); // Atualiza o estado com as listas retornadas
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
    }
  };

  // Função para buscar filmes do backend
  const fetchFilmes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filmes'); // Endpoint de filmes
      setFilmes(response.data); // Atualiza o estado com os filmes retornados
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
    fetchListas();
    fetchFilmes();
  }, []);

  return (
    <div>
      <ul>
        {listas
          .filter(lista => lista._id === '67607a7e9a92c2b898ab1e42')
          .map((lista) => (
            lista.filmes.map((filmeId) => {
              const filme = filmes.find((f) => f._id === filmeId);
              return filme ? (
                <Link to={`/${user}/filmes/${filme._id}`} key={filme._id} className='ir'>
                  <li className='film'>
                    <h3 id='titulo'>{filme.titulo}</h3>
                    <img src={filme.capa} alt={filme.titulo} width="100" id='capa' />
                    <p id='descrição'>{filme.descricao}</p>
                    <p id='nota'><b>{filme.nota}/10</b></p>
                  </li>
                </Link>
              ) : (
                <li key={filmeId}>Filme não encontrado</li>
              );
            })
          ))}
      </ul>
    </div>
  );
}

export default Favs;