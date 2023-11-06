const questions = [
    {
        question: "W jakiej technologii zwykle tworzone są strony statyczne?",
        options: [
            { text: "ttJavaScript/TypeScript", correct: false },
            { text: "ttPHP", correct: false },
            { text: "ttJSP", correct: false },
            { text: "ttCSS", correct: true }
        ]
    },
    {
        question: "Czym jest URL?",
        options: [
            { text: "ttumożliwia jednoznaczne określenie oraz identyfikację zasobu", correct: false },
            { text: "umożliwia jednoznaczne określenie lokalizacji zasobu", correct: true },
            { text: "umożliwia jednoznaczne określenie nazwy dla danego zasobu", correct: false },
            { text: "ciąg znaków bez narzuconej z góry struktury", correct: false }
        ]
    },
    {
        question: "Co nie jest metodą protokołu HTTP?",
        options: [
            { text: "HEAD", correct: false },
            { text: "GET", correct: false },
            { text: "DUPLICATE", correct: true },
            { text: "POST", correct: false }
        ]
    },
    {
        question: "HTTPS - zaznacz fałszywe",
        options: [
            { text: "Wersja szyfrowana protokołu HTTP oparta o protokół szyfrujący SSL", correct: false },
            { text: "Wymiana danych w tym protokole zapobiega przechwyceniu oraz zmianie danych w trakcie komunikacji klient-serwer", correct: false },
            { text: "SSL działa warstwę niżej w modelu OSI od samego HTTPS ", correct: true },
            { text: "Domyślnym portem na których serwer nasłuchuje żądań HTTPS to 443", correct: false }
        ]
    },
    {
        question: "Kod stanu serwera jest podawana w nagłówku HTTP/HTTPS w postaci liczby",
        options: [
            { text: "jednocyfrowej", correct: false },
            { text: "dwucyfrowej", correct: false },
            { text: "trzycyfrowej", correct: true },
            { text: "czterocyfrowej", correct: false }
        ]
    },
    {
        question: "Co oznacza kod 404?",
        options: [
            { text: "wewnętrzny błąd serwera", correct: false },
            { text: "konflikt", correct: false },
            { text: "Nie znaleziono", correct: true },
            { text: "niepoprawne zapytanie", correct: false }
        ]
    },
    {
        question: "Statyczna strona WWW - zaznacz fałszywe",
        options: [
            { text: "użytkownik nie posiadający wiedzy na temat struktury strony nie jest w stanie zmienić zawartości strony", correct: false },
            { text: "zawiera w kodzie dane, które są wyświetlane w przeglądarce", correct: false },
            { text: "zawartość strony może zmienić się pod wpływem interakcji z użytkownikiem", correct: true },
            { text: "każda zmiana danych wymaga ingerencji programisty w kod strony", correct: false }
        ]
    },
    {
        question: "Kod wykonywany po stronie serwera?",
        options: [
            { text: "front-end", correct: false },
            { text: "back-end", correct: true },
        ]
    },
    {
        question: "Znacznik - zaznacz fałszywe",
        options: [
            { text: "tekst umieszczony pomiędzy znakiem większości i znakiem mniejszości", correct: false },
            { text: "odnosi się do klasyfikowania informacji", correct: false },
            { text: "klasyfikacja polega na umieszczeniu tekstu pomiędzy znacznikiem otwierającym i znacznikiem zamykającym", correct: false },
            { text: "tekst umieszczony pomiędzy znakami #", correct: true }
        ]
    },
    {
        question: "Co nie jest tagiem w HTML?",
        options: [
            { text: "<head>", correct: false },
            { text: "<a>", correct: false },
            { text: "<site> ", correct: true },
            { text: "<div>", correct: false }
        ]
    },
]; //TODO: delete above questions

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

function nextQuestion() {
    currentQuestion++;
    if (rightAnswer) {
        score++;
    }
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion)
        .then(([questionData, optionsData]) => {
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
        })
        .catch(error => {
            console.error('Error loading next question', error);
        });
    } else {
        if (score == questions.length) {
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

function showQuiz() {
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