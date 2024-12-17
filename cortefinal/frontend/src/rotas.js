import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Header from "./Componentes/header/header.js";
import Home from "./paginas/home/index";
import Movie from "./paginas/movies/index.js";
import Favs from "./paginas/favs/index.js";
import Footer from "./Componentes/footer/index";
import Listas from "./paginas/listas/index.js";
import Cadastro from "./paginas/cadastro/index.js";
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
                <Route path="/:user/home" element={<Home />} />
                <Route path="/:user/filmes/:id" element={<Movie />} />
                <Route path="/:user/favoritos" element={<Favs />} />
                <Route path="/:user/listas" element={<Listas />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Login />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Rotas;
