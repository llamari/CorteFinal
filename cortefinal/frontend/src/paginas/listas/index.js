// src/Listas.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../../Componentes/button";

function Listas() {
    const token = localStorage.getItem('token');
    const [listas, setListas] = useState([]);
    const [nomeLista, setNomeLista] = useState('');  // Para controlar o input do nome da lista

    // Função para buscar as listas do backend
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

    useEffect(() => {
        fetchListas();
    }, []);

    const criarLista = async (nome) => {
        try {
            const response = await axios.post('http://localhost:5000/api/listas', { nome: nome }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Lista criada:', response);
            setNomeLista('');
        } catch (error) {
            console.error('Erro ao criar a lista:', error.message);
        }
    };

    const nome = (e) => {
        setNomeLista(e.target.value);
    };

    const deletaLista = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/${id}/deletar`);
            console.log('Lista deletada: ', response.data);
            window.location.reload(false);
        } catch (error) {
            console.log("Erro ao deletar lista:", error);
        }
    }

    const deletaFilme = async (idLista, idFilme) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/${idLista}/deletar/filme/${idFilme}`);
            console.log('Filme deletado: ', response.data);
            window.location.reload(false);
        } catch (error) {
            console.log("Erro ao deletar filme:", error);
        }
    }

    const lixinho = (event) => {
        event.stopPropagation(); // Impede que o clique no ícone da lixeira seja propagado para o Link
    };

    return (
        <div id="lists-page">
            <div id="page-header">
                <h1 id="lists-title">Suas Listas:</h1>

                <Button />
            </div>
            <form onSubmit={(e) => { criarLista(nomeLista); }} id="formulario">
                <input
                    type="text"
                    placeholder="Nome da lista"
                    value={nomeLista}
                    onChange={nome}
                    name="nomelista"
                    id="Nome"
                />
                <button type="submit" id="adiciona">Adicionar</button>
            </form>

            <div id="all-lists">
                {listas.map((lista) => (
                    <div key={lista._id} className="List">
                        <div className="infoo">
                            <h2>{lista.titulo}</h2>
                            <FaTrashAlt onClick={() => deletaLista(lista._id)} className="lixo" />
                        </div>

                        {/* Chama a função fetchFilmes para pegar os filmes com base nos IDs */}
                        <div>
                            {lista.filmes.map((filme) => {
                                if (!filme) {
                                    return <div>Filme não encontrado</div>;
                                }

                                return (
                                    <Link to={`/filmes/${filme.id}`} key={filme.id} className='ir'>
                                        <div className='movie-card' style={{
                                            backgroundImage: `
                                            linear-gradient(
                                                rgba(15, 9, 48, 0.85),
                                                rgba(15, 9, 48, 0.85)
                                            ),
                                            url(${filme.poster})
                                            `, backgroundSize: 'cover', backgroundPosition: 'center'
                                        }}>
                                            <img src={filme.poster} alt={filme.title} className='poster' />
                                            <div className="title-div">
                                                <h3 className="title">{filme.title}</h3>
                                            </div>
                                            <div className="movie-trash-div">
                                                <FaTrashAlt onClick={(e) => { lixinho(e); deletaFilme(lista._id, filme.id); }} className="movie-trash" />
                                            </div>
                                        </div>
                                    </Link>

                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listas;
