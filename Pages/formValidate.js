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


// ---------- HELPER FUNCTIONS ----------

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


// ---------- SIGN UP VALIDATION ----------

function validateSignup() {

  const name = document.querySelector("#name");
  const email = document.querySelector("#signupEmail");
  const password = document.querySelector("#signupPassword");
  const confirmPassword = document.querySelector("#confirmPassword");

  let valid = true;


  // Name
  if (isEmpty(name.value)) {
    showError(name, "Name is required.");
    valid = false;
  } else if (name.value.trim().length < 2) {
    showError(name, "Name must contain at least 2 characters.");
    valid = false;
  } else {
    showSuccess(name);
  }


  // Email
  if (isEmpty(email.value)) {
    showError(email, "Email is required.");
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Enter a valid email address.");
    valid = false;
  } else {
    showSuccess(email);
  }


  // Password
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


  // Confirm password
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


// ---------- LOGIN VALIDATION ----------

function validateLogin() {

  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");

  let valid = true;


  // Email
  if (isEmpty(email.value)) {
    showError(email, "Email is required.");
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Enter a valid email address.");
    valid = false;
  } else {
    showSuccess(email);
  }


  // Password
  if (isEmpty(password.value)) {
    showError(password, "Password is required.");
    valid = false;
  } else {
    showSuccess(password);
  }


  return valid;
}


// ---------- SIGNUP FORM ----------

const signupForm = document.querySelector("#signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {

    if (!validateSignup()) {
      event.preventDefault();
    }

  });
}


// ---------- LOGIN FORM ----------

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {

    if (!validateLogin()) {
      event.preventDefault();
    }

  });
}