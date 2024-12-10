import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./componentes/header/header";
import Home from "./paginas/home";
import Movie from "./paginas/movies";
import Favs from "./paginas/favs";
import Footer from "./componentes/footer";

function Rotas(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filmes/:id" element={<Movie/>} />
                <Route path="/favoritos" element={<Favs/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Rotas;