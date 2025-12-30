import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Popup from "../../Componentes/popup";
import { FaStar } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Loader from "../../Componentes/loader";
import Coment from "../../Componentes/coment";
import Rating from "@mui/material/Rating";
import { MdOutlineStar } from "react-icons/md";

function Movie() {
  const { id } = useParams(); // Obtém o id da URL
  const token = localStorage.getItem('token');
  const [filme, setFilme] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

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

  const getComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/comments/${id}`, {
        comment: newComment,
        rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        setNewComment('');
        setRating(0);
        getComments(); // Recarrega os comentários após adicionar um novo
      }
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    }
  };

  useEffect(() => {
    fetchFilme();
    getComments();
  }, []);

  return (
    <div className="movie-container">
      {(filme && filme !== null) ?
        <div>
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
              <Popup />
            </div>
          </div>

          <div>
            <div className='new-comment'>
              <p className="new-comment-title">Deixe seu feedback:</p>
              <textarea
                className='comment-input'
                placeholder="Insira aqui seu comentário sobre esse filme!"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              <div className="new-comment-footer">
                <Rating
                  name="rating-controlled"
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  precision={0.5}
                  emptyIcon={<MdOutlineStar style={{ color: "rgb(74, 67, 117)", opacity: "0.55" }} />}
                />

                <button className='comment-button' onClick={(e) => createComment(e)}>Publicar</button>
              </div>

            </div>

            {comments.length > 0 &&
              comments.map((comment, index) => (
                <Coment
                  key={index}
                  index={index}
                  author={comment.author}
                  coment={comment.comment}
                  rating={comment.rating}
                  likes={comment.likes}
                  id={comment._id}
                />
              ))}
          </div>
        </div>

        :

        <Loader />
      }
    </div>
  );
}

export default Movie;