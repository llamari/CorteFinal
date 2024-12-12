// src/Listas.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

function Listas() {
    const [listas, setListas] = useState([]);
    const [nomeLista, setNomeLista] = useState('');  // Para controlar o input do nome da lista
    const [filmes, setFilmes] = useState([]); // Para armazenar os filmes do backend

    // Função para buscar as listas do backend
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

    const criarLista = async (nome) => {
        try {
            const response = await axios.post('http://localhost:5000/api/listas', { nome: nome });
            console.log('Lista criada:', response.data);
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
        <div>
            <form onSubmit={(e) => { criarLista(nomeLista); }} id="formulario">
                <input 
                    type="text" 
                    placeholder="Nome da lista" 
                    value={nomeLista} 
                    onChange={nome}
                    id="Nome" 
                />
                <button type="submit" id="adiciona">Adicionar</button>
            </form>

            <h2>Listas:</h2>
            <ul id="ul">
                {listas.map((lista) => (
                    <li key={lista._id} className="List">
                        <div className="infoo">
                            <h2>{lista.titulo}</h2>
                            <FaTrashAlt onClick={() => deletaLista(lista._id)} className="lixo"/>    
                        </div>
                        
                        {/* Chama a função fetchFilmes para pegar os filmes com base nos IDs */}
                        <ul>
                            {lista.filmes.map((filmeId) => {
                                const filme = filmes.find((f) => f._id === filmeId);
                                return (
                                    filme ? (
                                        <Link to={`/filmes/${filme._id}`} key={filme._id} className='ir'>
                                            <li className='film'>
                                                <h3 id='titulo'>{filme.titulo}</h3>
                                                <div className="infoo">
                                                    <p id='nota'><b>{filme.nota}/10</b></p>

                                                    <div>
                                                        {filme.fav ? (
                                                            <FaHeart color="red" />
                                                        ) : (
                                                            <FaHeart color="grey" />
                                                        )}
                                                       <FaTrashAlt onClick={(event) => { lixinho(event); deletaFilme(lista._id, filme._id); }} />
                                                </div>
                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <li key={filmeId}>Filme não encontrado</li>
                                    )
                                );
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Listas;
