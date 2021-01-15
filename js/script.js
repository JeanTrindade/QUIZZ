// Declaração variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "Que seleção ganhou a copa de 2002?",
    "answers": [
      {
        "answer": "Brasil",
        "correct": true
      },
      {
        "answer": "Argentina",
        "correct": false
      },
      {
        "answer": "Alemanha",
        "correct": false
      },
      {
        "answer": "Mexico",
        "correct": false
      },
    ]
  },
  {
    "question": "Que time possui mais copas libertadores da america?",
    "answers": [
      {
        "answer": "Boca Juniors-ARG",
        "correct": false
      },
      {
        "answer": "Independente-ARG",
        "correct": true
      },
      {
        "answer": "Vasco-BR",
        "correct": false
      },
      {
        "answer": "Penarol-URU",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o jogador possui mais bolas de ouro fifa?",
    "answers": [
      {
        "answer": "Lionel messi",
        "correct": true
      },
      {
        "answer": "Cristiano Ronaldo",
        "correct": false
      },
      {
        "answer": "Ronaldo",
        "correct": false
      },
      {
        "answer": "Zidane",
        "correct": false
      },
    ]
  },
  {
    "question": "Quem foi a ultima campeã da Copa do Mundo Fifa?",
    "answers": [
      {
        "answer": "Belgica",
        "correct": false
      },
      {
        "answer": "França",
        "correct": true
      },
      {
        "answer": "Croácia",
        "correct": false
      },
      {
        "answer": "Brasil",
        "correct": false
      },
    ]
  },
  {
    "question": "Que time possui mais Copas do Brasil ?",
    "answers": [
      {
        "answer": "Cruzeiro-MG",
        "correct": true
      },
      {
        "answer": "Gremio-RS",
        "correct": false
      },
      {
        "answer": "Palmeiras-SP",
        "correct": false
      },
      {
        "answer": "Corinthians-SP",
        "correct": false
      },
    ]
  },
]

// Substituição do quizz para a primeria pergunta
function init() {
  // criar a primeira pergunta
  createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere as alternativas
  questions[i].answers.forEach(function(answer, i) {

    // Cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function() {
      checkAnswer(this);
    });

  });

  // Incrementar o número da questão
  actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {

  // selecionar todos botões
  const buttons = answersBox.querySelectorAll("button");

  // verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {

      button.classList.add("correct-answer");

      // checa se o usuário acertou a pergunta
      if(btn === button) {
        // incremento dos pontos
        points++;
      }

    } else {

      button.classList.add("wrong-answer");

    }

  });

  // Exibir próxima pergunta
  nextQuestion();

}

// Exibie a próxima pergunta no quizz
function nextQuestion() {

  // timer para usuário ver as respostas
  setTimeout(function() {

    // verifica se ainda há perguntas
    if(actualQuestion >= questions.length) {
      // apresenta a msg de sucesso
      showSucccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  }, 700);

}

function showSucccessMessage(){

  hideOrShowQuizz();
    
    //troca dados da tela sucessos

    //calcular o score
   const score = ((points / questions.length)* 100).toFixed(2);
   console.log(score);

   const displayScore = document.querySelector("#display-score span");
   displayScore.textContent = score.toString();

   // alterar o numero de perguntas corretas 
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    const qtyAnswer = document.querySelector("#questions-qty");
    qtyAnswer.textContent = questions.length;
}

function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");

}

// Reiniciar quizz
const restarBtn = document.querySelector("#restart");
restarBtn.addEventListener("click", function(){
  actualQuestion= 0;
  points = 0;
  hideOrShowQuizz()
  init();
});

// Inicialização do quizz
init();