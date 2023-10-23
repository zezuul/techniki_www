const questions = [
    {
        question: "pytanie",
        options: [
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "tak", correct: true }
        ]
    },
    {
        question: "pytanie",
        options: [
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "tak", correct: true }
        ]
    },
    {
        question: "pytanie",
        options: [
        { text: "nie", correct: false },
        { text: "nie", correct: false },
        { text: "nie", correct: false },
        { text: "tak", correct: true }
        ]
    },
];

let currentQuestion = 0;
let score = 0;
let rightAnswer = false;

function startQuiz(){

    
}

function checkAnswer(option) {
    rightAnswer = false;

    const selectedAnswer = option.textContent;
    const correct = questions[currentQuestion].options.filter(opt => opt.correct)[0].text;

    if (selectedAnswer === correct) {
        rightAnswer = true;
    }
    option.classList.add('answered');

    const options = document.querySelectorAll('.option');
    options.forEach(otherOption => {
        if (otherOption !== option) {
            otherOption.classList.remove('clicked');  
        }
    });
    option.classList.add('clicked');
}


function nextQuestion() {
    currentQuestion++;
    if (rightAnswer) {
        score++;
    }
    if (currentQuestion < questions.length) {
        document.getElementById("question").textContent = (currentQuestion + 1) + ". " + questions[currentQuestion].question;
        const options = document.getElementById("options");
        options.innerHTML = "";
        questions[currentQuestion].options.forEach(optionData => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";
            optionDiv.textContent = optionData.text;
            optionDiv.onclick = function () {
                checkAnswer(optionDiv);
            };
            options.appendChild(optionDiv);
        });
    } else {
        if(score == questions.length) {
            document.getElementById("result").classList.add("good");
        }
        if(score == 0) {
            document.getElementById("result").classList.add("bad");
        }
        document.getElementById("result").style.display = "block";
        document.getElementById("score").textContent = score;
        document.getElementById("nextButton").style.display = "none";
    }
}