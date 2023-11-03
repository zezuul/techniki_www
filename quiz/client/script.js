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

async function startQuiz() {
    loadQuestion()
    .then(data => {
    if (data) {
        showQuestion(data);
    } else {
        console.log('Error with loading data');
    }
    })
    .catch(error => {
    console.error(error);
    });
}

async function loadQuestion() {
    try {
        const response = await fetch('http://localhost:5000/questions'); //TODO
        const data = await response.json();
        console.log(data);
        //showQuestion(data);
        return data;
      } catch (error) {
        console.error('Error with loading the question', error);
      }
}

function showQuestion(data) {
    const questionDiv = document.getElementById('question');
    
    if (data.length > 0) {
      questionDiv.textContent = `1. ${data[0].question_text}`;
    }
    console.log('showQuestion()');
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