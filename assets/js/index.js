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

function listenToSubmitOnAddCardForm(){
  const addCardFormElement = document.querySelector('#add-card-modal form');

  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
}

function listenToClickOnAddCardButton(listId){
  // je récupère le bouton + de la liste,
  const addCardButtonElement = document.querySelector(`#list-${listId} [slot='add-card-button']`);

  // on associe l'écouteur d'évènement au click sur ce bouton
  addCardButtonElement.addEventListener('click', handleAddCardButtonClick);
}


function listenToUserActions(){
  listenToClickOnAddListButton();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
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

  // temporairement, on génère un faux id aléatoire pour notre liste (en attendant que le BackEnd s'en charge)
  listToAdd.id = Math.round(Math.random()* 10000);

  addListToListsContainer(listToAdd);

  // on réinitialise le formulaire
  addListFormElement.reset();
  // on ferme les modales
  closeModals();
}

function handleAddCardFormSubmit(event){
  event.preventDefault();

  const addCardFormElement = document.querySelector('#add-card-modal form');

  const addCardFormData = new FormData(addCardFormElement);
  const cardToAdd = Object.fromEntries(addCardFormData);

  // temporairement, on génère un faux id aléatoire pour notre liste (en attendant que le BackEnd s'en charge)
  cardToAdd.id = Math.round(Math.random()* 10000);

  addCardToList(cardToAdd);

  // on réinitialise le formulaire
  addCardFormElement.reset();
  // on ferme les modales
  closeModals();
}


function handleAddCardButtonClick(event){
  // on récupère l'id de la liste pour laquelle on veut créer une carte
  const clickedButtonElement = event.currentTarget;
  const listIdElement = clickedButtonElement.closest('[slot=list-id]');
  const idValue = listIdElement.id;
  const listId = Number(idValue.substring(5));
  // on demande l'affichage de la modal en précisant à quelle liste elle permet d'ajouter une carte
  openAddCardModal(listId);
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

function openAddCardModal(listId){
  // on affiche la modale
  const addListModalElement = document.querySelector('#add-card-modal');
  addListModalElement.classList.add('is-active');

  // on indique l'identifiant de la liste dans le champ caché du formulaire
  const listIdFormInputElement = addListModalElement.querySelector("[name='listId']");
  listIdFormInputElement.value = listId;
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

  // on modifie le template avec les infos de la liste à créer
  // nom de la liste :
  const slotListNameElement = clonedListTemplate.querySelector("[slot='list-name']");
  console.log(slotListNameElement);
  slotListNameElement.textContent = list.name;
  // id de la liste :
  const slotListIdElement = clonedListTemplate.querySelector("[slot='list-id']");
  slotListIdElement.setAttribute("id", `list-${list.id}`);

  // on récupère le container de liste
  const listsContainerElement = document.querySelector('#lists-container');
  // on ajoute la copie du template
  listsContainerElement.append(clonedListTemplate);

  // on se met en écoute du click sur le bouton d'ajout de carte lors de la création de la liste
  listenToClickOnAddCardButton(list.id);
}

function addCardToList(card){
  // on récupère l'emplacement où insérer la carte
  const cardsContainerElement = document.querySelector(`#list-${card.listId} [slot='list-content']`);

  // on récupèrele template
  const cardTemplate = document.querySelector('#card-template');
  // on accède à son contenu
  const cardTemplateContent = cardTemplate.content;
  // on en crée une copie
  const clonedCardTemplate = cardTemplateContent.cloneNode(true);

  // on modifie le template avec les infos de la carte à créer
  // description de la carte :
  const slotCardDescriptionElement = clonedCardTemplate.querySelector("[slot='card-description']");
  console.log(slotCardDescriptionElement);
  slotCardDescriptionElement.textContent = card.description;
  // id de la carte :
  const slotCardIdElement = clonedCardTemplate.querySelector("[slot='card-id']");
  slotCardIdElement.setAttribute("id", `card-${card.id}`);

  // on ajoute la copie du template
  cardsContainerElement.append(clonedCardTemplate);

}

// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  listenToUserActions();
});