<h1 align="center">Capydev</h1>

<p align="center">A CapyDev é reconhecida por sua abordagem ágil e por desenvolver produtos tecnológicos de ponta que ajudam seus clientes a alcançar ao próximo nível em inovação digital. em busca de novos desafios, a equipe continua crescendo e se reinventando, com a missão de criar soluções que façam a diferença no mundo conctado.
A CapyDev é uma equipe de desenvolvedores criada em 2024 por um grupo de estudantes da Fatec Jacareí apaixonados por tecnologia e inovação. Inspirados pela resiliência das Capivaras, animal símbolo da equipe, os decidiram unir suas habilidades de desenvolvimento de software, Design digital, Gerenciamento de dados, entre outros conhecimentos, para resolver problemas de maneira eficiente e colaborativa.</p>

<h2 align="center">Sobre o Projeto</h2>

<p align="center"> Desenvolver e entregar um curso interativo que ensine a metodologia Scrum, cobrindo seus princípios, práticas e papel dos membros da equipe, com o objetivo de capacitar os participantes a implementar Scrum em seus próprios projetos de forma eficaz.
O curso sobre Scrum será composto por uma série de módulos, cada um abordando diferentes aspectos da metodologia Scrum. Ele incluirá materiais teóricos, atividades práticas e avaliações para garantir a compreensão dos participantes. O curso será oferecido em formato presencial ou online, dependendo das necessidades e preferências do público-alvo.</p>

<h2>Sprints</h2>

| Sprints | Início | Fim | Relatório |
| ------- | ------ | --- | --------- |
| 1ª sprint | 10/09/2024 | 04/10/2024 | <a href="https://github.com/Capydev-jac/Capydev/tree/sprint-1">Ver</a>
| 2ª sprint | 07/10/2024 | 01/11/2024 |
| 3ª sprint | 04/11/2024 | 22/11/2024 |

<h2>Product Backlog</h2>

