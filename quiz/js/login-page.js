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
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})