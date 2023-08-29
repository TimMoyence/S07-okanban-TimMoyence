// Ton code JavaScript ici !

// --------------------------------------
// Event Listening (sélection d'élément et mise en écoute d'évènement)
// --------------------------------------
function listenToClickOnAddListButton(){
  // 1 - sélection de l'éléments sur lequel écouter
  const addListButtonElement = document.querySelector('#addlist-button');

  // 2 - association d'un écouteur dévènement pour un type d'évènement sur l'élément
  addListButtonElement.addEventListener("click", handleAddListButtonClick);
}

function listenToClickOnModalClosingElements(){
  // récupérer les boutons concernés
  const closeElementList = document.querySelectorAll('.modal .close, .modal .modal-background');

  // associer un écouteur d'évènement
  closeElementList.forEach((closeElement) => {
    closeElement.addEventListener('click', handleCloseModalClick);
  });
}

function listenToSubmitOnAddListForm(){
  const addListFormElement = document.querySelector('#add-list-modal form');

  addListFormElement.addEventListener('submit', handleAddListFormSubmit);
}

function listenToUserActions(){
  listenToClickOnAddListButton();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
}


// --------------------------------------
// Event Handler (écouteurs d'évènements)
// --------------------------------------
function handleAddListButtonClick(){
  openAddListModal();
}

function handleCloseModalClick(){
  closeModals();
}

function handleAddListFormSubmit(event){
  event.preventDefault();

  const addListFormElement = document.querySelector('#add-list-modal form');

  const addListFormData = new FormData(addListFormElement);
  const listToAdd = Object.fromEntries(addListFormData);
  addListToListsContainer(listToAdd);

  // on réinitialise le formulaire
  addListFormElement.reset();
  // on ferme les modales
  closeModals();
}

// --------------------------------------
// DOM Modifier (modificateurs du DOM)
// --------------------------------------
function openAddListModal(){
  // on sélectionne l'élément que l'on souhaite modifie
  const addListModalElement = document.querySelector('#add-list-modal');

  // on le modifie
  addListModalElement.classList.add('is-active');
}

function closeModals(){
  const modalElementList = document.querySelectorAll('.modal');

  modalElementList.forEach((modalElement) => {
    modalElement.classList.remove('is-active');
  });
}

function addListToListsContainer(list){
  console.log(list);

  // on récupèrele template
  const listTemplate = document.querySelector('#list-template');
  // on accède à son contenu
  const listTemplateContent = listTemplate.content;
  // on en crée une copie
  const clonedListTemplate = listTemplateContent.cloneNode(true);

  // on modifie le tempalte avec les infos de la liste à créer
  const slotListNameElement = clonedListTemplate.querySelector("[slot='list-name']");
  console.log(slotListNameElement);
  slotListNameElement.textContent = list.name;

  // on récupère le container de liste
  const listsContainerElement = document.querySelector('#lists-container');
  // on ajoute la copie du template
  listsContainerElement.append(clonedListTemplate);
}

// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  listenToUserActions();
});
