// Ensemble de fonctions permettant la gestion du titre du document

// Import des modules nécessaires
import { closeModals } from "./utils.js";

// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------
/**
 * Listener for a click on the document title.
 */
export function listenToClickOnTitle(){
    const titleElement = document.querySelector(".title")
    titleElement.addEventListener("click", handleChangeTitle)
}
/**
 * Listener for submitting the change title form.
 */
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

/**
 * Event handler for clicking the document title.
 * @param {Event} event - Click event.
 */
function handleChangeTitle(event){
    const titleElementClick = event.target
    openChangeListModal(titleElementClick);
}
/**
 * Event handler for submitting the change title form.
 * @param {Event} event - Form submission event.
 */
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

/**
 * Opens the modal for changing the title.
 * @param {HTMLElement} title - Element of the document title.
 */
function openChangeListModal(title) {
  const addTitleModalElement = document.querySelector("#title-modal");
  addTitleModalElement.classList.add("is-active");

  const textModal = addTitleModalElement.querySelector(".input");
  textModal.textContent = title.innerHTML;
}
/**
 * Updates the DOM with the new title.
 * @param {Object} newTitle - New document title.
 */
function updateTitleDom(newTitle){
    const titleElement = document.querySelector(".title");
    titleElement.textContent = newTitle.description;

}