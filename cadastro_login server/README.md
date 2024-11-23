## ABP - 1DSM - 2024-1 - Código de Exemplo do Servidor

O código é usado para subir um servidor que faz a conexão com o SGBD PostgreSQL.
O SGBD pode estar no localhost ou em alguma cloud. Porém, sugere-se o uso de uma instância do SGBD PostgreSQL no Render.

![](https://github.com/arleysouza/abp-1dsm-server/blob/main/images/modelo-bd.png)

### Instruções de uso

Antes de prosseguir é necessário ter instalado o Node.js (https://nodejs.org/en/download) e o git (https://git-scm.com/downloads) no seu computador.

Digite o comando a seguir no CMD (Prompt de comando) para baixar o projeto no seu computador:
```
git clone https://github.com/arleysouza/api-1dsm-server servidor
```
Se tudo deu certo, foi criada a pasta `servidor` no local que você fez o download. Digite os comandos a seguir para entrar dentro da pasta `servidor` e para instalar as dependências necessárias:
```
cd servidor
npm i
```

### Passos para criar o BD

O BD pode ser criado localmente (Passos 1 a 4) ou no Render (Passos 5 a 9).

#### BD no localhost

1. Acesse o SGBD PostgreSQL usando o pgAdmin e crie um BD de nome `bdabp`;
2. No pgAdmin, execute os comandos SQL que estão no arquivo `src/suporte/clausulas_SQL.txt` para criar as tabelas do modelo de BD e carregar alguns dados de teste;
3. No VS Code, atualize o arquivo `.env` para ter os dados de conexão com o BD `bdabp`, ou algum outro nome que você tenha dado. As variáveis de ambientes do arquivo `.env` possuem os parâmetros usados para fazer a conexão ao BD no SGBD:
```
PORTA = 3030
BDUSUARIO = postgres
BDHOST = localhost
BDNOME = bdabp
BDSENHA = 123
BDPORTA = 5432
```
4. No VS Code, acesse o arquivo `src/controladores/bd.js` e descomente o código a seguir. Esse código faz uso das variáveis de ambientes do arquivo `.env` para obter os parâmetros de conexão com o SGBD PostgreSQL:
```
const pool = new Pool({
  user: process.env.BDUSUARIO,
  host: process.env.BDHOST,
  database: process.env.BDNOME,
  password: process.env.BDSENHA,
  port: process.env.BDPORTA
});
```
Comente o código a seguir, pois não faz sentido fazer a conexão para dois SGBDs distintos:
```
const pool = new Pool({
  connectionString: process.env.BDURI,
  ssl: {
    // Ajuste necessário caso esteja utilizando SSL e seu ambiente requeira essa configuração
    rejectUnauthorized: false 
  }
});
```

#### BD no Render

5. Acesse o Render e crie uma instância do SGBD PostgreSQL, por exemplo, forneça o nome `abp-1dsm-sgbd`;
6. No Render, copie `External Database URL`, que é URL de acesso a instância do SGBD;
7. No VS Code, atualize o arquivo `.env` para ter somente as variáveis `PORTA` e `BDURI`, sendo que a variável  `BDURI` terá a URL copiada de `External Database URL`:
```
PORTA = 3030
BDURI = postgres://bdabp:cole-aqui-a-sua-URL@usuario.oregon-postgres.render.com/bdabp
```
8. No VS Code, acesse o arquivo `src/controladores/bd.js` e descomente o código a seguir. Esse código faz uso das variáveis de ambientes do arquivo `.env` para obter os parâmetros de conexão com o SGBD PostgreSQL:
```
const pool = new Pool({
  connectionString: process.env.BDURI,
  ssl: {
    // Ajuste necessário caso esteja utilizando SSL e seu ambiente requeira essa configuração
    rejectUnauthorized: false 
  }
});
```
Comente o código a seguir, pois não faz sentido fazer a conexão para dois SGBDs distintos:
```
const pool = new Pool({
  user: process.env.BDUSUARIO,
  host: process.env.BDHOST,
  database: process.env.BDNOME,
  password: process.env.BDSENHA,
  port: process.env.BDPORTA
});
```
9. No CMD (prompt de comando), acesse a pasta onde está instalado o SGBD PostgreSQL no seu computador e localize o programa PSQL na pasta `bin`. Um exemplo de caminho pode ser `C:\Program Files\PostgreSQL\14\bin`. Digite o comando psql seguido pelo `External Database URL`:
```
psql postgres://bdabp:cole-aqui-a-sua-URL@usuario.oregon-postgres.render.com/bdabp
```
Se tudo der certo você estará conectado à instância do BD no Render. Copie e cole os comandos SQL a seguir nesse terminal para criar as tabelas `tbusuario` e `tbquestao`. Essas tabelas serão usados para você testar o código, posteriormente, você terá de criar mais tabelas:
```
DROP TABLE if exists tbusuario;
DROP TABLE if exists tbquestao;

CREATE TABLE tbusuario (
  idusuario SERIAL PRIMARY KEY,
  mail VARCHAR(50) NULL,
  nome VARCHAR(50) NULL
);

CREATE TABLE tbquestao (
  idquestao SERIAL PRIMARY KEY,
  enunciado VARCHAR(256) NULL,
  resposta BOOL NULL
);

INSERT INTO tbquestao (enunciado, resposta) 
VALUES
('Uma variável é um espaço na memória do computador?', true),
('O tipo de dado é o conteúdo da variável?', false),
('Os tipos de dados podem ser primitivos ou objetos?', true),
('Na estrutura decisão if...else o bloco if pode existir sem o bloco else?', true ),
('Na estrutura decisão if...else o bloco else pode existir sem o bloco if?', false),
('A estrutura de decisão if...else pode ser aninhada dentro de um bloco if ou else?', true),
('Uma estrutura de repetição for pode ser usada quando o número de iterações é desconhecido?', false),
('O loop do...while executa o bloco de código pelo menos uma vez, mesmo se a condição for inicialmente falsa?', true),
('Em uma estrutura de repetição while, o bloco de código é executado enquanto a condição especificada for falsa?', false);
```
Após criar as tabelas, submeta o comando SQL `select * from tbquestao;` para verificar se deu certo.


### Subir o servidor no seu computador

No terminal do VS Code, execute um dos comandos a seguir para subir o servidor na porta `3030`, que é o conteúdo da variável de ambiente `PORTA`:
```
npm run dev
ou
npm start
```

### Teste no navegador

As rotas estão mapeadas no servidor no arquivo `src/index.js`. Atualmente existem as rotas `/usuario`, `/login` e `/questao`. Uma rota é formado pelo caminha + método HTTP. As rotas `/usuario` e `/login` usam o método HTTP POST.
```
// Define a rota /usuario usando o método HTTP POST
// A rota é mapeada para a função criar
app.post("/usuario", criar);

// Define a rota /login usando o método HTTP POST
app.post("/login", buscar);

// Define a rota /usuario usando o método HTTP GET
app.get("/questao", listar);
```
Qualquer outra rota será tratada pelo código a seguir:
```
app.use(function(req,res){
    res.json({erro:"Rota desconhecida"});
});
```
#### Exemplos de rotas
A rota `/questao` responde a lista de questões e pode ser testada diretamente no navegador, por ela usar o método HTTP GET, já as demais rotas não funcionam diretamente no navegador:
```
http://localhost:3030/questao
```
A rota `/login` requer que o cliente envie o e-mail e, por utilizar o método HTTP POST, não pode ser testada diretamente no navegador:
```
http://localhost:3030/login
```
