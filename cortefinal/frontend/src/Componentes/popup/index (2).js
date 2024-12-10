import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Função para adicionar filme à lista
const add = async (idLista, idFilme) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/listas/${idLista}/adicionar`, {
            filmeId: idFilme,
        });
        console.log('Filme adicionado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao adicionar filme:', error.response ? error.response.data : error.message);
    }
};

const Popup = () => {
    const { id } = useParams();  // ID do filme
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [listas, setListas] = useState([]);

    // Função para buscar as listas
    const fetchListas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/listas');
            setListas(response.data);    
        } catch (error) {
            console.log('Erro ao carregar listas:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchListas();  // Carrega as listas quando o componente for montado
    }, []);

    return (
        <div>
            <button onClick={() => setIsPopupOpen(!isPopupOpen)}>Adicionar a uma lista</button>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <ul>
                            {listas.map((lista) => (
                                <button key={lista._id} onClick={() => add(lista._id, id)}>{lista.titulo}</button>
                            ))}
                        </ul>
                        <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
