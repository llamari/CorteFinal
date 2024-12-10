import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Componentes/header/header.js";
import Home from "./paginas/home/index";
import Movie from "./paginas/movies/index.js";
import Favs from "./paginas/favs/index.js";
import Footer from "./Componentes/footer/index";
import Listas from "./paginas/listas/index.js";

function Rotas(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filmes/:id" element={<Movie/>} />
                <Route path="/favoritos" element={<Favs/>}/>
                <Route path="/listas" element={<Listas/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Rotas;