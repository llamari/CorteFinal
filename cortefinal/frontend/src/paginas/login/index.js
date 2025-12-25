import React, { useState } from "react";
import axios from "axios";
import './style.css';
import { Link } from "react-router-dom";
import SignIn from "../../Componentes/signin";
import Pattern from "../../Componentes/pattern";

function Login() {

  return (
    <div id="signin-container">
      <div id="login-header">
        <Link to={`/home`}>
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
        <h1 id="header-title">CorteFinal</h1>
      </div>
      <SignIn />
      <Pattern />
    </div>
  );
}

export default Login;
