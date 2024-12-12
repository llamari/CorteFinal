import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

function Favs() {
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes

  // Função para buscar filmes do backend
  const fetchFilmes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filmes'); // Endpoint do backend
      setFilmes(response.data); // Atualiza o estado com os filmes retornados
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  // Busca os filmes quando o componente for montado
  useEffect(() => {
    fetchFilmes();
  }, []);

  return (
    <div>
      <ul>
        {filmes
        .filter (filme => filme.fav == true)
        .map((filme) => (
          <Link to={`/filmes/${filme._id}`} key={filme._id} className='ir'>
            <li className='film'>
              <h3 id='titulo'>{filme.titulo}</h3>
              <img src={filme.capa} alt={filme.titulo} width="100" id='capa' />
              <p id='descrição'>{filme.descricao}</p>
              <p id='nota'><b>{filme.nota}/10</b></p>
              </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Favs;