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

    scores.forEach(score => {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `Username: ${score.username}, Score: ${score.score}`;
        scoreboardElement.appendChild(scoreElement);
    });
}