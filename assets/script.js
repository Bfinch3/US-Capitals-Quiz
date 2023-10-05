// Set Variables
var startQuizBtn = document.querySelector('.startQuiz');
var timer = document.querySelector('.timer');
var timerCount = 60;
var timerElement = document.querySelector('.timer-count');
var startButton = document.querySelector('.start-button');
var header = document.querySelector('.welcome');
var buttonAnswer1 = document.createElement('button');
buttonAnswer1.textContent = 'Answer 1'
var buttonAnswer2 = document.createElement('button');
buttonAnswer2.textContent = 'Answer 2'
var buttonAnswer3 = document.createElement('button');
buttonAnswer3.textContent = 'Answer 3'
var buttonAnswer4 = document.createElement('button');
buttonAnswer4.textContent = 'Answer 4'
var quizSection = document.querySelector('.quiz');
var startParagraph = document.querySelector('.start')
var questionNumer = 0;
var divinput = document.querySelector('.input-group')
var scoreSave = document.querySelector('.score')
var input = document.querySelector('input.form-control')
var scoreGlobal, nameGlobal;
var submitButton = document.querySelector('#submit')
var highScoreDisplay = document.querySelector('.highScore')
var newTable = document.querySelector('table')
var endButtons = document.querySelector('.restartBtn')

// Starts timer countdown
function startTimer() {
    timerInterval = setInterval(function () {
        timerCount--;
        timer.textContent = timerCount;
        if (timerCount === 0) {
            //submit 0 score
            results(0);
            // Clears interval
            clearInterval(timerInterval);
        }
    }, 1000);
}
startQuizBtn.addEventListener('click', function () {
    //Removed Start Button once clicked
    startQuizBtn.style.display = 'none'
    //Added Timer at the top of the page
    timer.textContent = timerCount;
    //Start Timer
    startTimer()
    //Start Quiz
    quiz()
});
// Listens for click on buttons with IDs
document.addEventListener('click', function (event) {
    switch (event.target.id) {
        case 'a1':
            answer(questions[questionNumer].a[0].isCorrect)
            break;
        case 'a2':
            answer(questions[questionNumer].a[1].isCorrect)
            break;
        case 'a3':
            answer(questions[questionNumer].a[2].isCorrect)
            break;
        case 'a4':
            answer(questions[questionNumer].a[3].isCorrect)
            break;
        case 'submit':
            nameGlobal = document.querySelector('input[name="initials"]').value
            displayTable();
            break;
        case 'reset':
            localStorage.removeItem('score')
            newTable.innerHTML = "<thread><th>Initials</th><th>Score</th></thread>"
            break;
        case 'restart':
            questionNumer = 0;
            timerCount = 60;
            endButtons.style.display = 'none'
            highScoreDisplay.style.display = 'none'
            quizSection.style.display = 'block'
            timer.style.display = 'block'
            startTimer()
            quiz();
            break;
    }
})
//Displays the questions and answers
function quiz() {
    quizSection.textContent = questions[questionNumer].q;
    quizSection.appendChild(buttonAnswer1)
    quizSection.appendChild(buttonAnswer2)
    quizSection.appendChild(buttonAnswer3)
    quizSection.appendChild(buttonAnswer4)
    buttonAnswer1.id = 'a1'
    buttonAnswer2.id = 'a2'
    buttonAnswer3.id = 'a3'
    buttonAnswer4.id = 'a4'
    buttonAnswer1.textContent = questions[questionNumer].a[0].text;
    buttonAnswer2.textContent = questions[questionNumer].a[1].text;
    buttonAnswer3.textContent = questions[questionNumer].a[2].text;
    buttonAnswer4.textContent = questions[questionNumer].a[3].text;
}
// If statements for time deduction for incorrect answers. Clears the timer and sets vaiable for score.
function answer(result) {
    if (!result) {
        timerCount = timerCount - 10;
    };
    questionNumer++
    if (questionNumer < questions.length) {
        quiz()
    } else {
        var score = timerCount;
        clearInterval(timerInterval)
        results(score)
    }
}
// Hides the quiz, displays the score and displays input and reset and restart buttons.
function results(score) {
    timer.style.display = 'none'
    quizSection.style.display = 'none'
    divinput.style.display = 'block'
    scoreGlobal = score
    scoreSave.textContent = `${score} is your score`
}

//Inline if statement on the high score if local storage is empty
function displayTable() {
    var highScore = JSON.parse(localStorage.getItem('score')) != null ? JSON.parse(localStorage.getItem("score")) : [];
    var obj = {};
    obj["name"] = nameGlobal;
    obj["score"] = scoreGlobal;
    highScore.push(obj)
    divinput.style.display = 'none'
    newTable.innerHTML = "<thread><th>Initials</th><th>Score</th></thread>"
    // Created table for high scores, that adds all new initals and scores.
    for (scores of highScore) {
        const newRow = document.createElement('tr')
        const tdInitial = document.createElement('td')
        const tdScore = document.createElement('td')
        tdInitial.textContent = scores.name
        tdScore.textContent = scores.score
        newRow.appendChild(tdInitial)
        newRow.appendChild(tdScore)
        newTable.appendChild(newRow)
    }
    // Stores the high scores in local storage.
    highScoreDisplay.style.display = 'block'
    localStorage.setItem('score', JSON.stringify(highScore))
    endButtons.style.display = 'block'
}

//Questions that will be asked
var questions = [{
    q: "What is the capital of Texas?",
    a: [{ text: "San Antonio", isCorrect: false },
    { text: "Houston", isCorrect: false },
    { text: "Austin", isCorrect: true },
    { text: "Dallas", isCorrect: false }

    ]
},
{
    q: "What is the capital of California",
    a: [{ text: "Los Angeles", isCorrect: false },
    { text: "Scaramento", isCorrect: true },
    { text: "San Francisco", isCorrect: false },
    { text: "San Diego", isCorrect: false }
    ]
},
{
    q: "What is the capital of New York?",
    a: [{ text: "Albany", isCorrect: true },
    { text: "New York", isCorrect: false },
    { text: "Buffalo", isCorrect: false },
    { text: "Rochester", isCorrect: false }
    ]
},

{
    q: "What is the capital of Florida?",
    a: [{ text: "Miami", isCorrect: false },
    { text: "Orlando", isCorrect: false },
    { text: "Tallahassee", isCorrect: true },
    { text: "Tampa", isCorrect: false }

    ]
}]