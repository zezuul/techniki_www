const questions = [
    {
        question: "W jakiej technologii zwykle tworzone są strony statyczne?",
        options: [
            { text: "JavaScript/TypeScript", correct: false },
            { text: "PHP", correct: false },
            { text: "JSP", correct: false },
            { text: "CSS", correct: true }
        ]
    },
    {
        question: "Czym jest URL?",
        options: [
            { text: "umożliwia jednoznaczne określenie oraz identyfikację zasobu", correct: false },
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
];

let currentQuestion = 0;
let score = 0;
let rightAnswer = false;

function startQuiz() {


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
        if (score == questions.length) {
            document.getElementById("result").classList.add("good");
        }
        if (score == 0) {
            document.getElementById("result").classList.add("bad");
        }
        document.getElementById("result").style.display = "block";
        document.getElementById("score").textContent = score;
        document.getElementById("nextButton").style.display = "none";
    }
}

function showAdminLogin() {
    window.location.href = "admin.html";
}