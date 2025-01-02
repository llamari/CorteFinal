import React, { useState } from "react";
import './style.css';
import Sidebar from "../sidebar";
import { Link } from "react-router-dom";

function Header({ user }) {
    const [largura, setLargura] = useState("0");

    function abrir() {
        setLargura("230px");
    }

    return (
        <header>
                <Link to={`/${user}/home`}>
                    <img src="/assets/logo.png" alt="Logo" />
                </Link>

                <h1>CorteFinal</h1>

                <img
                    src="/assets/menu.png"
                    id="menu"
                    alt="Menu"
                    onClick={abrir}
                />

            <Sidebar largura={largura} setLargura={setLargura} user={user}/>
        </header>
    );
}

export default Header;
