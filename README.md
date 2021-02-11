# ![Spider Gwen drawing](https://raw.githubusercontent.com/ryteck/gwen/main/public/favicon.ico) Gwen


Gwen é um software primariamente (e por enquanto apenas) de estoque com capacidades expansivas no design para implementação de futuras novas ferramentas.

## setup

 1. Ter disponível o Node JS
 2. Ter disponível o Yarn (opcional e recomendado)
 3. Ter disponível um banco de dados Redis
 4. copiar o arquivo **.env.local.template** para um  **.env.local**
 5. preencher o arquivo  **.env.local** com as seguintes informações:
 
| Chave 	| Valor 	|
|:-:	|:-:	|
| REDIS_HOST 	| Host do seu banco Redis 	|
| REDIS_PORT 	| Porta do seu banco Redis 	|
| REDIS_PASS 	| Senha do seu banco Redis 	|
| MOD_PASS 	| Modificador da sua senha (criptografia) 	|
| MOD_TOKEN 	| Modificador do seu token (criptografia) 	|
| DEFAULT_USER_PASS 	| Senha padrão dos usuários 	|
| DEFAULT_ROOT_PASS 	| Senha do Root 	|

6. Rodar o comando yarn build (ou npm run build) seguido pelo yarn start (ou npm run start)

## Tecnologias

 - Javascript
 - Typescript
 - React JS
 - Next JS
 - Redis
