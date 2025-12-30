import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const TYPE = {
  movie: 'Filme',
  series: 'Série',
  episode: 'Episódio'
}

function Home() {
  const endRef = useRef(null);
  const [filmes, setFilmes] = useState([]); // Estado para armazenar os filmes
  const [page, setPage] = useState(1); // Estado para controlar a página atual
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca

  const loadMore = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm || 'batman'}&apikey=c183224d&type=movie&page=${page}`);
      if (response.data.Response === "True" && response.data.Search && Array.isArray(response.data.Search)) {
        setFilmes(prevFilmes => [...prevFilmes, ...response.data.Search]);
        setPage(prevPage => prevPage + 1); // Incrementa a página para a próxima busca
      }
    } catch (error) {
      console.error('Erro ao buscar mais filmes:', error);
    }
  };

  const fetchFilmes = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=c183224d&type=movie&page=${page}`); // Endpoint do backend
      if (response.data.Response === "True" && response.data.Search && Array.isArray(response.data.Search)) {
        setFilmes(response.data.Search);
        setPage(prevPage => prevPage + 1); // Incrementa a página para a próxima busca
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length > 3) {
        try {
          const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=c183224d&type=movie&page=1`);
          if (response.data.Response === "True" && response.data.Search && Array.isArray(response.data.Search)) {
            setFilmes(response.data.Search);
          } else {
            setFilmes([]);
          }
        } catch (error) {
          console.error('Erro ao buscar resultados da pesquisa:', error);
        }
      } else if (searchTerm.length === 0) {
        setPage(1);
        fetchFilmes();
      }
    };

    fetchSearchResults();
  }, [searchTerm])

  return (
    <div className='home-bg'>
      <div id='search-bar'>
        <input type="text" placeholder='Pesquisar filmes' id='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <IoSearch id='search-icon' />
      </div>
      {(searchTerm.length < 3 && searchTerm.length > 0)
        ?
        <p id='msg'>Digite ao menos 3 caracteres para buscar filmes.</p>
        :
        filmes.length > 0 ? (
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
        )
          :
          <p>Nenhum filme encontrado</p>
      }

    </div>
  );
}

export default Home;
