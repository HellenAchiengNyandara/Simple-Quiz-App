// DOM Elements
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

// Quiz Questions
const questions = [{
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "style", correct: true },
            { text: "class", correct: false },
            { text: "styles", correct: false },
            { text: "font", correct: false },
        ],
    },
    {
        question: "In HTML5, which element is used to specify navigation links?",
        answers: [
            { text: "<nav>", correct: true },
            { text: "<navigation>", correct: false },
            { text: "<navlink>", correct: false },
            { text: "<section>", correct: false },
        ],
    },
    {
        question: "Which HTML attribute is used to define the **alternative text** for an image?",
        answers: [
            { text: "alt", correct: true },
            { text: "title", correct: false },
            { text: "src", correct: false },
            { text: "caption", correct: false },
        ],
    },
    {
        question: "What is the correct way to create an HTML hyperlink?",
        answers: [
            { text: "<a href='http://example.com'>Link</a>", correct: true },
            { text: "<link src='http://example.com'>Link</link>", correct: false },
            { text: "<a src='http://example.com'>Link</a>", correct: false },
            { text: "<a link='http://example.com'>Link</a>", correct: false },
        ],
    },
    {
        question: "What is the purpose of the `<aside>` element in HTML5?",
        answers: [
            { text: "To contain content tangentially related to the content around it", correct: true },
            { text: "To define a header for a document or section", correct: false },
            { text: "To define navigation links", correct: false },
            { text: "To create a footer for a document or section", correct: false },
        ],
    },
    {
        question: "Which HTML element is used to define **important** text?",
        answers: [
            { text: "<strong>", correct: true },
            { text: "<important>", correct: false },
            { text: "<bold>", correct: false },
            { text: "<em>", correct: false },
        ],
    },


];

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

// Start Quiz Function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    nextButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

// Show Question
function showQuestion(question) {
    resetState();
    questionElement.textContent = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the state of answer buttons
function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Select Answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    nextButton.classList.remove('hidden');
}

// Set Status Class
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear Status Class
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Show next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
});

// Show Result
function showResult() {
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `${score}/${questions.length}`;
    nextButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
}

// Restart Quiz
restartButton.addEventListener('click', startQuiz);