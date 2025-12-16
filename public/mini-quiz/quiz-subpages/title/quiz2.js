//array that stores all the questions and answers
const questions = [
    {
        question: "What is the English title of this painting: 'Amor Vincit Omnia' by Caravaggio?",
        image: "../../../../asset/title1.png",
        answers: [
            { text: "Victor's Cupid", correct: false},
            { text: "Cupid as Victor", correct: true},
            { text: "Angel of Victor", correct: false},
            { text: "Victor's Angel", correct: false},
        ]
    },
    {
        question: "What is the title of this painting made by Albrecht Durer?",
        image: "../../../../asset/title2.png",
        answers: [
            { text: "The Bunny", correct: false},
            { text: "The Hare", correct: true},
            { text: "Hase", correct: true},
            { text: "Rabbit", correct: false},
        ]
    },
    {
        question: "What is the title of this painting made by Raphael?",
        image: "../../../../asset/title3.png",
        answers: [
            { text: "Madonna of the Golden Angel", correct: false},
            { text: "Madonna of the Golden Light", correct: false},
            { text: "Modonna of the Goldfish", correct: false},
            { text: "Madonna of the Goldfinch", correct: true},
        ]
    },
    {
        question: "What is the title of this painting made by Raphael?",
        image: "../../../../asset/title4.png",
        answers: [
            { text: "Saint Catherine of Athens", correct: false},
            { text: "Saint Catherine of Alexandria", correct: true},
            { text: "Saint Catherine of Siena", correct: false},
            { text: "Saint Catherine of Bologna", correct: false},
        ]
    },
    {
        //Albrecht Durer / Quentin Matsys / Hans Hemling / Hans Holbein the Younger
        question: "What is the title of this painting made by Caravaggio?",
        image: "../../../../asset/title5.png",
        answers: [
            { text: "The Burial of Christ", correct: false},
            { text: "The Resurrection of Christ", correct: false},
            { text: "The Sacrifice of Christ", correct: false},
            { text: "The Entombment of Christ", correct: true},
        ]
    }
];

//get HTML elements by their IDs
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionImage = document.getElementById("question-img");

//Variables that will track current question and score
let currentQuestionIndex = 0;
let score = 0;

//starts or restarts the quiz
function startQuiz(){
    currentQuestionIndex = 0; //reset question number
    score = 0; //reset score
    nextButton.innerHTML = "NEXT";
    showQuestion(); //display first question
}

//displays the current question and answer choices
function showQuestion(){
    resetState(); //clear previous question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    //show question number and text
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    //create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        // Show image 
        if (currentQuestion.image) {
            questionImage.src = currentQuestion.image;
            questionImage.style.display = "block";
        } else {
            questionImage.style.display = "none";
        }
        
        //Mark correct answer
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        //add click event to answer buttons
        button.addEventListener("click", selectAnswer);
    }); 
}

//reset the answer buttons and hides the next button
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// runs when answer it selected
function selectAnswer(e) {
    const selectedBtn = e.target;
    //if correct, score will increase
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }

    //show correct answer and disable all buttons after answering the question
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    //show the next buttom
    nextButton.style.display = "block";
}

//displays final score in the end
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
        length}!`;
        nextButton.innerHTML = "PLAY AGAIN";    
        nextButton.style.display = "block";
        questionImage.style.display = "none";
}

//handles moving to the next question
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else{
        showScore();
    }
}

//event listener for the next button
nextButton.addEventListener("click",()=> {
   if(currentQuestionIndex < questions.length) {
        handleNextButton();
   } else{
        startQuiz();
   }
});

//start quiz when page loads
startQuiz();

// Hi Ma'am, I used a youtube video to help me code this. Reference:
// GreatStack. (2023, March 15). How To Make Quiz App Using Javascript
//   | Build Quiz App With HTML CSS & Javascript [Video]. 
//   https://www.youtube.com/watch?v=PBcqGxrr9g8.