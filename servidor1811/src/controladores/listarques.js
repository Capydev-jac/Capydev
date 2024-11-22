
async function listarQuestionario(req, res) {
  const { idusuario } = req.body;
  
  if (!idusuario) {
    return res.json({ erro: "Forneça os dados necessários (idusuario)." });
  }

  try {
    // Consulta todas as questões associadas ao questionário do usuário
    const resposta = await pool.query(
      `SELECT idquestionario, npagina, questoes, respostas
       FROM tbquestionario
       WHERE idusuario = $1`,
      [idusuario]
    );

    if (resposta.rowCount > 0) {
      const questionarios = resposta.rows;

      // Organiza as questões por página (suporte para até 8 páginas)
      let questoesPorPagina = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: []
      };

      // Preenche as questões conforme a npagina (1 a 8)
      for (const questionario of questionarios) {
        if (questoesPorPagina[questionario.npagina]) {
          questoesPorPagina[questionario.npagina].push(questionario);
        }
      }

      return res.json({ questoesPorPagina });
    } else {
      return res.status(404).json({ erro: "Nenhum questionário encontrado para o usuário." });
    }
  } catch (error) {
    console.error("Erro ao verificar questionário:", error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}
