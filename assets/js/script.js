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

/**
 * Declare currentQuestionIndex variable that will help to start the game from index 0 in the questions array
 * and be used for comparison and incrememt to move to next question
 */
let currentQuestionIndex = 0;

/**
 * Listerners for all buttons on the page
 * Compare the data-type attribute of the button and call the appropriate function
 */
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    let questionElement = document.getElementById('questionText');
    let clickState = 0;

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "start-guest") {
                displayQuestion(currentQuestionIndex);
                hideElement('start-menu');
                hideElement('popup');
                unhideElement('game-container');
            } else if (this.getAttribute("data-type") === "start-user") {
                alert("Create user function");
            } else if (this.getAttribute("data-type") === "feedbackButton") {
                if (clickState == 0) {
                    unhideElement("feedback-view");
                    clickState++;
                } else {
                    hideElement("feedback-view");
                    clickState = 0;
                }

            } else if (this.getAttribute("data-type") === "close-popup") {
                hideElement('popup');
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    displayQuestion(currentQuestionIndex);
                } else {
                    let result = calculateScore();
                    let finalResult = document.getElementById('final-result');
                    hideElement('answerOptions');
                    questionElement.textContent = 'Trivia game finished!';
                    finalResult.textContent = result;
                    unhideElement('final-result');
                    unhideElement('new-game');
                }
            } else if (this.getAttribute("data-type") === 'new-game') {
                currentQuestionIndex = 0;
                hideElement('new-game');
                hideElement('final-result');
                document.getElementById('answerOptions').style.display = 'flex';
                document.getElementById('correct').textContent = 0;
                document.getElementById('incorrect').textContent = 0;
                displayQuestion(currentQuestionIndex);
            } else {
                alert('Something went wrong!');
            }
        }
        );

    }
})

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
 * @param {int} button 
 */
function checkAnswer(button) {
    let selectedOptionIndex = button.getAttribute('data-index');
    let currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.options[selectedOptionIndex] === currentQuestion.correctAnswer) {
        document.getElementById('popupMessage').textContent = 'Correct!!';
        document.getElementById('popup-image').src = './assets/images/correct.png';
        unhideElement('popup');
        incrementCorrectScore();
    } else {
        document.getElementById('popupMessage').textContent = 'Incorrect';
        document.getElementById('popup-image').src = './assets/images/incorrect.png';
        unhideElement('popup');
        incrementIncorrectScore();
    }
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
 * Calculates if the number of correct answers is higher than incorrect and sets the response text
 * @returns String WON or LOST
 */
function calculateScore() {
    let correct = parseInt(document.getElementById('correct').textContent);
    let incorrect = parseInt(document.getElementById('incorrect').textContent);
    if (correct > incorrect) {
        return 'YOU WON!!! :D';
    } else {
        return 'YOU LOST... :(';
    }
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