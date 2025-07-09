// auth.js

document.addEventListener("DOMContentLoaded", () => {
  // SIGNUP
  const signupForm = document.querySelector(".signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      // Get users from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      if (users.find((user) => user.email === email)) {
        alert("Email already registered.");
        return;
      }

      // Save new user
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account created! Redirecting to login...");
      window.location.href = "login.html";
    });
  }

  // LOGIN
  const loginForm = document.querySelector(".auth-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => (u.email === email || u.username === email) && u.password === password
      );

      if (!user) {
        alert("Invalid login credentials.");
        return;
      }

      // Save current user session (optional)
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      alert(`Welcome ${user.username}!`);
      window.location.href = "index.html"; // redirect to home/dashboard
    });
  }
});
