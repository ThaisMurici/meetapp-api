# Meetapp API

Esta API consiste na parte de back-end da aplicação construída para o desafio final do Bootcamp da Rockeseat.

Foram utilizadas as seguintes tecnologias:

- NodeJS com AdonisJS.

## Instalação

Para rodar a aplicação basta clonar esse repositório e executar dentro do diretório raiz:

```bash
$ adonis serve --dev
```

Para executar o serviço do banco de dados criado no Docker (como explicado na sessão seguinte):

```bash
$ docker start database
```

Rodar migrations

```bash
$ adonis migration:run
```

Rodar seeds

```bash
$ adonis seed
```

## Configuração do banco de dados

Nesta aplicação foi utilizado o banco PostgreSQL configurado pelo Docker. Os passos para a configuração dessas tecnologias são listados a seguir:

- Instalar o Docker seguindo as [orientações do site oficial](https://www.docker.com/get-started).

- Criar serviço para o banco de dados:

  ```bash
    $ docker run --name database -p 5432:5432 -d -t kartoza/postgis
  ```

- Instalação dos drivers do PostgreSQL

  ```bash
    $ npm i --save pg
  ```

- Criar database para a aplicação (pode-se utilizar a interface do [Postico](https://eggerapps.at/postico/) para isso).

- Configurar as credenciais do banco de dados no arquivo `.env` da aplicação.

  ```properties
    DB_CONNECTION=pg
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=meetapp
  ```

## Configuração das filas

Para que os jobs sejam processados, é necessário estar com o servidor da aplicação rodando, assim como executar o serviço do Kue:

```bash
adonis kue:listen
```
