
# Boas vindas ao repositório do blogsApi!

Um dos projetos avaliativos desenvolvido durante a formação full-Stack da TRYBE. O projeto tem foco no desenvolvimento usando ORM Sequelize e Node.js com express
e MySql.

---
# Endpoints!

- [1 - POST `/user`]
   - Cria usuário
- [2 - POST `/login`]
   - Efetua Login e retorna token de acesso
- [3 - GET `/user`]
   - Retorna lista de usuarios
- [4 - GET `/user/:id`]
   - Retorna usuario selecionado pelo ID URL
- [5 - POST `/categories`]
   - Cria Categoria de Posts
- [6 - GET `/categories`]
   - Retorna lista de Categorias de Posts
- [7 - POST `/post`]
   - Cria Post
- [8 - GET `/post`]
   - Retorna lista de Posts
- [9 - GET `post/:id`]
   - Retorna Post selecionado pelo ID URL
- [10 - PUT `/post/:id`]
   - Edita Post selecionado pelo ID URL
- [11 - DELETE `post/:id`]
   - Deleta Post selecionado pelo ID URL
- [12 - DELETE `/user/me`]
   - Deleta Usuario logado no Token de acesso.
---

# Lista de Dependencias utilizadas

- [1 - express]
	- npm install express
- [2 - sequelize]
	- npm install sequelize
	- npm install sequelize-cli
- [3 - dotenv]
	- npm install dotenv
- [4 - jsonwebtoken]
	- npm install jsonwebtoken
- [5 - jwt-decode]
	- npm install jwt-decode
- [6 - MySql]
	- npm install mysql2
---

**Configuração Variaveis de ambiente Sequelize**

`blogsapi/config/config.js`

```
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};
```
