async function getLastQuestionId() {
    try {
      const response = await fetch('http://localhost:5000/lastQuestionId');
      const lastQuestionId = await response.json();
      return lastQuestionId;
    } catch (error) {
      console.error('Error fetching last question ID', error);
      throw error;
    }
  }

async function loadQuestion(id) {
    try {
        const questionResponse = await fetch(`http://localhost:5000/questions/${id}`);
        const questionData = await questionResponse.json();
        console.log(questionData);

        const optionResponse = await fetch(`http://localhost:5000/answers/${id}`); 
        const answerData = await optionResponse.json();
        console.log(answerData);
        
        return [questionData, answerData];
      } catch (error) {
        console.error('Error with loading the question', error);
      }
}

let currentQuestion = 0;
let score = 0;
let rightAnswer = false;

function checkAnswer(option, correct) {
    rightAnswer = false;

    if (correct === 1) {
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

async function saveUserResult() {
    try {
        const userResult = {
            username: user,
            score: score,
        };

        await fetch('http://localhost:5000/saveUserResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userResult),
        });
        // Download score
        /*const userResultJSON = JSON.stringify(userResult);
        const blob = new Blob([userResultJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user_result.json";
        a.click();
        URL.revokeObjectURL(url);*/
    } catch (error) {
        console.error('Error saving user result', error);
    }
}

let askedQuestions = [];

async function nextQuestion() {
    currentQuestion++;
    if (rightAnswer) {
        score++;
    }
    if (currentQuestion <= 10) {
        try {
            let randomQuestionId;

            // generating random question until an unused one is found
            do {
                randomQuestionId = Math.floor(Math.random() * lastQuestionId) + 1;
            } while (askedQuestions.includes(randomQuestionId));

            askedQuestions.push(randomQuestionId); // Mark question as asked

            const [questionData, optionsData] = await loadQuestion(randomQuestionId);

            document.getElementById('question').textContent = (currentQuestion) + ". " + `${questionData.question_text}`;

            const options = document.getElementById("options");
            options.innerHTML = "";

            optionsData.forEach(optionData => {
                const optionDiv = document.createElement("div");
                optionDiv.className = "option";
                optionDiv.textContent = optionData.answer_text;
                const correct = optionData.is_correct;
                optionDiv.onclick = function () {
                    checkAnswer(optionDiv, correct);
                };
                options.appendChild(optionDiv);
            });
        } catch (error) {
            console.error('Error loading next question', error);
        }
    } else {
        if (score == 10) {
            document.getElementById("result").classList.add("good");
        }
        if (score == 0) {
            document.getElementById("result").classList.add("bad");
        }
        document.getElementById("question-container").style.display = "none";

        // Show the result container
        document.getElementById("result").style.display = "block";
        document.getElementById("score").textContent = score;
        document.getElementById("nextButton").style.display = "none";

        saveUserResult();
    }
}



function showAdminLogin() {
    window.location.href = "admin.html";
}

function saveUser(user){

}

function showAdminLogin() {
    window.location.href = "admin.html";
}

let lastQuestionId;

async function showQuiz() {
    lastQuestionId = await getLastQuestionId();
    const username = document.getElementById("username").value.trim();
    
    if (username === "") {
        alert("Please enter a username before proceeding.");
        return;
    } else {
        user = username;
    }
  
    document.querySelector("label[for='username']").style.display = "none";
    document.getElementById("username").style.display = "none";
    document.getElementById("showQuizButton").style.display = "none";
  
    document.getElementById("nextButton").style.display = "block";
    nextQuestion();
}