# Levante

Uma biblioteca de uma grande cidade está com dificuldades de organizar as reservas de seus livros,
hoje todo o controle é feito manualmente, para saber os livros mais reservados levaria um tempo de pesquisa nos livros de reserva.
Então a biblioteca teve uma ideia de montar um sistema de reservas.

## Funcionalidades
### As principais funcionalides desta aplicação são:
#### Administrador (bibliotecário) pode:
- Cadastrar novos livros;
- Pesquisar todos os livros, podendo filtrar por cada detalhe e retorno com paginação;
- Editar os livros existentes;
- Remover os livros existentes;
- Cadastrar novos usuários, sendo comum ou novos administradores;
- Criar uma nova reserva, entre livro e usuário comum;
- Pesquisar todas as reservas, podendo filtrar por cada detalhe e retorno com paginação;
- Finalizar uma reserva.

#### Usuário pode:
- Visualizar todos os livros, podendo filtrar por cada detalhe e retorno com paginação;
- Criar uma reserva;
- Visualizar suas reservas, podendo filtrar por cada detalhe e retorno com paginação.

## Tecnologias utilizadas
 - Node
 - Express
 - Sequelize
 - Socket.io
 - React
 - Docker
 
## Como inicializar o projeto

Clone o projeto
```bash
git clone git@github.com:Tiago195/Levante.git
```

Entre na pasta com o comando
```bash
cd Levante
```

Altere o arquivo .env dentro da pasta backend ou utilize o arquivo que deixei como default

Suba os containers necessarios com o comando
```docker
docker run --name levante-DB -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql
```

Rode o back end com o comando
```bash
npm run start:back
```

Rode o front end com o comando
```bash
npm run start:front
```

