import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Popup from "../../Componentes/popup/index (2)";
import { FaStar } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Loader from "../../Componentes/loader";

const fav = async (id, filmes, setFilmes) => {
  try {
    // Garante que o ID seja enviado como número
    const numericId = parseInt(id);

    // Atualiza o estado local para refletir a mudança
    const updatedFilmes = filmes.map(filme =>
      filme._id === numericId ? { ...filme, fav: !filme.fav } : filme
    );
    await axios.patch(`http://localhost:5000/${id}/fav`);

    setFilmes(updatedFilmes); // Atualiza o estado com a nova lista de filmes
    window.location.reload();
    console.log('Filme marcado como favorito');
  } catch (error) {
    console.error('Erro ao marcar como favorito:', error.message);
  }
};

function Movie() {
  const { id } = useParams(); // Obtém o id da URL
  const [filme, setFilme] = useState(null);
  const [listas, setListas] = useState([])

  // Função para buscar filmes
  const fetchFilme = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=c183224d`);
      if (response.data.Response === "True") {
        setFilme(response.data);
      } else {
        setFilme(null);
      }
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
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
    fetchFilme();
    ChamaListas();
  }, []);

  return (
    <div className="movie-container">
      {(filme && filme !== null) ?
        <div className='info' key={filme.imdbID}>
          <img src={filme.Poster} alt={filme.Title} id='cape' />
          <div id="all-info">
            <div>
              <h1 id='title'>{filme.Title}</h1>
              <div className="subdetails">
                <p className='infodetails'>
                  <FaStar />
                  <b>{filme.imdbRating}/10</b>
                </p>

                <p className="infodetails">
                  <LuClock4 />
                  <b>{filme.Runtime}</b>
                </p>

                <p className="infodetails">
                  <IoCalendarNumberOutline />
                  <b>{filme.Year}</b>
                </p>
              </div>
            </div>

            <p className="details">{filme.Plot}</p>

            <div>
              <p className="details"><b>Direção: </b>{filme.Director}</p>

              <p className="details"><b>Roteiro: </b>{filme.Writer}</p>

              <p className="details"><b>Elenco: </b>{filme.Actors}</p>

              <p className="details"><b>Gênero: </b>{filme.Genre}</p>

              <p className="details"><b>País: </b>{filme.Country}</p>
            </div>
          </div>
          <div className="display">
            {/* {filme.fav ? 
                <div>
                  <button onClick={() => fav(filme._id, listas, setListas)} className="favorito">Favorito</button>
                </div>
                : 
                <div>
                  <button onClick={() => fav(filme._id, filmes, setFilmes)} className="favoritar">Favoritar</button>
                </div>
              } */}
            <Popup />
          </div>
        </div>

        :

        <Loader />
      }
    </div>
  );
}

export default Movie;