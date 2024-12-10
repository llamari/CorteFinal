import React, { useState } from "react";
import './style.css';
import Sidebar from "../sidebar";
import { Link } from "react-router-dom";

function Header() {
    const [largura, setLargura] = useState("0");

    function abrir() {
        setLargura("230px"); 
    }

    return (
        <header>
            <Link to={"/"}>
                <img src="/assets/logo.png" alt="Logo" />
            </Link>
            {/* Clique na imagem do menu chama a função abrir */}
            <h1>CorteFinal</h1>
            <img
                src="/assets/menu.png"
                id="menu"
                alt="Menu"
                onClick={abrir}// Opcional: adiciona um cursor de "mãozinha"
            />
            <Sidebar largura={largura} setLargura={setLargura}/>
        </header>
    );
}

export default Header;
