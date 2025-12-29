import React, { useState } from 'react';
import styled from 'styled-components';
import { FaX } from "react-icons/fa6";

const NewList = ({ createNewList, closePopUp }) => {
    const [newListName, setNewListName] = useState('');
    return (
        <StyledWrapper>
            <form className="form">
                <div className='close-form'>
                    <FaX onClick={closePopUp} color='white'/>
                </div>
                <span className="title">Crie uma nova lista</span>
                <p className="description">Insira o nome da sua lista e clique no botão para cria-la! Depois, ela estará disponível para você adicionar seus filmes e organizá-los.</p>
                <div>
                    <input placeholder="Nome da lista" type="text" name="listName" id="list-name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
                    <button type="submit" onClick={() => createNewList(newListName)}>Criar</button>
                </div>
            </form>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    background: rgb(15, 9, 48);
    padding: 5px 20px 20px;
    border-radius: 10px;
    max-width: 350px;
  }

  .close-form {
    width: 100%;
    text-align: right;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .title {
    font-size: 2rem;
    color: rgb(231, 229, 243);
  }

  .description {
    line-height: 1.5rem;
    font-size: 1rem;
    margin-top: 1rem;
    color: rgb(200, 198, 213);
  }

  .form div {
    display: flex;
    max-width: 28rem;
    margin-top: 1rem;
    column-gap: 0.5rem;
  }

  .form div input {
    outline: none;
    line-height: 1.5rem;
    font-size: 0.875rem;
    color: rgb(255 255 255 );
    padding: 0.5rem 0.875rem;
    background-color: rgb(255 255 255 / 0.05);
    border: 1px solid rgb(200, 198, 213);
    border-radius: 0.375rem;
    flex: 1 1 auto;
  }

  .form div input::placeholder {
    color: rgb(200, 198, 213);
  }

  .form div input:focus {
    border: 1px solid rgb(231, 229, 243);
  }

  .form div button {
    color: rgb(231, 229, 243);
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.625rem 0.875rem;
    background-color: rgb(74, 67, 117);
    border-radius: 0.375rem;
    border: none;
    outline: none;
  }`;

export default NewList;
