const questions = [
    {
        question: "What is Renaissance translated to in French?",
        answers: [
            { text: "A", correct: false},
            { text: "b", correct: true},
            { text: "c", correct: false},
            { text: "d", correct: false},
        ]
    },
    {
        question: "question b",
        answers: [
            { text: "A", correct: false},
            { text: "b", correct: true},
            { text: "c", correct: false},
            { text: "d", correct: false},
        ]
    },
    {
        question: "question c",
        answers: [
            { text: "A", correct: false},
            { text: "b", correct: true},
            { text: "c", correct: false},
            { text: "d", correct: false},
        ]
    },
    {
        question: "question d",
        answers: [
            { text: "A", correct: false},
            { text: "b", correct: true},
            { text: "c", correct: false},
            { text: "d", correct: false},
        ]
    },
    {
        question: "question e",
        answers: [
            { text: "A", correct: false},
            { text: "b", correct: true},
            { text: "c", correct: false},
            { text: "d", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    }); 
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz();

