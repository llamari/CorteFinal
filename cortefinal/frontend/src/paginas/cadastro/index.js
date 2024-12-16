import React, { useState } from "react";
import axios from "axios";
import './style.css';
import { Link } from "react-router-dom";

function Cadastro() {
  const [nome, setnome] = useState("");
  const [email, setemail] = useState("");
  const [senha, setsenha] = useState("");

  function update(e, muda) {
    muda(e.target.value);
  }

  const cadastro = async (nome, email, senha) => {
    try {
        const response = await axios.post('http://localhost:5000/login/cadastro', { 
            nome: nome ,
            email: email,
            senha: senha
        })
        console.log('Usuário criado: ', response.data);
        setnome(' ');
        setemail(' ');
        setsenha(' ');
        window.location.href('/login');        
    } catch (error) {
        console.error('Erro ao cadastrar: ', error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => {cadastro(nome, email, senha)}} id="Logar">
        <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => update(e, setnome)} id="nome"/>
        <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => update(e, setemail)} id="email"/>
        <input type="password" placeholder="Sua senha" value={senha} onChange={(e) => update(e, setsenha)} id="senha"/>
        <input type="submit" value="Enviar" id="enviar"/>
        <Link to={'/'} id="informações">Já tem uma conta? Faça login</Link>
      </form>
    </div>
  );
}

export default Cadastro;
