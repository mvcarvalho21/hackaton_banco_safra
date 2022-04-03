<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/danieel-reis/hackaton_banco_safra">
    <img src="frontend\angular\src\assets\images\SafraPort-Logo1.png" alt="Logo">
  </a>

  <p align="center">
    Programa de portabilidade de financiamento do Banco Safra 
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Tabela de conteúdos</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#construído-com">Construído com</a></li>
      </ul>
    </li>
    <li>
      <a href="#como-instalar">Como instalar</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li>
      <a href="#uso">Uso</a>
      <ul>
        <li><a href="#front-end">Front-end</a></li>
        <li><a href="#back-end">Back-end</a></li>
        <li><a href="#prediction-model">Prediction model</a></li>
      </ul>
    </li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## Sobre o projeto
O sistema de portabilidade de financiamento do Banco Safra permite que os clientes apresentem dados do seu financiamento, que são analisados por um modelo de inteligência artificial, que define a categoria desse usuário e, com isso, calcula uma melhor taxa de juros pra esse financiamento.

Principais recursos:
* Suporte a uso tanto pelo computador quanto pelo celular.
* Aplicativo e site.
* Uso das melhores tecnologias atuais.
* Sistemas de autenticação, análise de crédito, e busca de dados do cliente.
* Inteligência artificial treinada em dezenas de milhares de usuários.

### Construído com

Major frameworks / add-ons / plugins:
* [Angular](https://angularjs.org/)
* [NodeJs](https://nodejs.org/en/)
* [PostgreSql](https://www.postgresql.org/)
* [Marvel App](https://marvelapp.com/)
* [SKLearn](https://scikit-learn.org/stable/)

<!-- GETTING STARTED -->
## Como instalar

### Pré-requisitos

[NPM](https://www.npmjs.com/) ou [YARN](https://yarnpkg.com/).

[Python](https://www.python.org/).

### Instalação

Instalar dependências nas pastas 
  ```
  /frontend/angular/
  ```
  e
  ```
  /backend/
  ```
com o comando
    ```sh
    npm install
    ```
    ou
    ```sh
    yarn install
    ```

Install .

Install Python packages with
    ```sh
    pip install pandas sklearn
    ```

<!-- USAGE EXAMPLES -->
## Uso

### Front-end

Iniciar o servidor do angular
* Windows
  ```powershell
  npm build ng serve
  ```

* Linux
  ```sh
  ng serve
  ```

### Back-end

Iniciar o servidor do NodeJs
  ```sh
  npm run
  ```

### Prediction model

Iniciar o servidor do Python
  ```sh
  python server.py
  ```

### Quadro KANBAN: https://trello.com/b/T9QivxDk/hackaton-banco-safra
