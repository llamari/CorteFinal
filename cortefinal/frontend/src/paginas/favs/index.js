import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Favs() {
  const { user } = useParams();
  const [filmes, setFilmes] = useState([]);

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
    fetchFilmes();
  }, []);

  return (
    <div>
      <ul>
        {filmes
          .filter(filmes => filmes.fav == true)
          .map((filme) => (
          <Link to={`/${user}/filmes/${filme._id}`} key={filme._id} className='ir'>
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