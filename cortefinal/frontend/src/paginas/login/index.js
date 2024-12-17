import React, { useState } from "react";
import axios from "axios";
import './style.css';
import { Link } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [senha, setsenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login/login", {
        email: email,
        senha: senha,
      });

      if (response.data.success) {
        const ide = response.data.id;
        console.log("Seu id é: ", ide);
        window.location.href = `/${ide}/home`;
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Exibe a mensagem do backend
      } else {
        console.error("Erro: ", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="Logar">
        <h1 id="title">Login</h1>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          id="email"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setsenha(e.target.value)}
          id="senha"
        />
        <input type="submit" value="Entrar" id="enviar"/>
        <Link to={'/cadastro'} id="informações">Não tem login? Faça cadastro</Link>
      </form>
    </div>
  );
}

export default Login;
