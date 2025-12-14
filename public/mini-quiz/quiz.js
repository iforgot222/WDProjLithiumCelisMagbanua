const questions = [
    {
        question: "What is Renaissance translated to in French?",
        answers: [
            { text: "Revival", correct: false},
            { text: "Renewal", correct: false},
            { text: "Rebirth", correct: true},
            { text: "Restore", correct: false},
        ]
    },
    {
        question: "Which known family were crucial patrons in the Renaissance?",
        answers: [
            { text: "Medici Family", correct: true},
            { text: "Sforza Family", correct: false},
            { text: "Este Family", correct: false},
            { text: "Gonzaga Family", correct: false},
        ]
    },
    {
        question: "Who was given the title: “Father of the Renaissance”?",
        answers: [
            { text: "Dante Alighieri", correct: false},
            { text: "Francesco Petrarch", correct: true},
            { text: "Giotto Di Bondone", correct: false},
            { text: "Leonardo Da Vinci", correct: false},
        ]
    },
    {
        question: "Where was the birthplace of the Renaissance?",
        answers: [
            { text: "Florence, Italy", correct: true},
            { text: "Paris, France", correct: false},
            { text: "Berlin, Germany", correct: false},
            { text: "Madrid, Spain", correct: false},
        ]
    },
    {
        question: "Which of the Four Canonical Painting Modes emphasized light and shadow?",
        answers: [
            { text: "Unione", correct: false},
            { text: "Cangiante", correct: false},
            { text: "Chiaroscuro", correct: true},
            { text: "Sfumato", correct: false},
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
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }); 
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
        length}!`;
        nextButton.innerHTML = "play Again";    
        nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click",()=> {
   if(currentQuestionIndex < questions.length) {
        handleNextButton();
   } else{
        startQuiz();
   }
});

startQuiz();

// Hi Ma'am, I used a youtube video to help me code this. Reference:
// GreatStack. (2023, March 15). How To Make Quiz App Using Javascript
//   | Build Quiz App With HTML CSS & Javascript [Video]. 
//   https://www.youtube.com/watch?v=PBcqGxrr9g8.