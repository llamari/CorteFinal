import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [filmes, setFilmes] = useState([]);

  // Buscar filmes do backend
  useEffect(() => {
    async function fetchFilmes() {
      const res = await axios.get('http://localhost:5000/api/filmes');
      setFilmes(res.data);
    }
    fetchFilmes();
  }, []);

  return (
    <div>
      <h1>Lista de Filmes</h1>
      <ul>
        {filmes.map((filme, index) => (
          <li key={index}>{filme.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
