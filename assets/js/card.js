import { closeModals } from "./utils.js";
import { createCard, changeCard, deleteCard } from "./api.js";
import { orderCards } from "./list.js";

// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

/**
 * Listener for the form submission to add a card
 */
export function listenToSubmitOnAddCardForm() {
  const addCardFormElement = document.querySelector("#add-card-modal form");
  addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
}

/**
 * Listener for the form submission to change a card
 */
export function listenToSubmitOnChangeCardForm() {
  const changeCardFormElement = document.querySelector(
    "#change-card-modal form"
  );
  changeCardFormElement.addEventListener("submit", handleChangeCardFormSubmit);
}

/**
 * Listener for click to add a specific card
 * @param {string} listId Id of the liste where we want to put a card 
 */
export function listenToClickOnAddCardButton(listId) {
  const addCardButtonElement = document.querySelector(
    `#list-${listId} [slot='add-card-button']`
  );
  addCardButtonElement.addEventListener("click", handleAddCardButtonClick);
}

/**
 * Listener for click to change a specific card 
 * @param {string} cardId Id of the card
 */
function listenToClickOnChangeCardButton(cardId) {
  const changeCardButtonElement = document.querySelector(
    `#card-${cardId} [slot='edit-card-button']`
  );
  changeCardButtonElement.addEventListener(
    "click",
    handleChangeCardButtonClick
  );
}

/**
 * Listener for click to remove a specific card 
 * @param {string} cardId Id of the card
 */
function listenToClickOnDeleteCardButton(cardId) {
  const deleteCardButtonElement = document.querySelector(
    `#card-${cardId} [slot='remove-card-button']`
  );
  deleteCardButtonElement.addEventListener(
    "click",
    handleDeleteCardButtonClick
  );
}

// --------------------------------------
// Event Handlers (Gestionnaires d'événements)
// --------------------------------------

/**
 * Handle the submission of the card addition form
 * @param {Event} event Form subsmission event
 * @returns {Promise<void>} promise resolved once the card is successfully created
 */
async function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const addCardFormElement = document.querySelector("#add-card-modal form");
  const addCardFormData = new FormData(addCardFormElement);
  const cardToAdd = Object.fromEntries(addCardFormData);

  // En attendant... car c'est obligatoire dans notre backend
  cardToAdd.color = "#FFFFFF";

  const createdCard = await createCard(cardToAdd);

  addCardToList(createdCard);

  if (createdCard) {
    addCardFormElement.reset();
    closeModals();

  }else{
    alert ('un problème est survenu lors de la création de la carte...');
  }
}

/**
 * Handle the click to delete card
 * @param {Event} event Button delete click event
 * @returns {Promise<void>} promise resolved once the card is successfully delete
 */
async function handleDeleteCardButtonClick(event) {

  const clickedButtonElement = event.currentTarget;
  const cardDeleteElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardDeleteElement.id;
  const cardId = Number(idValue.substring(5));
  const deletedCard = await deleteCard(cardId);
  if (deletedCard) {
    cardDeleteElement.remove();
  } else {
    alert("Un problème est survenu lors de la suppression de la carte...");
  }
}

/**
 * Handle the submission of the changing card form
 * @param {Event} event Form subsmission event
 * @returns {Promise<void>} promise resolved once the card is successfully change
 */
async function handleChangeCardFormSubmit(event) {
  event.preventDefault();
  const changeCardFormElement = document.querySelector(
    "#change-card-modal form"
  );
  const changeCardFormData = new FormData(changeCardFormElement);
  const changeCardObject = Object.fromEntries(changeCardFormData);
  const changeCardId = changeCardObject.card_id;

  const changeThisCard = await changeCard(changeCardId, changeCardObject);

  if (changeThisCard) {
    updateCardDom(changeCardId, changeCardObject);
    changeCardFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la modification de la carte...");
  }
}

/**
 * Handle the click to add card
 * @param {Event} event Button Add click event
 */
function handleAddCardButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const listIdElement = clickedButtonElement.closest("[slot=list-id]");
  const idValue = listIdElement.id;
  const listId = Number(idValue.substring(5));
  openAddCardModal(listId);
}

/**
 * Handle the click to change card
 * @param {Event} event Button change click event
 */
function handleChangeCardButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const cardIdElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardIdElement.id;
  const cardId = Number(idValue.substring(5));
  openChangeCardModal(cardId);
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------


/**
 * Open modal to add card on a specific list
 * @param {string} listId Identification of the list where we want add card
 */
function openAddCardModal(listId) {
  const addListModalElement = document.querySelector("#add-card-modal");
  addListModalElement.classList.add("is-active");

  const listIdFormInputElement =
    addListModalElement.querySelector("[name='list_id']");
  listIdFormInputElement.value = listId;
}

/**
 * Open modal to modify card 
 * @param {string} cardId Identification of the card Id
 * @param {string} card.list_id - The ID of the list to which the card belongs.
 * @param {string} card.description - The description of the card.
 * @param {string} card.id - The unique ID of the card.
 */
function openChangeCardModal(cardId) {
  const addcardModalElement = document.querySelector("#change-card-modal");
  addcardModalElement.classList.add("is-active");

  const cardIdFormInputElement =
    addcardModalElement.querySelector("[name='card_id']");
  cardIdFormInputElement.value = cardId;
}

/**
 * Add card in the DOM and call the card listen or order function
 *
 * @param {Object} card - An object containing all the information of the card to modify.
 * @param {string} card.list_id - The ID of the list to which the card belongs.
 * @param {string} card.description - The description of the card.
 * @param {string} card.id - The unique ID of the card.
 */
export function addCardToList(card) {
  const cardsContainerElement = document.querySelector(
    `#list-${card.list_id} [slot='list-content']`
  );

  const cardTemplate = document.querySelector("#card-template");
  const cardTemplateContent = cardTemplate.content;
  const clonedCardTemplate = cardTemplateContent.cloneNode(true);
  const clonedCardElement = clonedCardTemplate.querySelector(".card");

  const slotCardDescriptionElement = clonedCardElement.querySelector(
    "[slot='card-description']"
  );
  slotCardDescriptionElement.textContent = card.description;

  clonedCardElement.setAttribute("id", `card-${card.id}`);

  cardsContainerElement.append(clonedCardElement);

  listenToClickOnDeleteCardButton(card.id);

  listenToClickOnChangeCardButton(card.id);
  
  orderCards(cardsContainerElement);
}

/**
 * Updates the DOM of a card with new data.
 *
 * @param {string} changeCardId - The ID of the card to update in the DOM.
 * @param {Object} changeCardObject - An object containing updated card data.
 * @param {string} changeCardObject.description - The updated description of the card.
 */
function updateCardDom(changeCardId, changeCardObject) {
  if (changeCardObject.description) {
    const updatedCard = document.querySelector(
      `#card-${changeCardId}  [slot="card-description"]`
    );
    updatedCard.innerHTML = changeCardObject.description;
  }
}

/**
 * Updates a card in the DOM with new data.
 *
 * @param {string} cardId - The ID of the card to update in the DOM.
 * @param {Object} data - An object containing updated card data.
 * @param {string} data.description - The updated description of the card.
 */
function updateCardInDOM(cardId, data){
  if (data.description){
    const cardSlotDescription = document.querySelector(`#card-${cardId} [slot="card-description"]`);
    cardSlotDescription.textContent = data.description;
  }
}
