//array that stores all the questions and answers
const questions = [
    {
        question: "Who is the artist behind the Mona Lisa- one of the most famous paintings from the Renaissance?",
        image: "../../../../asset/mona-lisa.png",
        answers: [
            { text: "Donato di Niccolò di Betto Bardi", correct: false},
            { text: "Sandro Boticelli ", correct: false},
            { text: "Michelangelo Buonarroti", correct: false},
            { text: "Leonardo Da Vinci", correct: true},
        ]
    },
    {
        question: "Which French Renaissance painter is known for painting the portraits of the court, especially of Francis I?",
        image: "../../../../asset/artist-who2.png",
        answers: [
            { text: "Nicolas Poussin", correct: false},
            { text: "Jean Clouet", correct: true},
            { text: "Jacques-Louis David", correct: false},
            { text: "Simon Vouet", correct: false},
        ]
    },
    {
        question: "Which painter is associated with the style of elegant, elongated figures found in many rooms of the Château de Fontainebleau?",
        image: "../../../../asset/artist-who3.png",
        answers: [
            { text: "Jean Fouquet", correct: false},
            { text: "Antoine Caron", correct: false},
            { text: "Rosso Fiorentino", correct: true},
            { text: "Pierre Mignard", correct: false},
        ]
    },
    {
        question: "This artist was one of the greatest figures in the German Renaissance, and was especially influential in the art medium of Woodcut and Engraving. Who am I?",
        image: "../../../../asset/artist-who4.png",
        answers: [
            { text: "Georg Pencz", correct: false},
            { text: "Hans Holbein the Younger", correct: false},
            { text: "Albrecht Durer", correct: true},
            { text: "Christoph Weiditz", correct: false},
        ]
    },
    {
        //Albrecht Durer / Quentin Matsys / Hans Hemling / Hans Holbein the Younger
        question: "The Ambassadors,” with its well-known hidden  skull, was painted by who?",
        image: "../../../../asset/artist-who5.png",
        answers: [
            { text: "Albrecht Durer", correct: false},
            { text: "Quentin Matsys", correct: false},
            { text: "Hans Hemling", correct: false},
            { text: "Hans Holbein the Younger", correct: true},
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