import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/login/login", {
                email: email,
                senha: senha,
            });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/home";
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message); // Exibe a mensagem do backend
            } else {
                console.error("Erro: ", error);
            }
        }
    };

    const [nome, setNome] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newSenha, setNewSenha] = useState("");

    const cadastro = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login/cadastro', {
                nome: nome,
                email: newEmail,
                senha: newSenha
            })
            console.log('Usuário criado: ', response.data);
            setNome(' ');
            setNewEmail(' ');
            setNewSenha(' ');
        } catch (error) {
            console.error('Erro ao cadastrar: ', error);
        }
    }

    return (
        <StyledWrapper>
            <div className="wrapper">
                <div className="card-switch">
                    <label className="switch">
                        <input className="toggle" type="checkbox" />
                        <span className="slider" />
                        <span className="card-side" />
                        <div className="flip-card__inner">
                            <div className="flip-card__front">
                                <div className="title">Login</div>
                                <form action className="flip-card__form" onSubmit={handleSubmit}>
                                    <input type="email" placeholder="E-mail" name="email" className="flip-card__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="password" placeholder="Senha" name="password" className="flip-card__input" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                    <button className="flip-card__btn" type='submit'>Entrar!</button>
                                </form>
                            </div>
                            <div className="flip-card__back">
                                <div className="title">Cadastro</div>
                                <form action className="flip-card__form" onSubmit={(e) => cadastro()}>
                                    <input type="name" placeholder="Nome" className="flip-card__input" value={nome} onChange={(e) => setNome(e.target.value)} />
                                    <input type="email" placeholder="E-mail" name="email" className="flip-card__input" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                    <input type="password" placeholder="Senha" name="password" className="flip-card__input" value={newSenha} onChange={(e) => setNewSenha(e.target.value)} />
                                    <button className="flip-card__btn" type='submit'>Cadastrar!</button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .wrapper {
  z-index: 3;
  margin-top: 4rem;
    --input-focus: #0f0930;
    --font-color: #e7e5f3;
    --font-color-sub: #7e7e7e;
    --bg-color: #0f0930;
    --bg-color-alt: #7e7e7e;
    --main-color: #c8c6d5;
      /* display: flex; */
      /* flex-direction: column; */
      /* align-items: center; */
  }
  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Login';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Cadastro';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */ 

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
      /* width: 100%;
      height: 100%; */
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: var(--bg-color);
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 100;
    text-align: center;
    color: var(--font-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active, .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }`;

export default SignIn;
