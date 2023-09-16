// Ensemble de fonctions permettant la gestion du titre du document

// Import des modules nécessaires
import { closeModals } from "./utils.js";
import { logIn } from "./api.js"
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
  // ! il va falloir enlever le mdp a logInObject
  if (logInEffective) {
    updateButtonLoginCheck(logInEffective)
    // Réinitialisation du formulaire et fermeture des modales
    logInFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors du loggin...");
  }
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------
function openLogInModal() {
  const addTitleModalElement = document.querySelector("#logIn-modal");
  addTitleModalElement.classList.add("is-active");
}

function updateButtonLoginCheck(user){
  const loginButtonHide = document.querySelector(".logIn");
  loginButtonHide.classList.add("is-hidden");
  const logoutButtonSee = document.querySelector(".logout");
  logoutButtonSee.classList.remove("is-hidden");
  const userIsConnected = document.querySelector(".user");
  userIsConnected.classList.remove("is-hidden");
  userIsConnected.innerHTML = user.userName
  const signUpButtonHide = document.querySelector(".signUp");
  signUpButtonHide.classList.add("is-hidden");
  // integrer l'id dans userIsConnected

  // appeler l afonction de logout 
}

function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;
}



