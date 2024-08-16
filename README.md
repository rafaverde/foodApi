<h1 align="center">Curso Explorer - RocketSeat - Projeto Final - Food Explorer</h1>

<p align="center">
Projeto desenvolvido ao final do curso Explorer da Rocketseat, de uma aplicação CRUD para gerenciamento de um restaurante fictício de delivery, com cadastro de usuário e login, cadastro, edição e exclusão de pratos e manipulação de banco de dados, em uma SPA (Single Page Application) construída com React.js e Node.js.
</p>
<p align="center">
O FoodExplorer possui dois tipos de usuários, Admin e Customer, com regras definidas para cada um deles.
</p>

<p align="center">
Veja o resultado <a href="https://foodexplorer-rafaverde.netlify.app/" target="_blank">aqui.</a>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="Cover" src=".github/preview.jpg" width="100%">
</p>

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Figma
- React.js
- Node.js
- HTML e CSS
- JavaScript
- Git e Github

## Projeto

Uma aplicação de ponta a ponta, em React.js e Node.js para cadastro de usuários e pratos para uma simulação de um restaurante que vende online para delivery. A aplicação permite o cadastro de novos usuários e login em um banco de dados SQLite.

### Usuários Customer podem:

- Atualizar seu cadastro, trocar avatar, informações e senha.
- Visualizar os pratos, favoritar, mudar quantidades e adicionar aos pedidos.
- Revisar seus pedidos, adicionando ou retirando quantidades, ou removendo itens para finalizar e simular o pagamento dos pedidos.
- Visualizar seus pratos favoritos e seus pedidos.

### Usuários Admin podem:

- Atualizar seu cadastro, trocar avatar, informações e senha.
- Visualizar os pratos, criar novos pratos e editar pratos existentes.
- Listar todos os pedidos que existem e mudar seu status, indicando produção e entrega.

## Funcionalidades da API

#### User Controller:

- Create - Cria user
- Update - Atualiza dados do user
- Show - Carrega dados do user

#### User Validate Controller:

- Index - Lista informações de validação

#### User Avatar Controller:

- Update - Atualiza imagem do user

#### Sessions Controller:

- Create - Cria sessão (LogIn)
- Logout - Encerra sessão (LogOut)

#### Plates Controller:

- Create - Cria novo prato
- Show - Carrega informações do Prato
- Delete - Deleta prato
- Index - Busca prato por id
- Update - Atualiza informações do prato

#### Plates Image Controller:

- Update - Atualiza imagem do prato

#### Plates Category Controller:

- Create - Cria categorias de pratos
- Index - Lista categoria de pratos por id

#### Orders Controller:

- Create - Cria pedido para user
- Update - Atualiza status do pedido e pagamento
- Show - Mostra pedido
- Index - Lista pedidos por id ou todos os users

## Layout

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/community/file/1196874589259687769). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## Licença

Esse projeto está sob a licença MIT.

---

Feito com ♥ by [rafaverde](https://github.com/rafaverde) :wave:

RocketSeat Student - [Participe da nossa comunidade!](https://discord.gg/rocketseat)

#foodExplorer #RocketSeat #react #node #html #css @javascript
