import React, { useState } from "react";
import './style.css';
import { Link } from "react-router-dom";
import { IoListOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

function Header() {

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    
    return (
        <header>
            <div id="logo">
                <Link to={`/home`}>
                    <img src="/assets/logo.png" alt="Logo" />
                </Link>
                <h1 id="header-title">CorteFinal</h1>
            </div>

            <div id="menu">
                <Link className="menu-item" to={`/listas`}>
                    <IoListOutline size={35} />
                    <p>Suas listas</p>
                </Link>

                <Link className="menu-item" onClick={logOut}>
                    <MdLogout size={30} />
                    <p>Sair</p>
                </Link>
            </div>
        </header>
    );
}

export default Header;
