import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

const TYPE = {
  movie: 'Filme',
  series: 'Série',
  episode: 'Episódio'
}

function Home() {
  const endRef = useRef(null);
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes
  const [page, setPage] = useState(1); // Estado para controlar a página atual

  const loadMore = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=c183224d&type=movie&page=${page}`);
      if (response.data.Response) {
        setFilmes(prevFilmes => [...prevFilmes, ...response.data.Search]);
        setPage(prevPage => prevPage + 1); // Incrementa a página para a próxima busca
      }
    } catch (error) {
      console.error('Erro ao buscar mais filmes:', error);
    }
  };

  useEffect(() => {
    // Função para buscar filmes do backend
    const fetchFilmes = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=c183224d&type=movie&page=${page}`); // Endpoint do backend
        if (response.data.Response) {
          setFilmes(response.data.Search);
          setPage(prevPage => prevPage + 1); // Incrementa a página para a próxima busca
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchFilmes();
  }, []);

  useEffect(() => {


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (endRef.current) {
      observer.observe(endRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className='home-bg'>
      <div className='movie-list'>
        {filmes.map((filme) => (
          <Link to={`/filmes/${filme.imdbID}`} key={filme.imdbID} className='ir'>
            <div className='film'>
              <img src={filme.Poster} alt={filme.Title} id='capa' />
              <div className='all-info'>
                <p id='titulo'>{filme.Title}</p>
                <div className='info-film'>
                  <p id='year'>{filme.Year}</p>
                  <p id='type'>{TYPE[filme.Type]}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div ref={endRef} style={{ height: 1 }} />
      </div>
    </div>
  );
}

export default Home;
