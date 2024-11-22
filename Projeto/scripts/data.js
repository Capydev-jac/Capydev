"use strict";

/* contas de teste */
const accounts = [
  {
    name: "João",
    surname: "Silva",
    email: "joao@fatec.sp.gov.br",
    password: "capydev",
    passedQuizzes: {

    },
  },
  {
    name: "Lucas",
    surname: "Soares",
    email: "lucas@fatec.sp.gov.br",
    password: "fatec",
    passedQuizzes: {

    },
  },
];

const questions = {
  pag02: [
  "O Scrum é um framework ágil que pode ser utilizado apenas no desenvolvimento de software.",
  "O Scrum enfatiza a colaboração contínua entre equipes e stakeholders para garantir que o produto atenda às necessidades do cliente.",
  "O Scrum busca melhorar a produtividade por meio de entregas frequentes e incrementais."
  ],

  pag03: [
  "Os três pilares do Scrum são fundamentais para garantir que o processo funcione de maneira eficaz e contínua.",
  "Durante a Daily Scrum, a equipe avalia seu progresso em relação à meta da sprint.",
  "O uso de ferramentas como quadros Scrum e gráficos de desempenho ajuda a garantir a transparência."
  ],

  pag04: [
  "O Scrum define três papéis principais que são cargos hierárquicos dentro do framework.",
  "O Product Owner é responsável por gerenciar o Product Backlog, garantindo que esteja claro e priorizado.", 
  "Os membros do time de desenvolvimento são responsáveis apenas por suas próprias tarefas e não colaboram entre si."
  ],

  pag05: [
  "Os artefatos no Scrum são ferramentas e produtos intangíveis criados durante o processo.",
  "O Product Backlog é uma lista priorizada de tudo o que precisa ser feito para o produto e é mantido pelo Product Owner.",
  "O Incremento é o conjunto de todos os itens concluídos no Sprint Backlog, mais o valor acumulado de todas as sprints anteriores."
  ],

  pag06: [
  "A Sprint é o ciclo central do Scrum, com duração de 1 a 4 semanas, onde uma meta é definida e um incremento utilizável é entregue no final.",
  "A Sprint sempre tem a mesma duração, independentemente do projeto ou contexto.",
  "A Retrospectiva da Sprint ocorre antes da Revisão da Sprint para que o time já planeje as melhorias."
  ],

  pag07: [
  "A Definição de Pronto (DoD) é um conjunto de critérios que garante que uma tarefa do backlog esteja 100% concluída.",
  "A DoD nunca pode ser ajustada após sua definição inicial.",
  "Um incremento pode ser uma nova versão do software com novas funcionalidades e correções de bugs, prontas para serem implementadas."
  ],

  pag08: [
  "O Scrum não se preocupa com a qualidade do produto final, mas apenas com a velocidade de entrega.",
  "A flexibilidade no Scrum impede que o escopo do projeto seja alterado durante o desenvolvimento.",
  "A Definição de Pronto (DoD) garante que os incrementos entregues sejam testados e de alta qualidade."
  ],
}

const correctAnswers = {
  "pag02": ["f", "v", "v"],
  "pag03": ["v", "v", "v"],
  "pag04": ["f", "v", "f"],
  "pag05": ["f", "v", "v"],
  "pag06": ["v", "f", "v"],
  "pag07": ["v", "f", "v"],
  "pag08": ["f", "f", "v"],
}



