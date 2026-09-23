
// validation.js

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements:
// At least 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one number
// At least one special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;


// ========================================
// HELPER FUNCTIONS
// ========================================

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");

  if (error) {
    error.textContent = message;
  }

  input.classList.add("border-red-500");
  input.classList.remove("border-green-500");
}


function showSuccess(input) {
  const error = input.parentElement.querySelector(".error");

  if (error) {
    error.textContent = "";
  }

  input.classList.remove("border-red-500");
  input.classList.add("border-green-500");
}


function isEmpty(value) {
  return value.trim() === "";
}


// ========================================
// SIGNUP VALIDATION
// ========================================

function validateSignup() {

  const name = document.querySelector("#name");
  const email = document.querySelector("#signupEmail");
  const password = document.querySelector("#signupPassword");
  const confirmPassword = document.querySelector("#confirmPassword");

  let valid = true;


  // NAME
  if (isEmpty(name.value)) {

    showError(name, "Name is required.");
    valid = false;

  } else if (name.value.trim().length < 2) {

    showError(name, "Name must contain at least 2 characters.");
    valid = false;

  } else {

    showSuccess(name);

  }


  // EMAIL
  if (isEmpty(email.value)) {

    showError(email, "Email is required.");
    valid = false;

  } else if (!emailRegex.test(email.value.trim())) {

    showError(email, "Enter a valid email address.");
    valid = false;

  } else {

    showSuccess(email);

  }


  // PASSWORD
  if (isEmpty(password.value)) {

    showError(password, "Password is required.");
    valid = false;

  } else if (!passwordRegex.test(password.value)) {

    showError(
      password,
      "Password must be 8+ characters with uppercase, lowercase, number and symbol."
    );

    valid = false;

  } else {

    showSuccess(password);

  }


  // CONFIRM PASSWORD
  if (isEmpty(confirmPassword.value)) {

    showError(confirmPassword, "Please confirm your password.");
    valid = false;

  } else if (password.value !== confirmPassword.value) {

    showError(confirmPassword, "Passwords do not match.");
    valid = false;

  } else {

    showSuccess(confirmPassword);

  }


  return valid;
}


// ========================================
// LOGIN VALIDATION
// ========================================

function validateLogin() {

  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");

  let valid = true;


  // EMAIL
  if (isEmpty(email.value)) {

    showError(email, "Email is required.");
    valid = false;

  } else if (!emailRegex.test(email.value.trim())) {

    showError(email, "Enter a valid email address.");
    valid = false;

  } else {

    showSuccess(email);

  }


  // PASSWORD
  if (isEmpty(password.value)) {

    showError(password, "Password is required.");
    valid = false;

  } else {

    showSuccess(password);

  }


  return valid;
}


// ========================================
// SIGNUP → BACKEND
// ========================================

const signupForm = document.querySelector("#signupForm");

if (signupForm) {

  signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // First validate the frontend
    if (!validateSignup()) {
      return;
    }


    // Get form values
    const name = document.querySelector("#name").value.trim();

    const email = document
      .querySelector("#signupEmail")
      .value
      .trim()
      .toLowerCase();

    const password =
      document.querySelector("#signupPassword").value;


    try {

      // Send data to your backend
      const response = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      // Backend returned an error
      if (!response.ok) {

        showError(
          document.querySelector("#signupEmail"),
          data.message || "Unable to create account."
        );

        return;
      }


      // SUCCESS
      console.log("Signup successful:", data);

      alert("Account created successfully!");


      // Send user to login page
      window.location.href = "login.html";


    } catch (error) {

      console.error("Signup error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );

    }

  });

}


// ========================================
// LOGIN → BACKEND
// ========================================

const loginForm = document.querySelector("#loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // First validate the frontend
    if (!validateLogin()) {
      return;
    }


    // Get form values
    const email = document
      .querySelector("#loginEmail")
      .value
      .trim()
      .toLowerCase();

    const password =
      document.querySelector("#loginPassword").value;


    try {

      // Send login information to backend
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      // Login failed
      if (!response.ok) {

        showError(
          document.querySelector("#loginEmail"),
          data.message || "Invalid email or password."
        );

        return;
      }


      // LOGIN SUCCESSFUL
      console.log("Login successful:", data);

      alert("Login successful!");


      // Go to dashboard
      window.location.href = "dashboard.html";


    } catch (error) {

      console.error("Login error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );

    }

  });

}

