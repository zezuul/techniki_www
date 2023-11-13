const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const adminPanelContainer = document.getElementById("admin-panel-container");
const loginContainer = document.getElementById("admin-login-container");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "admin" && password === "admin1") {
        alert("Welcome to admin panel.");
        loginContainer.style.display = "none";
        adminPanelContainer.style.display = "block";
        loadScoreboard()
            .then(scores => {
            showScoreboard(scores);
        });
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

async function loadScoreboard() {
    try {
        const response = await fetch('http://localhost:5000/scoreboard');
        if (response.ok) {
            const scoreboardData = await response.json();
            return scoreboardData;
        } else {
            throw new Error('Failed to fetch scoreboard data');
        }
    } catch (error) {
        console.error('Error loading scoreboard:', error);
        return [];
    }
}

function showScoreboard(scores) {
    const scoreboardElement = document.getElementById('scoreboard');
    scoreboardElement.innerHTML = '';

    // sort and cut to top 10 scores
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10);
    let i = 1;

    topScores.forEach(score => {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `${i}. ${score.username}, Score: ${score.score}`;
        scoreboardElement.appendChild(scoreElement);
        i++;
    });
}

document.getElementById("add-question-button").addEventListener("click", async (e) => {
    e.preventDefault();
  
    const questionText = document.getElementById("question-text").value;
    const answers = [];
    for (let i = 1; i <= 4; i++) {
        const answerInput = document.getElementById(`answer${i}`);
        const answerValue = answerInput.value;
        const isCorrect = answerInput.getAttribute('data-is-correct') === 'true';
        answers.push([answerValue, isCorrect]);
    }
  
    try {
        await addQuestionwithAnswersForm(questionText, answers);
        document.getElementById("add-question-with-answers-form").reset();
    } catch (error) {
        console.error('Error adding question with answers:', error);
    }
});

// Answers onclick
for (let i = 1; i <= 4; i++) {
    const answerInput = document.getElementById(`answer${i}`);
  
    answerInput.addEventListener("click", () => {
      for (let j = 1; j <= 4; j++) {
        const otherAnswerInput = document.getElementById(`answer${j}`);
        otherAnswerInput.classList.remove('clicked');
        otherAnswerInput.setAttribute('data-is-correct', 'false');
      }
      answerInput.classList.add('clicked');
      answerInput.setAttribute('data-is-correct', 'true');
    });
}

async function addQuestionwithAnswersForm(question_text, answers) {
  try {
      console.log(question_text, answers);
      const response = await fetch('http://localhost:5000/questions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question_text, answers }),
      });

      if (response.ok) {
          const newQuestion = await response.json();
          return newQuestion;
      } else {
          throw new Error('Failed to add question with answers');
      }
  } catch (error) {
      throw error;
  }
}