| ID | Requisitos | User Stories | Definition of Done |
| -- | ---------- | ------------ | ------------------ |
| RF.01 | As páginas devem possuir um mecanismo de navegação comum (menu de navegação) que,ao ser clicado, remete o usuário à seção correspondente; |  Como usuário eu quero um menu de navegação entre os módulos do curso para se situar melhor nos módulos e selecionar o que deseja aprender | Criar um indice e botoes de pagina anterior e proxima |
| RF.02 | O usuário deve ser capaz de se auto cadastrar, informando seu nome completo, e-mail esenha; | Como usuário eu quero um menu de cadastro com apenas: Nome completo, senha e email | Criar uma janela de cadastro com nome, senha e email como identificadores de usuario |
| RF.03 | O usuário deve ser capaz de efetuar autenticação utilizando e-mail do cadastro e senha; | Como usuário eu quero poder fazer login com apenas: Nome completo, senha e email | Criar um janela de login utlizando o dados fornecidos pelo cadastro para conectar o usuario a plataforma |
| RF.04 | O sistema deve manter um cadastro de questões, com alternativas verdadeira ou falsa, referentes aos tópicos apresentados nas páginas do portal; | Como usuário eu quero apenas questões de Verdadeiro ou Falsa referentes ao conteúdo acima | Fazer as questões apenas Verdadeiras ou Falsas |
| RF.05 | Aos usuários logados, o sistema deve exibir 3 questões para cada tópico. As questões devemcontemplar o tema abordado no tópico; | Como usuário eu quero questões relacionadas a cada tópico sendo 3 questões para cada| Criar uma sessão de questões relacionadas a cada tópico com 3 questões de Verdadeiro ou Falso |
| RF.06 | O usuário não logado pode acessar o conteúdo das páginas (tópicos) do curso, mas não pode visualizar as questões; | Como usuário eu quero estar logado para realizar as questões e caso eu nao esteja logado nao poder realiza-las | Criar um sistema para aceitar apeans usuarios logados na hora de responder as questões, criando uma restrição |
| RF.07 | O usuário pode tentar responder as questões quantas vezes ele quiser até obter êxito; | Como usuário eu quero poder tentar novamente as questões até eu compreender o conteúdo | Criar um sistema para fazer o usuario poder realizar novamente as perguntas caso erre |
| RF.08 | O sistema deve exibir as questões somente nos tópicos que o usuário não tenha sidoaprovado. Para ser considerado aprovado no tópico é necessário acertar pelo menos 2 questões; | Como usuário eu quero ser aprovado ao acertar 2 das questões daquele topico em expecifico, e os que eu nao passei me alertar sobre para eu tentar novamente | Fazer um sistema sobre ser aprovado apenas se acertar 2 questões e se nao cobrir esse requisito mostrar para o usuario os topicos que ele nao foi aprovado |
| RF.09 | O sistema deve ser capaz de emitir o certificado de conclusão para os usuários que foramaprovados em todos os tópicos; | Como usuário eu quero ser avaliado com 80% de acerto nas questões para adquirir o certificado de conclusão do curso, se for abaixo de 80% poder realizar novamente | Criar um sistema de avaliação que conta as questões que forem corretas e ao passar de 80% de acertos ser emitido como "aprovado" e se não passar poder realizar novamente |
| RF.10 | As questões devem ser cadastradas pelo administrador diretamente no SGBD PostgreSQL. | Como usuário eu quero que meus dados sejam armazenados em um banco de dados para serem utilizados na hora de fazer meu login/cadastro e na formação do certificado de conclusão | Criar um sistema de banco de dados no PostgreSQL e conectar ele ao site e armazenar a informação de todos os usuarios no back-end do site |
| RNF.01 | Os conteúdos devem ser distribuídos em páginas atendendo aos princípios de arquitetura de informação; | Como usuário eu quero que todo o conteúdo do curso seja distribuido em paginas seguindo os princípios da arquitetura de informação | Fazer os conteúdos do site seguir a arquitetura de informação |
| RNF.02 | As páginas devem ser organizadas em uma sequência lógica para o aprendizado do Scrum com um mecanismo para o usuário navegar para a próxima página e página anterior; | Como usuário eu quero poder navegar entre as paginas usando botões de "Proxima página" e de "Página anterior" | Criar botões que levam para a pagina seguinte e para pagina anterior, respectivamente
| RNF.03 | O curso deve cobrir os conhecimentos necessários para o aprendizado do Scrum; | Como usúario eu quero aprender tudo de importante sobre a Metodologia Scrum e seus ensinamentos nesse curso | Construir o site contendo todos os conteúdos necessarios para entender a Metodologia Scrum |
| RNF.04 | O curso deve seguir uma sequência lógica necessária para o aprendizado do Scrum; | Como usúario eu quero aprender na ordem correta de aprendizado, com as informações organizadas da forma correta | Construir o conteúdo do site em ordem  de ensinamentos do Scrum
| RNF.05 | As questões devem ser compatíveis com o conteúdo apresentado no tópico; | Como usuário eu quero que as questões sejam compativeis com o topico acima sendo respectivos entre si | Criar as questões abaixo do conteúdo do topico apresentando, apresentando as perguntas relativas a ele |
| RNF.06 | O visual deve ser responsivo. | Como usuário eu quero um visual responsivo e compreensivo apresentando todos os conteúdos relacionado a Metodologia Scrum e seu aprendizados seguindo de forma organizada | Tranformar o tamanho do site de acordo com o tamanho da janela com os conteudos respondendo-a |

<h2>Prototipo do Site</h2>
<img src="https://github.com/Felipe-ACG/Capydev/blob/main/images/wireframe.PNG">

<h2>Ferramentas Utilizadas</h2>
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", width="40", heigth="40"/>
  <img src="https://github.com/Felipe-ACG/Capydev/blob/main/images/dbdesignerlogo.png", width="40", heigth="40">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", width="40", heigth="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg", width="40", heigth="40"/>
</div>

<h2>Equipe</h2>

| Nome | Cargo | Midia Social |
| ---- | ----- | ------------ |
| João Victor | Scrum Master | <a href="https://github.com/joaoestreano"><img src="https://skillicons.dev/icons?i=github"></a> |
| Felipe Adriano | Product Owner | <a href="https://github.com/Felipe-ACG"><img src="https://skillicons.dev/icons?i=github"></a> |
| Felipe Ribeiro | Desenvolvedor | <a href="https://github.com/feliperib286"><img src="https://skillicons.dev/icons?i=github"></a> |
| Pedro Prado | Desenvolvedor | <a href="https://github.com/PradoPedro1917"><img src="https://skillicons.dev/icons?i=github"></a> |
| Gabriel Frois | Desenvolvedor | <a href="https://github.com/GabrielFrois"><img src="https://skillicons.dev/icons?i=github"></a> |
| Lucas Soares | Desenvolvedor | <a href="https://github.com/lucasgss0000"><img src="https://skillicons.dev/icons?i=github"></a> |
| Bruno Prince | Desenvolvedor | <a href="https://github.com/BrunoPrince1"><img src="https://skillicons.dev/icons?i=github"></a> |
| Gabriel Camargo | Desenvolvedor | <a href="https://github.com/gabecamargo"><img src="https://skillicons.dev/icons?i=github"></a> |
