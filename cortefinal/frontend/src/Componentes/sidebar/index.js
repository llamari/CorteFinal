import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './style.css';

function Sidebar({largura, setLargura, user}) {
    
    function fechar(){
        setLargura("0px");
    }

    return(
        <aside
            id="barra-lateral"
            style={{
                width: largura,
                height: "100%",
                backgroundColor: "#111",
                position: "fixed",
                top: 0,
                right: 0,
                transition: "0.6s",
                overflowX: "hidden",
                color: "white",
                zIndex: 10,
        }}>
            <img 
                src="/assets/menu.png" 
                onClick={fechar} 
                className="menu"
                style={{cursor: "pointer", margin: "10px"}}/> <br/>
            <Link className="link" to={`/${user}/home`} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}} id="home" onClick={fechar}>Home</Link> <br/>
            <Link className="link" to={`/${user}/favoritos`} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}} onClick={fechar}>Favoritos</Link><br/>
            <Link className="link" to={`/${user}/listas`} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}} onClick={fechar}>Minhas Listas</Link><br/>
        </aside>
    )
}

export default Sidebar;