"use strict";

// Importa os pacotes necessários
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const questionario = require("./controladores/questionario");


// Configura variáveis de ambiente
dotenv.config();

// Configura o servidor e middlewares
const app = express();
const PORTA = process.env.PORTA || 3000;

app.use(cors());
app.use(express.json());

// Configura a conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Testa a conexão com o banco de dados
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão com o banco de dados bem-sucedida:", res.rows[0]);
  }
});

// Middleware para verificar autenticação
function verificarAutenticacao(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Corrigido para pegar o token corretamente

  if (!token) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.idusuario;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
}

// Rotas
// Login
app.post("/login", async (req, res) => {
  const { mail, senha } = req.body;

  if (!mail || !senha) {
    return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
  }

  try {
    const resultado = await pool.query(
      "SELECT idusuario, senha FROM usuario WHERE mail = $1",
      [mail]
    );

    if (resultado.rows.length === 0 || resultado.rows[0].senha !== senha) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign(
      { idusuario: resultado.rows[0].idusuario },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login realizado com sucesso.", token });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro.message);
    res.status(500).json({ erro: "Erro no servidor." });
  }
});

// Cadastro de usuário
app.post("/usuario", async (req, res) => {
  const { mail, nome, senha } = req.body;

  if (!mail || !nome || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const usuarioExistente = await pool.query("SELECT * FROM usuario WHERE mail = $1", [mail]);

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    const novoUsuario = await pool.query(
      "INSERT INTO usuario (mail, nome, senha) VALUES ($1, $2, $3) RETURNING idusuario, mail, nome",
      [mail, nome, senha]
    );

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro.message);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});

// Listar questões por página
app.get("/questoes", verificarAutenticacao, async (req, res) => {
  const { pagina = 1 } = req.query; // Página padrão é 1
  const itensPorPagina = 3;
  const offset = (pagina - 1) * itensPorPagina;

  try {
    const resultado = await pool.query(
      `SELECT idquestao, enunciado
       FROM tbquestionario
       ORDER BY idquestao
       LIMIT $1 OFFSET $2`,
      [itensPorPagina, offset]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "Nenhuma questão encontrada para esta página." });
    }

    res.json({
      pagina: parseInt(pagina),
      questoes: resultado.rows,
    });
  } catch (erro) {
    console.error("Erro ao buscar questões:", erro.message);
    res.status(500).json({ erro: "Erro no servidor." });
  }
});


app.get("/teste", function(req, res){
  res.json("teste");
})
app.post("/questionarioporpagina", questionario.listarQuestionarioPorPagina );

// Middleware para rotas desconhecidas
app.use((req, res) => res.status(404).json({ erro: "Rota desconhecida." }));

// Inicializa o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
