// Ensemble de fonctions permettant la gestion du titre du document

// Import des modules nécessaires
import { closeModals } from "./utils.js";

// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

export function listenToClickOnTitle(){
    const titleElement = document.querySelector(".title")
    titleElement.addEventListener("click", handleChangeTitle)
}

export function listenToSubmintOnChangeTitleForm(){
    const changeTitleFormElement = document.querySelector("#title-modal form")
    changeTitleFormElement.addEventListener(
      "submit",
      handleChangeTitleFormSubmint
    );
}
// --------------------------------------
// Event Handlers (Gestionnaires d'événements)
// --------------------------------------

function handleChangeTitle(event){
    const titleElementClick = event.target
    openChangeListModal(titleElementClick);
}

function handleChangeTitleFormSubmint(event){
  event.preventDefault();
  const changeTitleFormElement = document.querySelector("#title-modal form");

  const changeTitleFormData = new FormData(changeTitleFormElement);
  const changeTitleObject = Object.fromEntries(changeTitleFormData);
  
  //! Faire l'envoie a la BDD pour le nouveau titre 

  updateTitleDom(changeTitleObject);

  changeTitleFormElement.reset();
  closeModals();
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------
function openChangeListModal(title) {
  const addTitleModalElement = document.querySelector("#title-modal");
  addTitleModalElement.classList.add("is-active");

  const textModal = addTitleModalElement.querySelector(".input");
  textModal.textContent = title.innerHTML;
}

function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;

}