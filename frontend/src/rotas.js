import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Header from "./Componentes/header/header.js";
import Home from "./paginas/home/index";
import Movie from "./paginas/movies/index.js";
import Footer from "./Componentes/footer/index";
import Listas from "./paginas/listas/index.js";
import Login from "./paginas/login/index.js";

// Wrapper para capturar os parâmetros da rota
function HeaderWrapper() {
    const { user } = useParams();
    return <Header user={user} />;
}

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:user/*" element={<HeaderWrapper />} />
            </Routes>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/filmes/:id" element={<Movie />} />
                <Route path="/listas" element={<Listas />} />
                <Route path="/" element={<Login />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Rotas;
