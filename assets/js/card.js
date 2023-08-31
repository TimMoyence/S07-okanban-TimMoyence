// ensemble de fonction permettant la gestion des cartes
import { closeModals } from "./utils.js";
import { createCard, changeCard, deleteCard } from "./api.js";

// --------------------------------------
// Event Listening (sélection d'élément et mise en écoute d'évènement)
// --------------------------------------

export function listenToSubmitOnAddCardForm(){
  const addCardFormElement = document.querySelector('#add-card-modal form');

  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
}

export function listenToSubmitOnChangeCardForm() {
  const changeCardFormElement = document.querySelector("#change-card-modal form");

  changeCardFormElement.addEventListener("submit", handleChangeCardFormSubmit);
}

export function listenToClickOnAddCardButton(listId){
  // je récupère le bouton + de la liste,
  const addCardButtonElement = document.querySelector(`#list-${listId} [slot='add-card-button']`);

  // on associe l'écouteur d'évènement au click sur ce bouton
  addCardButtonElement.addEventListener('click', handleAddCardButtonClick);
}

// ! Question : 
// ? Peut tu réexpliquer pourquoi on a modifier la fonction parente de listenToClickOnChangeCardButton, je ne comprend pas pourquoi moi elle ne marchait pas sans les modification que tu avait faite la veille 

function listenToClickOnChangeCardButton(cardId) {
  // je récupère le bouton modification de la carte,
  const changeCardButtonElement = document.querySelector(
    `#card-${cardId} [slot='edit-card-button']`
  );

  // on associe l'écouteur d'évènement au click sur ce bouton
  changeCardButtonElement.addEventListener("click", handleChangeCardButtonClick);
}

function listenToClickOnDeleteCardButton(cardId){
    // je récupère le bouton modification de la carte,
  const deleteCardButtonElement = document.querySelector(
    `#card-${cardId} [slot='remove-card-button']`
  );

  // on associe l'écouteur d'évènement au click sur ce bouton
  deleteCardButtonElement.addEventListener("click", handleDeleteCardButtonClick);
}



// --------------------------------------
// Event Handler (écouteurs d'évènements)
// --------------------------------------

async function handleAddCardFormSubmit(event){
  event.preventDefault();

  const addCardFormElement = document.querySelector('#add-card-modal form');

  const addCardFormData = new FormData(addCardFormElement);
  const cardToAdd = Object.fromEntries(addCardFormData);

  // en attendant... car c'est obligatoire dans notre backend
  cardToAdd.color = "#FFFFFF";

  const createdCard = await createCard(cardToAdd);

  addCardToList(cardToAdd);

  if (createdCard){
    // on réinitialise le formulaire
    addCardFormElement.reset();
    // on ferme les modales
    closeModals();
  }else{
    alert ('un problème est survenu lors de la création de la liste...');
  }
}

async function handleDeleteCardButtonClick(event){
  // on récupère l'id de la liste pour laquelle on veut supprimer une carte
  const clickedButtonElement = event.currentTarget;
  const cardDeleteElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardDeleteElement.id;
  const cardId = Number(idValue.substring(5));

  const deletedCard = await deleteCard(cardId);
  if (deletedCard) {
    // on met à jour l'interface utilisateur avec les données retournée par l'API
    cardDeleteElement.remove();
  } else {
    alert("un problème est survenu lors de la création de la liste...");
  }
}

async function handleChangeCardFormSubmit(event){
  event.preventDefault();
  const changeCardFormElement = document.querySelector("#change-card-modal form");
  const changeCardFormData = new FormData(changeCardFormElement);
  const changeCardObject = Object.fromEntries(changeCardFormData);
  const changeCardId = changeCardObject.card_id;

  const changeThisCard = await changeCard(changeCardId, changeCardObject);
 
  if (changeThisCard) {
    // on met à jour l'interface utilisateur avec les données retournée par l'API
    updateCardDom(changeCardId, changeCardObject);

    // on réinitialise le formulaire
    changeCardFormElement.reset();
    // on ferme les modales
    closeModals();
  } else {
    alert("un problème est survenu lors de la création de la liste...");
  }
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

function handleChangeCardButtonClick(event){
  // on récupère l'id de la carte pour laquelle on veut créer une carte
  const clickedButtonElement = event.currentTarget;
  const cardIdElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardIdElement.id;
  const cardId = Number(idValue.substring(5));

  // on demande l'affichage de la modal en précisant à quelle carte elle permet d'ajouter une carte
  openChangeCardModal(cardId);
}


// --------------------------------------
// DOM Modifier (modificateurs du DOM)
// --------------------------------------
function openAddCardModal(listId){
  // on affiche la modale
  const addListModalElement = document.querySelector('#add-card-modal');
  addListModalElement.classList.add('is-active');

  // on indique l'identifiant de la liste dans le champ caché du formulaire
  const listIdFormInputElement = addListModalElement.querySelector("[name='list_id']");
  listIdFormInputElement.value = listId;
}

function openChangeCardModal(cardId){
  // on affiche la modale
  const addcardModalElement = document.querySelector("#change-card-modal");
  addcardModalElement.classList.add("is-active");

  // on indique l'identifiant de la carte dans le champ caché du formulaire
  const cardIdFormInputElement =
    addcardModalElement.querySelector("[name='card_id']");
  cardIdFormInputElement.value = cardId;
}

export function addCardToList(card) {
  // on récupère l'emplacement où insérer la carte
  const cardsContainerElement = document.querySelector(
    `#list-${card.list_id} [slot='list-content']`
  );

  // on récupèrele template
  const cardTemplate = document.querySelector("#card-template");
  // on accède à son contenu
  const cardTemplateContent = cardTemplate.content;
  // on en crée une copie
  const clonedCardTemplate = cardTemplateContent.cloneNode(true);
  const clonedCardElement = clonedCardTemplate.querySelector(".card");


  // on modifie le template avec les infos de la carte à créer
  // description de la carte :
  const slotCardDescriptionElement = clonedCardElement.querySelector(
    "[slot='card-description']"
  );
  slotCardDescriptionElement.textContent = card.description;
  // id de la carte :
  clonedCardElement.setAttribute("id", `card-${card.id}`);

  // on ajoute la copie du template
  cardsContainerElement.append(clonedCardElement);

  // Delete :
  listenToClickOnDeleteCardButton(card.id);

  // on écoute le click pour l'édition
  listenToClickOnChangeCardButton(card.id);
}


function updateCardDom(changeCardId, changeCardObject) {
  if (changeCardObject.description) {
    const updatedCard = document.querySelector(
      `#card-${changeCardId}  [slot="card-description"]`
    );

    updatedCard.innerHTML = changeCardObject.description;
  }
}
