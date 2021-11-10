# Backend Case técnico STONE

<b>Antes de começar a codar :)</b>

- Esse repositório específico não deve ser alterado;
- Esse repositório também não pode ser forkado;
- É necessário importar o código desse repo para um novo repositório que você irá criar :) - Segue um [passo a passo](https://docs.github.com/pt/github/importing-your-projects-to-github/importing-source-code-to-github/importing-a-repository-with-github-importer) de como fazer isso;
- Configure o novo repositório como private;
- Inclua os seguintes users do git como colaboradores: marcoscesardev, Vitormartins12, Viniciuspassos, melogustavo, yjunqueira
- No seu repositório, crie sua(s) branch(es) e realize os commits com base nas atividades propostas
- Ao finalizar os commits, suba os pull requests para master e os mantenha abertos (não mergear)
- Use preferencialmente o Linux para realizar o desafio. Caso não tenha linux instalado, sugerimos a utilização do [WSL](https://docs.microsoft.com/pt-br/windows/wsl/install)

## Sobre o projeto

- O nosso sistema é de um mercado onde podemos cadastrar usuários, produtos e associar os produtos a cada usuário;
- Precisamos melhorar nosso código e incluir mais algumas funcionalidades;
- O objetivo é ser um projeto pragmático, que foque nas atividades propostas;
- Tudo no teste vale pontos. Então, mesmo que você não consiga finalizar todos os pontos, vamos considerar tudo que você fez;
- Não compartilhe esse repositório com outras pessoas;

## Funcionalidades que o código já possui

- CRUD produto
- CRUD usuário
- Associar produtos ao usuários
- Login usuário

## Regras de negócio

- Apenas o Admin pode Cadastrar, Atualizar e Deletar produtos.
- Para Atualizar/Deletar a sua conta o usuário precisa estar logado.
- O usuário só pode adicionar produtos para si mesmo.

## Atividades Obrigatórias:

1. Subir PR (de preferência, sem mergear) apontando melhorias no padrão do código, erros de escrita, problemas de performance e más práticas;
2. Criar rota para:
  - Buscar a quantidade de total que cada produto que foi associado aos usuários
  - Buscar quantidade que cada usuário tem de cada produto

<b>Exemplo de response:</b>
```
{
  'joão': [
    'arroz' 1,
    'feijão': 1,
  ],
  'maria': [
    'arroz': 2,
    'feijão': 3,
    'macarrão': 3,
  ]
}
```

## Bônus:

- Adicionar update de quantidade de produtos do usuário
- Adicionar a possibilidade de troca de produtos entre usuários. Onde o usuário vai enviar quantidade x do produto A e receber a mesma quantidade x do produto B do outro usuário
- Implementar testes

## Rodando backend

- yarn ou npm install
- Para rodar o banco você tem duas opções:
  - DB direto na maquina:
    - Precisa ter o postgres baixado
    - Remover password do arquivo src/config/database.js
    - Criar DB com o mesmo nome "stone-inbound"
  - DB como um container no docker:
    - Cria container: docker run --name localhost -e POSTGRES_PASSWORD=localhost -p 5433:5432 -d postgres
    - Cria o DB com o nome "stone-inbound"
- Depois de escolher um dos métodos acima, você deve rodar yarn sequelize db:migrate
- yarn sequelize db:seed:all para rodar as seeds e seu banco já ter alguns dados :)
- yarn start para iniciar o projeto

### Observation

- Configuração default do banco de dados
  - DB_HOST: localhost
  - DB_USER: postgres
  - DB_PASS: localhost
  - DB_NAME: stone-inbound
  - DB_PORT: 5433
