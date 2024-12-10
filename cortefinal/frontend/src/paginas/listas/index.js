import axios from "axios";
import React, { useState, useEffect } from "react";
import './style.css';
import { Link } from "react-router-dom";

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
        const response = await axios.get('http://localhost:5000/api/filmes'); // Endpoint de filmes
        setFilmes(response.data); // Atualiza o estado com os filmes retornados
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };
  
    // Busca os filmes quando o componente for montado
    useEffect(() => {
        fetchListas();
        fetchFilmes();
    }, []);

    const criarLista = async (nome) => {
        try {
            // Use o parâmetro 'nome' ao invés de 'nomeLista'
            const response = await axios.post('http://localhost:5000/api/listas', { nome: nome });
            console.log('Lista criada:', response.data);
            setNomeLista('');  // Limpa o input após adicionar
        } catch (error) {
            console.error('Erro ao criar a lista:', error.message);
        }
    };
      
    // Função para atualizar o nome da lista enquanto o usuário digita
    const nome = (e) => {
        setNomeLista(e.target.value);
    };

    return (
        <div>
                <form onSubmit={(e) => { e.preventDefault(); criarLista(nomeLista); }}>
                    <input 
                    type="text" 
                    placeholder="Nome da lista" 
                    value={nomeLista} 
                    onChange={nome} 
                />
                <button type="submit">Adicionar</button>
            </form>

            <h2>Listas:</h2>
            <ul id="ul">
                {listas.map((lista) => (
                    <li key={lista._id} className="List">
                        <h2>{lista.titulo}</h2>
                        {/* Chama a função fetchFilmes para pegar os filmes com base nos IDs */}
                        <ul>
                            {lista.filmes.map((filmeId) => {
                                // Filtra os filmes para encontrar os que possuem esse id
                                const filme = filmes.find((f) => f._id === filmeId);
                                return (
                                    filme ? (
                                        <Link to={`/filmes/${filme._id}`} key={filme._id} className='ir'>
                                            <li className='film'>
                                                <h3 id='titulo'>{filme.titulo}</h3>
                                                <p id='nota'><b>{filme.nota}/10</b></p>
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
