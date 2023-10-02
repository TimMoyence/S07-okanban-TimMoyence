// Ensemble de fonctions permettant la gestion du titre du document

// Import des modules nécessaires
import { closeModals } from "./utils.js";
import { logIn, signUp, fetchUserDataWithCookie } from "./api.js"
// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

/**
 * Listener for a click on the login button.
 */
export function listenToClickOnLogIn(){
    const registerElement = document.querySelector(".logIn");
    registerElement.addEventListener("click", handleLogIn);
}

/**
 * Listener for submitting the login form.
 */
export function listenToSubmintLogInForm(){
    const LogInFormElement = document.querySelector("#logIn-modal form");
    LogInFormElement.addEventListener("submit", handleLogInFormSubmint);
}

/**
 * Listener for a click on the sign-up button.
 */
export function listenToClickOnSignUp(){
    const registerElement = document.querySelector(".signUp");
    registerElement.addEventListener("click", handleSignUp);
}

/**
 * Listener for submitting the sign-up form.
 */
export function listenToSubmintSignUpForm(){
    const LogInFormElement = document.querySelector("#signUp-modal form");
    LogInFormElement.addEventListener("submit", handleSignUpFormSubmint);
}

/**
 * Call this function as soon as the page is loaded to check the session and set the user.
 */
export function checkSessionAndSetUser() {
  const userToken = getSessionCookie(); // Utilisez une fonction pour récupérer le cookie de session
    console.log(userToken)
  if (userToken) {  
    console.log("Pourquoi tu rentre pas ici ?")
    // Inclure le cookie dans les futures demandes
    fetchUserDataWithCookie(userToken);
  }
}

/**
 * Retrieve the session cookie.
 * @returns {string|null} The session cookie value or null if not found.
 */
function getSessionCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'userToken') {
      return value;
    }
  }
  return name;
}
// --------------------------------------
// Event Handlers (Gestionnaires d'événements)
// --------------------------------------

/**
 * Event handler for clicking the login button.
 * @param {Event} event - Click event.
 */
function handleLogIn(event) {
  const logElementClick = event.target;
  openLogInModal(logElementClick);
}

/**
 * Event handler for submitting the login form.
 * @param {Event} event - Form submission event.
 */
async function handleLogInFormSubmint(event){
  event.preventDefault();
  const logInFormElement = document.querySelector("#logIn-modal form");

  const logInFormData = new FormData(logInFormElement);
  const logInObject = Object.fromEntries(logInFormData);
  const logInEffective = await logIn(logInObject);

  if (logInEffective) {
    updateButtonLoginCheck(logInEffective)
    logInFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors du loggin...");
  }
}

/**
 * Event handler for submitting the sign-up form.
 * @param {Event} event - Form submission event.
 */
async function handleSignUpFormSubmint(event){
  event.preventDefault();
  const signUpFormElement = document.querySelector("#signUp-modal form");

  const signUpFormData = new FormData(signUpFormElement);
  const signUpObject = Object.fromEntries(signUpFormData);

  const signUpEffective = await signUp(signUpObject);

  if (signUpEffective) {
    signUpFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors du loggin...");
  }
    
}

/**
 * Event handler for clicking the sign-up button.
 * @param {Event} event - Click event.
 */
function handleSignUp(event) {
  const SignUpElementClick = event.target;
  openSignUpModal(SignUpElementClick);
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------

/**
 * Opens the login modal.
 */
function openLogInModal() {
  const addTitleModalElement = document.querySelector("#logIn-modal");
  addTitleModalElement.classList.add("is-active");
}

/**
 * Opens the sign-up modal.
 */
function openSignUpModal(){
  const newUserModalElement = document.querySelector("#signUp-modal");
  newUserModalElement.classList.add("is-active")
}

/**
 * Updates the visibility of login and logout buttons and displays the user's name.
 * @param {Object} user - User object with user data.
 */
async function updateButtonLoginCheck(user){
  const loginButtonHide = document.querySelector(".logIn");
  loginButtonHide.classList.add("is-hidden");
  const logoutButtonSee = document.querySelector(".logout");
  logoutButtonSee.classList.remove("is-hidden");
  const userIsConnected = document.querySelector(".user");
  userIsConnected.classList.remove("is-hidden");
  const signUpButtonHide = document.querySelector(".signUp");
  signUpButtonHide.classList.add("is-hidden");

  console.log(user.message)
  userIsConnected.innerHTML = user.userName

  console.log(user)
}

/**
 * Updates the document title in the DOM.
 * @param {Object} newTitle - New document title.
 */
function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;
}



