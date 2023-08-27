//Questions
const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What color is the Irish flag?',
        options: ['White & Orange', 'White & Green', 'Green, White & Orange', 'White & Red'],
        correctAnswer: 'Green, White & Orange'
    },
    {
        question: 'What ocean lies between Europe and The US?',
        options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
        correctAnswer: 'Atlantic'
    },
];

let currentQuestionIndex = 0;


//Add event listeners
// document.addEventListener("DOMContentLoaded", function () {
//     let buttons = document.getElementsByTagName("button");

//     for (let button of buttons) {
//         button.addEventListener(
//             "click", function () {
//                 if (this.getAttribute("data-type") === "submit") {
//                     alert("You clicked submit");
//                 } else {
//                     alert("Something else");
//                 }
//             }
//         );

//     }
// })


function runGameAsGuest() {

}

function runGameAsUser() {

}

function displayQuestion(index) {
    let currentQuestion = questions[index];
    let questionElement = document.getElementById('questionText');
    let optionsElement = document.getElementById('answerOptions');
    let resultElement = document.getElementById('result');

    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, idx) => {
        let button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.setAttribute('data-index', idx);
        button.onclick = function () {
            checkAnswer(this);
        };
        optionsElement.appendChild(button);
    });
}

function checkAnswer(button) {
    let selectedOptionIndex = button.getAttribute('data-index');
    let currentQuestion = questions[currentQuestionIndex];
    let resultElement = document.getElementById('result');
    let questionElement = document.getElementById('questionText');
    let optionsElement = document.getElementById('answerOptions');

    if (currentQuestion.options[selectedOptionIndex] === currentQuestion.correctAnswer) {
        resultElement.classList.toggle("show");
        resultElement.textContent = "Correct!";
        incrementCorrectScore();
    } else {
        //resultElement.textContent = 'Incorrect.';
        resultElement.classList.toggle("show");
        incrementIncorrectScore();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        questionElement.textContent = 'Trivia game finished!';
        optionsElement.innerHTML = '';
        resultElement.textContent = '';
    }
}

function incrementCorrectScore() {
    let oldScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++oldScore;
}

function incrementIncorrectScore() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function feedbackArea() {

}

displayQuestion(currentQuestionIndex);