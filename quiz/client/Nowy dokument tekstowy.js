// Definicja listy pytań i odpowiedzi
const questions = [
    {
        question: "pytanie 1",
        options: [
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "tak", correct: true }
        ]
    },
    {
        question: "pytanie 2",
        options: [
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "tak", correct: true }
        ]
    },
    {
        question: "pytanie 3",
        options: [
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "nie", correct: false },
            { text: "tak", correct: true }
        ]
    },
];

// Inicjalizacja zmiennych
let currentQuestion = 0; // Indeks bieżącego pytania
let score = 0; // Liczba punktów
let rightAnswer = false; // Flaga określająca poprawność ostatniej odpowiedzi

// Funkcja rozpoczynająca quiz
function startQuiz(){
    // Można umieścić kod inicjalizacyjny tutaj
}

// Funkcja sprawdzająca udzieloną odpowiedź
function checkAnswer(option) {
    rightAnswer = false; // Zaczynamy od założenia, że odpowiedź jest niepoprawna

    const selectedAnswer = option.textContent; // Wybrana odpowiedź
    const correct = questions[currentQuestion].options.filter(opt => opt.correct)[0].text; // Poprawna odpowiedź na bieżące pytanie

    if (selectedAnswer === correct) { // Sprawdzenie poprawności odpowiedzi
        rightAnswer = true; // Ustawienie flagi na "prawda", jeśli odpowiedź jest poprawna
    }

    option.classList.add('answered'); // Dodanie klasy CSS do oznaczenia odpowiedzi jako udzielona

    const options = document.querySelectorAll('.option'); // Znalezienie wszystkich opcji
    options.forEach(otherOption => {
        if (otherOption !== option) {
            otherOption.classList.add('clicked'); // Usunięcie klasy CSS 'clicked' z innych odpowiedzi
        }
    });
    option.classList.add('clicked'); // Dodanie klasy CSS 'clicked' do zaznaczonej odpowiedzi
}

// Funkcja przechodzenia do następnego pytania
function nextQuestion() {
    currentQuestion++; // Przejście do następnego pytania

    if (rightAnswer) { // Jeśli odpowiedź była poprawna, zwiększenie wyniku
        score++;
    }

    if (currentQuestion < questions.length) { // Jeśli są jeszcze pytania
        document.getElementById("question").textContent = (currentQuestion + 1) + ". " + questions[currentQuestion].question; // Wyświetlenie nowego pytania
        const options = document.getElementById("options"); // Znalezienie kontenera na odpowiedzi
        //options.innerHTML = ""; // Wyczyszczenie poprzednich odpowiedzi

        questions[currentQuestion].options.forEach(optionData => {
            const optionDiv = document.createElement("div"); // Tworzenie nowego elementu dla odpowiedzi
            optionDiv.className = "option"; // Dodanie klasy CSS dla odpowiedzi
            optionDiv.textContent = optionData.text; // Ustawienie tekstu odpowiedzi
            optionDiv.onclick = function () {
                checkAnswer(optionDiv); // Przypisanie zdarzenia kliknięcia, które sprawdza odpowiedź
            };
            options.appendChild(optionDiv); // Dodanie odpowiedzi do kontenera
        });
    } else { // Jeśli to ostatnie pytanie
        if(score == questions.length) {
            document.getElementById("result").classList.add("good"); // Dodanie klasy CSS dla doskonałego wyniku
        }
        if(score == 0) {
            document.getElementById("result").classList.add("bad"); // Dodanie klasy CSS dla złego wyniku
        }

        document.getElementById("result").style.display = "block"; // Wyświetlenie wyniku
        document.getElementById("score").textContent = score; // Wyświetlenie punktów
        document.getElementById("nextButton").style.display = "none"; // Ukrycie przycisku "Następne pytanie"
    }
}
