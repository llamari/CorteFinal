import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './style.css';

function Sidebar({largura, setLargura}) {
    
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
            <Link className="link" to={"/"} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}} id="home">Home</Link> <br/>
            <Link className="link" to={"/favoritos"} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}}>Favoritos</Link><br/>
            <Link className="link" to={"/listas"} style={{textDecoration: "none", color: "#fff", margin: "10px", fontSize: "x-large", fontWeight: 500}}>Minhas Listas</Link><br/>
        </aside>
    )
}

export default Sidebar;