// Ensemble de fonctions permettant la gestion du titre du document

// Import des modules nécessaires
import { closeModals } from "./utils.js";
import { logIn, signUp, fetchUserDataWithCookie } from "./api.js"
// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

export function listenToClickOnLogIn(){
    const registerElement = document.querySelector(".logIn");
    registerElement.addEventListener("click", handleLogIn);
}

export function listenToSubmintLogInForm(){
    const LogInFormElement = document.querySelector("#logIn-modal form");
    LogInFormElement.addEventListener("submit", handleLogInFormSubmint);
}

export function listenToClickOnSignUp(){
    const registerElement = document.querySelector(".signUp");
    registerElement.addEventListener("click", handleSignUp);
}

export function listenToSubmintSignUpForm(){
    const LogInFormElement = document.querySelector("#signUp-modal form");
    LogInFormElement.addEventListener("submit", handleSignUpFormSubmint);
}

// Appeler cette fonction dès que la page est chargée
export function checkSessionAndSetUser() {
  console.log("Je passe la 1")
  const userToken = getSessionCookie(); // Utilisez une fonction pour récupérer le cookie de session
    console.log("Je passe la 3")
    console.log(userToken)
  if (userToken) {  
    console.log("Je passe la 4")
    // Inclure le cookie dans les futures demandes
    fetchUserDataWithCookie(userToken);
  }
}

// Récupérer le cookie de session
function getSessionCookie() {
  const cookies = document.cookie.split(';');
  console.log(cookies)
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    console.log(cookie)
    if (name === 'userToken') {
      return value;
    }
  }
  return null;
}
// --------------------------------------
// Event Handlers (Gestionnaires d'événements)
// --------------------------------------

function handleLogIn(event) {
  const logElementClick = event.target;
  openLogInModal(logElementClick);
}

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

async function handleSignUpFormSubmint(event){
  event.preventDefault();
  const signUpFormElement = document.querySelector("#signUp-modal form");

  const signUpFormData = new FormData(signUpFormElement);
  const signUpObject = Object.fromEntries(signUpFormData);

  const signUpEffective = await signUp(signUpObject);

  if (signUpEffective) {
    console.log(signUpEffective)
    signUpFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors du loggin...");
  }
    
}

function handleSignUp(event) {
  const SignUpElementClick = event.target;
  openSignUpModal(SignUpElementClick);
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------
function openLogInModal() {
  const addTitleModalElement = document.querySelector("#logIn-modal");
  addTitleModalElement.classList.add("is-active");
}

function openSignUpModal(){
  const newUserModalElement = document.querySelector("#signUp-modal");
  newUserModalElement.classList.add("is-active")
}

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

function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;
}



