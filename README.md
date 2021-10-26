<h1 align="center">Sky Test API</h1>

## Sobre o projeto
API RESTful com criação de sign up/in de usuário com autenticação JWT.

## Tecnologias utilizadas

- Node JS
- MongoDB
- JWT
- Hash crypt
- Jest

## Dependências

- Node v14.17.3
- Yarn v1.22.5

## Links Úteis
- Node download: https://nodejs.org/en/
- MongoDB download: https://www.mongodb.com/try/download/community
- Yarn instalação: https://yarnpkg.com/getting-started

## Instruções:
- Após instalar todas as dependências requeridas, importe o projeto em sua IDE preferida (recomenda-se a utilização de VScode). 

- Em seguida, execute na pasta do projeto o comando:
`yarn install`

- Modifique o arquivo `.env.example` da forma que preferir e duploque o mesmo renomeando-o para `.env` somente.

- Execute o projeto com o comando:
`yarn start:dev`

## Rotas
- SignUp
`curl --request POST \
  --url http://sky-test-api.herokuapp.com/api/signup \
  --header 'Content-Type: application/json' \
  --data '{
	"nome": "luiz",
	"email": "luiz@gmail.com",
	"senha": "abc1234",
	"telefones": [
		{
			"numero": 111111111,
			"ddd": 11
		}
	]
}'`

- SignIn
`curl --request PATCH \
  --url http://sky-test-api.herokuapp.com/api/signin \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "luiz@gmail.com",
	"senha": "abc1234"
}'`

- Busca usuário:
`curl --request GET \
  --url http://sky-test-api.herokuapp.com/api/users/db35b339-5fb4-4a8b-acc5-eec8e86b79cb \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiMzViMzM5LTVmYjQtNGE4Yi1hY2M1LWVlYzhlODZiNzljYiIsImlhdCI6MTYzNTIxMjI3NSwiZXhwIjoxNjM1MjE0MDc1fQ.xlXGBv5hcGfu4qQeN5rVONlH_W02dKBJ3Hlppm5-YNA'`


## Funcionalidades realizadas
- Criação de usuario com persistencia de dados e token;
- Login com atualização de token e data de ultimo login;
- Busca por token validando o mesmo.

# Participante:

Luiz Ricardo Soares dos Santos - [![Linkedin Badge](https://camo.githubusercontent.com/1c23f7895aa673fa701bca3fa0253dd7d17a8a2d2b3ba23571e712a93ddb5db7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4c696e6b6564496e2d626c75653f7374796c653d666c61742d737175617265266c6f676f3d4c696e6b6564696e266c6f676f436f6c6f723d7768697465266c696e6b3d68747470733a2f2f7777772e6c696e6b6564696e2e636f6d2f696e2f6c75697a2d7269636172646f2d736f617265732d646f732d73616e746f732d3038353830383137622f)](https://www.linkedin.com/in/luiz-ricardo-soares-dos-santos-08580817b/)

## Obrigado!
Obrigado pela oportunidade, foi muito divertido! 🚀
