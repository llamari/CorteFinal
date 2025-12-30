# CorteFinal

### Ferramentas
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Descrição

CorteFinal é um site com uma biblioteca de filmes onde você pode visualizar informações gerais sobre filmes, como nome, sinopse, nota no IMDb e capa. Além disso, permite criar listas personalizadas.

Este projeto foi desenvolvido com o objetivo de aprender e praticar React.js, Node.js e MongoDB através de cursos e videoaulas.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor
- **Express.js**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação baseada em tokens
- **bcrypt**: Hashing de senhas
- **CORS**: Middleware para permitir requisições cross-origin

### Frontend
- **React**: Biblioteca para construção de interfaces
- **React Router DOM**: Roteamento para aplicações React
- **Axios**: Cliente HTTP para requisições
- **Styled Components**: Biblioteca para estilização CSS-in-JS
- **React Icons**: Ícones para React

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/llamari/cortefinal.git
   cd cortefinal
   ```

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

3. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```
   
## Como Executar

1. Configure as variáveis de ambiente segundo o [arquivo de exemplo](./backend/.exemplo.env).
   
2. Inicie o backend:
   ```bash
   cd backend
   node index.js
   ```
   O servidor estará rodando em `http://localhost:5000` (ou a porta configurada).

3. Em outro terminal, inicie o frontend:
   ```bash
   cd frontend
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000`.

## Funcionalidades

- ✅ Visualizar lista de filmes com informações básicas
- ✅ Criar e gerenciar listas personalizadas de filmes
- ✅ Autenticação de usuários
- ✅ Criação de resenhas e avaliações
- ✅ Barra de pesquisa para filmes

## Estrutura do Projeto

```
cortefinal/
├── README.md
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   ├── cors.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── commentsController.js
│   │   ├── listasController.js
│   │   └── usuariosController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── jwtMiddleware.js
│   ├── models/
│   │   ├── comment.js
│   │   ├── lista.js
│   │   └── usuarios.js
│   ├── routes/
│   │   ├── commentsRoutes.js
│   │   ├── listasRoutes.js
│   │   └── usuariosRoutes.js
└── frontend/
    ├── package.json
    ├── README.md
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   ├── robots.txt
    │   └── assets/
    └── src/
        ├── App.js
        ├── index.css
        ├── index.js
        ├── rotas.js
        ├── assets/
        ├── Componentes/
        │   ├── BatButton/
        │   │   └── index.js
        │   ├── button/
        │   │   └── index.js
        │   ├── coment/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── footer/
        │   │   ├── index.js
        │   │   └── style.css
        │   ├── header/
        │   │   ├── header.js
        │   │   └── style.css
        │   ├── loader/
        │   │   └── index.js
        │   ├── newList/
        │   │   └── index.js
        │   ├── pattern/
        │   │   └── index.js
        │   ├── popup/
        │   │   ├── index.js
        │   │   └── style.css
        │   └── signin/
        │       └── index.js
        └── paginas/
            ├── home/
            │   ├── index.js
            │   └── style.css
            ├── listas/
            │   ├── index.js
            │   └── style.css
            ├── login/
            │   ├── index.js
            │   └── style.css
            └── movies/
                ├── index.js
                └── style.css
```

## Futuro do Projeto

- Melhorar a interface do usuário
- Implementar testes automatizados

## Contribuição

Este projeto foi criado para fins educacionais. Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto não possui licença específica.
