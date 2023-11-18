const questions = [
  {
    question: "What does MC stands for ?",
    answers: [
      { text: "Microwave", correct: false },
      { text: "MachineCode", correct: false },
      { text: "MicroClub", correct: true },
      { text: "MicrosoftClub", correct: false },
    ],
  },
  {
    question: "When was MicroClub founded ?",
    answers: [
      { text: "1985", correct: true },
      { text: "2002", correct: false },
      { text: "1992", correct: false },
      { text: "2010", correct: false },
    ],
  },
  {
    question: "Mc is the first Algerian scientific club ?",
    answers: [
      { text: "True", correct: true },
      { text: "False, it was the second", correct: false },
      { text: "False, it was the third", correct: false },
      { text: "False, it was the fourth", correct: false },
    ],
  },
  {
    question: "Which University does MC belong to?",
    answers: [
      { text: "USTO", correct: false },
      { text: "USTHB", correct: true },
      { text: "ALGER 1", correct: false },
      { text: "ENP", correct: false },
    ],
  },
  {
    question: "How many sections are they in the club ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "7", correct: false },
    ],
  },
  {
    question: "What is the field of Microclub ?",
    answers: [
      { text: "Chemistry", correct: false },
      { text: "Technology", correct: true },
      { text: "Biology", correct: false },
      { text: "Civil engineering", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//this function is called when the quizz starts or restarts
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// this function will remove the previous answers
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//if the answer is correct it will add the className correct else it will add the className incorrect
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  //disable the click after selecting an answer
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

//show the final score and replay button

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// increase the index and check if there are still questions left it will show the answer's options else it shows the score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
