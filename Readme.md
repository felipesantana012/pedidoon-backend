# Pedidooon

Um sistema de gerenciamento de pedidos com funcionalidades para autenticação, gerenciamento de itens, promoções e muito mais.

## Sobre o Projeto

Este projeto utiliza Node.js com o framework Express para gerenciar um sistema de pedidos. Inclui funcionalidades como:

- Autenticação de usuários.
- Gerenciamento de itens, categorias e promoções.
- Upload de imagens usando `multer`.
- Integração com o banco de dados MySQL utilizando Sequelize.

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados na sua máquina.
2. Clone este repositório:

   ```bash
   git clone https://github.com/seuusuario/pedidoon-backend.git
   ```

3. Acesse o diretório do projeto:
   ```bash
   cd pedidooon
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```

## Dependências

### Dependências Principais

- **bcryptjs**: Para hashing de senhas.
- **body-parser**: Para parsing de requisições HTTP.
- **cors**: Para permitir requisições de diferentes origens.
- **dotenv**: Para gerenciar variáveis de ambiente.
- **express**: Framework web para construir a API.
- **jsonwebtoken**: Para geração e validação de tokens JWT.
- **multer**: Para upload de arquivos.
- **mysql2**: Cliente MySQL para Node.js.
- **sequelize**: ORM para interagir com o banco de dados MySQL.

### Dependências de Desenvolvimento

- **nodemon**: Para reiniciar automaticamente o servidor durante o desenvolvimento.

## Scripts Disponíveis

No arquivo `package.json`, há os seguintes scripts configurados:

- **`npm run start`**: Inicia o servidor em produção.
- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento usando o `nodemon`.

## Estrutura de Pastas

```
├── src
│   ├── controllers
│   ├── database
│   ├── middleware
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── associations.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

- **`src`**: Contém todo o código-fonte do servidor.
  - **`controllers`**: Contém a lógica de negócios.
  - **`database`**: Configuração do banco de dados.
  - **`middleware`**: Contém middlewares personalizados.
  - **`models`**: Contém os modelos Sequelize para o banco de dados.
  - **`repositories`**: Contém funções de acesso ao banco de dados.
  - **`routes`**: Define as rotas da aplicação.
  - **`services`**: Contém regras de negócio reutilizáveis.
  - **`utils`**: Funções auxiliares utilizadas no projeto.
  - **`uploads`**: Diretório para armazenar arquivos enviados.
  - **`associations.js`**: Define as associações entre os modelos Sequelize.
- **`.env`**: Arquivo para variáveis de ambiente.
- **`package.json`**: Gerencia dependências e scripts do projeto.
- **`README.md`**: Documentação do projeto.

## Dotenv

- HOST = ""
- PORT_MYSQL = ""
- USER = ""
- PASSWORD = ""
- DATABASE = ""

- PORT_SERVER = ""
- JWT_SECRET = ""

## Uso

1. Para iniciar o servidor em modo de desenvolvimento, execute:
   ```bash
   npm run dev
   ```
2. O servidor será iniciado e estará disponível em `http://localhost:3000/api`.

3. O back-end ja esta disponivel na web :

- [pedidoonbackend.felipedev.app.br](https://pedidoonbackend.felipedev.app.br/)

## Acesso

- email: felipe@gmail.com
- senha: 1234
