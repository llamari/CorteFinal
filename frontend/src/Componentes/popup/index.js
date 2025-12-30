import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css';
import BatButton from '../BatButton';


const Popup = () => {
    const { id } = useParams();  // ID do filme
    const token = localStorage.getItem('token');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [listas, setListas] = useState([]);
    const [filmeData, setFilmeData] = useState({});

    const add = async (idLista, idFilme, titleFilme, posterFilme, setIsPopupOpen, isPopupOpen) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/${idLista}/adicionar`, {
                movieId: idFilme,
                movieTitle: titleFilme,
                moviePoster: posterFilme
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

            console.log('Filme adicionado com sucesso:', response.data);
            setIsPopupOpen(!isPopupOpen);
        } catch (error) {
            console.error('Erro ao adicionar filme:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=c183224d`);
                console.log('Dados do filme:', response.data);
                setFilmeData(response.data);
            } catch (error) {
                console.error('Erro ao buscar filme:', error.response ? error.response.data : error.message);
            }
        };

        // Função para buscar as listas
        const fetchListas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/listas', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }); // Endpoint do backend
                setListas(response.data); // Atualiza o estado com as listas retornadas
            } catch (error) {
                console.error('Erro ao buscar listas:', error);
            }
        };

        getMovie();
        fetchListas();
    }, []);

    return (
        <div>
            <div onClick={() => setIsPopupOpen(true)}>
                <BatButton />
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className='lists'>
                            {listas.map((lista) => (
                                <button key={lista._id} onClick={() => add(lista._id, id, filmeData.Title, filmeData.Poster, setIsPopupOpen, isPopupOpen)}>{lista.titulo}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
