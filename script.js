const questions = [
    {
        question: "Qual é maior animal do mundo?",
        answers: [
            { id: 1, text: "Trabrão", correct:false },
            { id: 2, text: "Baleia Azul", correct:true },
            { id: 3, text: "Elefante", correct:false },
            { id: 4, text: "Girafa", correct:false },
        ],
    },
    {
        question: "Qual é maior deserto do mundo?",
        answers: [
            { id: 1, text: "Kaanhari", correct:false },
            { id: 2, text: "Gobi", correct:false },
            { id: 3, text: "Saara", correct:true },
            { id: 4, text: "Antártida", correct:false },
        ],
    },
    {
        question: "Qual é o menor continente do mundo?",
        answers: [
            { id: 1, text: "Ásia", correct:false },
            { id: 2, text: "Austrália", correct:true },
            { id: 3, text: "Ártico", correct:false },
            { id: 4, text: "África", correct:false },
        ],
    },
    {
        question: "Qual é o menor país do mundo?",
        answers: [
            { id: 1, text: "Vaticano", correct:true },
            { id: 2, text: "Butão", correct:false },
            { id: 3, text: "Nepal", correct:false },
            { id: 4, text: "Sri Lanka", correct:false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answersButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        // Mostrar a resposta correta
        Array.from(answersButtons.children).forEach((button) => {
            if (button.dataset.id == correctAnswer.id) {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answersButtons.children).forEach((button) => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

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
