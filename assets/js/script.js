//Questions array for the trivia game
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

/*Declare currentQuestionIndex variable that will help to start the game from index 0 in the questions array
**and be used for comparison and incrememt to move to next question
*/
let currentQuestionIndex = 0;

/**
 * Listerners for all buttons on the page
 */
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    console.log(buttons);

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "start-guest") {
                displayQuestion(currentQuestionIndex);
                hideElement('start-menu');
                hideElement('popup');
                unhideElement('game-container');
                console.log(buttons);
            } else if (this.getAttribute("data-type") === "start-user") {
                alert("Create user function");
            } else if (this.getAttribute("data-type") === "feedbackButton") {
                unhideElement("feedback-view");
            }
            //else if (this.getAttribute("data-type") === "response") {
            //     checkAnswer(this);
            // } 
            else if (this.getAttribute("data-type") === "close-popup") {
                hideElement('popup');
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    hideElement('game-container');
                    questionElement.textContent = 'Trivia game finished!';
                    optionsElement.innerHTML = '';
                    resultElement.textContent = '';
                }
            } else {
                alert('Something went wrong!');
            }
        }
        );

    }

    // Add event listener for the close button of the popup
    // document.getElementById('closePopup').addEventListener('click', function () {
    //     hideElement('popup');
    //     currentQuestionIndex++;
    //     if (currentQuestionIndex < questions.length) {
    //         displayQuestion(currentQuestionIndex);
    //     } else {
    //         hideElement('game-container');
    //         questionElement.textContent = 'Trivia game finished!';
    //         optionsElement.innerHTML = '';
    //         resultElement.textContent = '';
    //     }
    // });
})


function runGameAsGuest() {

}

function runGameAsUser() {

}

/**
 * Creates the question element and replaces its content by a question from the questions array
 * Sets button's .onclick event calls the checkAnswer() function
 * @param {int} index 
 */
function displayQuestion(index) {
    let currentQuestion = questions[index];
    let questionElement = document.getElementById('questionText');
    let optionsElement = document.getElementById('answerOptions');

    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, idx) => {
        let button = document.createElement('button');
        button.textContent = option;
        button.className = 'button';
        button.setAttribute('data-index', idx);
        button.setAttribute('data-type', 'response');
        button.onclick = function () {
            hideElement('popup');
            checkAnswer(this);
        };
        optionsElement.appendChild(button);
    });
}

/**
 * Validates selected answer comparing with correct answer stored in the questions array
 * Increments the currentQuestionIndex to move to next question
 * Displays all questions from the array or a "Trivia game finished" message if there are no more questions
 * @param {int} button 
 */
function checkAnswer(button) {
    let selectedOptionIndex = button.getAttribute('data-index');
    let currentQuestion = questions[currentQuestionIndex];
    let resultElement = document.getElementById('result');
    let questionElement = document.getElementById('questionText');
    let optionsElement = document.getElementById('answerOptions');

    if (currentQuestion.options[selectedOptionIndex] === currentQuestion.correctAnswer) {
        // resultElement.textContent = "Correct!";
        // unhideElement('result');
        document.getElementById('popupMessage').textContent = "Correct!";
        unhideElement('popup');
        incrementCorrectScore();
    } else {
        // resultElement.textContent = 'Incorrect.';
        // unhideElement('result');
        document.getElementById('popupMessage').textContent = 'Incorrect.';
        unhideElement('popup');
        incrementIncorrectScore();
    }

    // currentQuestionIndex++;

    // if (currentQuestionIndex < questions.length) {
    //     displayQuestion(currentQuestionIndex);
    // } else {
    //     questionElement.textContent = 'Trivia game finished!';
    //     optionsElement.innerHTML = '';
    //     resultElement.textContent = '';
    // }
}

/**
 * Increments the correct score by 1
 */
function incrementCorrectScore() {
    let oldScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++oldScore;
}

/**
 * Increments the incorrect score by 1
 */
function incrementIncorrectScore() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

/**
 * Hide elements by Id
 */
function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

/**
 * Unhide elements by Id
 */
function unhideElement(id) {
    document.getElementById(id).style.display = "block";
}