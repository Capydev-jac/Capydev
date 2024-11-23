const { pool } = require("./bd.js");

// Função para cadastrar um usuário
async function cadastrarUsuario(req, res) {
  const { mail, nome, senha } = req.body;

  // Validação dos campos obrigatórios
  if (!mail || mail.length == 0) {
    return res.json({ erro: "Forneça o e-mail." });
  } else if (!nome || nome.length == 0) {
    return res.json({ erro: "Forneça o nome." });
  } else if (!senha || senha.length == 0) {
    return res.json({ erro: "Forneça a senha." });
  }

  try {
    // Verifica se o e-mail já existe
    let resposta = await pool.query(
      "SELECT idusuario, mail, nome FROM usuario WHERE mail=$1 LIMIT 1",
      [mail]
    );
  // Verifica se o usuário existe na usuario
    if (resposta.rowCount > 0) {
      // Retorna o erro se o e-mail já estiver cadastrado
      return res.json({ erro: "E-mail já cadastrado." });
    } else {
      // Insere o novo usuário na tabela sem criptografar a senha
      resposta = await pool.query(
        "INSERT INTO usuario(mail, nome, senha) VALUES ($1, $2, $3) RETURNING idusuario, mail, nome",
        [mail, nome, senha] // Senha armazenada em texto simples
      );

      // Retorna o registro inserido no formato JSON
      return res.json({
        mensagem: "Usuário cadastrado com sucesso.",
        usuario: resposta.rows[0],
      });
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
}

// Função para login
function login() {
  const mail = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mail, senha })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Armazenando o token no localStorage
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard";  // Redireciona para o dashboard ou página principal
    } else {
      alert(data.erro);
    }
  })
  .catch(error => {
    console.error("Erro:", error);
  });
}

// Função para verificar se já está logado
function verificarLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    // Se o token existir, já está logado
    alert("Você já está logado!");
    window.location.href = "/dashboard";  // Redireciona para o dashboard ou página principal
  }
}



// Exporta as funções
module.exports = { cadastrarUsuario, login };
