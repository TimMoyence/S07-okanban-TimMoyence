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
  const ligInFormElement = document.querySelector("#logIn-modal form");

  const ligInFormData = new FormData(ligInFormElement);
  const ligInObject = Object.fromEntries(ligInFormData);
  console.log(ligInObject);
  const logInEffective = await logIn(ligInObject);

  if (logInEffective) {
    console.log(logInEffective)
    // ! Il faut un template qui se déclence une fois la connection faite et qui va rajouter le nom / Hidde loggin et ouvrir dehide logout
    // Réinitialisation du formulaire et fermeture des modales
    ligInFormElement.reset();
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

function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;

}



