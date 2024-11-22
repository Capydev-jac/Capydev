// Importa o pacote pg e desestrutura a propriedade Pool
const {Pool} = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Configura o pool de conexão, passando um objeto de configuração 
// contendo as informações necessárias para se conectar ao BD do PostgreSQL
const pool = new Pool({
  user: process.env.BDUSUARIO,
  host: process.env.BDHOST,
  database: process.env.BDNOME,
  password: process.env.BDSENHA,
  port: process.env.BDPORTA
});


// Configura o pool de conexão, passando um objeto de configuração 
// A URI de conexão precisa estar na variável de ambiente BDURI do arquivo .env
/*const pool = new Pool({
  connectionString: process.env.BDURI,
  ssl: {
    rejectUnauthorized: false // Ajuste necessário caso esteja utilizando SSL e seu ambiente requeira essa configuração
  }
});
*/
// Exporta a variável pool
module.exports = { pool };


/*
Comandos para crias as tabelas tbusuario e tbquestao:
DROP TABLE if exists tbusuario;
DROP TABLE if exists tbquestao;

CREATE TABLE tbusuario (
  idusuario SERIAL PRIMARY KEY,
  mail VARCHAR(50) NULL,
  nome VARCHAR(50) NULL
);

CREATE TABLE tbquestao1 (
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
*/