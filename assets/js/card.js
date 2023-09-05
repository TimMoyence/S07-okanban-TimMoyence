// Ensemble de fonctions permettant la gestion des cartes

// Import des modules nécessaires
import { closeModals } from "./utils.js";
import { createCard, changeCard, deleteCard } from "./api.js";
import { orderCards } from "./list.js";

// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

// Écouteur de soumission du formulaire d'ajout de carte
export function listenToSubmitOnAddCardForm() {
  const addCardFormElement = document.querySelector("#add-card-modal form");
  addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
}

// Écouteur de soumission du formulaire de modification de carte
export function listenToSubmitOnChangeCardForm() {
  const changeCardFormElement = document.querySelector(
    "#change-card-modal form"
  );
  changeCardFormElement.addEventListener("submit", handleChangeCardFormSubmit);
}

// Écouteur de clic sur le bouton d'ajout de carte pour une liste spécifique
export function listenToClickOnAddCardButton(listId) {
  const addCardButtonElement = document.querySelector(
    `#list-${listId} [slot='add-card-button']`
  );
  addCardButtonElement.addEventListener("click", handleAddCardButtonClick);
}

// Écouteur de clic sur le bouton de modification de carte
function listenToClickOnChangeCardButton(cardId) {
  const changeCardButtonElement = document.querySelector(
    `#card-${cardId} [slot='edit-card-button']`
  );
  changeCardButtonElement.addEventListener(
    "click",
    handleChangeCardButtonClick
  );
}

// Écouteur de clic sur le bouton de suppression de carte
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

// Gestionnaire de soumission du formulaire d'ajout de carte
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
    // Réinitialisation du formulaire et fermeture des modales
    addCardFormElement.reset();
    closeModals();

  }else{
    alert ('un problème est survenu lors de la création de la carte...');
  }
}
// Gestionnaire de clic sur le bouton de suppression de carte
async function handleDeleteCardButtonClick(event) {

  const clickedButtonElement = event.currentTarget;
  const cardDeleteElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardDeleteElement.id;
  const cardId = Number(idValue.substring(5));
  const deletedCard = await deleteCard(cardId);
  if (deletedCard) {
    // Mise à jour de l'interface utilisateur avec les données de la carte supprimée
    cardDeleteElement.remove();
  } else {
    alert("Un problème est survenu lors de la suppression de la carte...");
  }
}

// Gestionnaire de soumission du formulaire de modification de carte
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
    // Mise à jour de l'interface utilisateur avec les données de la carte modifiée
    updateCardDom(changeCardId, changeCardObject);

    // Réinitialisation du formulaire et fermeture des modales
    changeCardFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la modification de la carte...");
  }
}

// Gestionnaire de clic sur le bouton d'ajout de carte
function handleAddCardButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const listIdElement = clickedButtonElement.closest("[slot=list-id]");
  const idValue = listIdElement.id;
  const listId = Number(idValue.substring(5));

  // Demande d'affichage de la modal en précisant à quelle liste elle permet d'ajouter une carte
  openAddCardModal(listId);
}

// Gestionnaire de clic sur le bouton de modification de carte
function handleChangeCardButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const cardIdElement = clickedButtonElement.closest("[slot=card-id]");
  const idValue = cardIdElement.id;
  const cardId = Number(idValue.substring(5));

  // Demande d'affichage de la modal en précisant à quelle carte elle permet d'ajouter une carte
  openChangeCardModal(cardId);
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------

// Ouverture de la modale d'ajout de carte pour une liste spécifique
function openAddCardModal(listId) {
  const addListModalElement = document.querySelector("#add-card-modal");
  addListModalElement.classList.add("is-active");

  // Indication de l'identifiant de la liste dans le champ caché du formulaire
  const listIdFormInputElement =
    addListModalElement.querySelector("[name='list_id']");
  listIdFormInputElement.value = listId;
}

// Ouverture de la modale de modification de carte
function openChangeCardModal(cardId) {
  const addcardModalElement = document.querySelector("#change-card-modal");
  addcardModalElement.classList.add("is-active");

  // Indication de l'identifiant de la carte dans le champ caché du formulaire
  const cardIdFormInputElement =
    addcardModalElement.querySelector("[name='card_id']");
  cardIdFormInputElement.value = cardId;
}

// Ajout d'une carte à une liste
export function addCardToList(card) {
  // Récupération de l'emplacement où insérer la carte
  const cardsContainerElement = document.querySelector(
    `#list-${card.list_id} [slot='list-content']`
  );

  // Récupération du modèle de carte
  const cardTemplate = document.querySelector("#card-template");
  const cardTemplateContent = cardTemplate.content;
  const clonedCardTemplate = cardTemplateContent.cloneNode(true);
  const clonedCardElement = clonedCardTemplate.querySelector(".card");

  // Modification du modèle avec les informations de la carte à créer
  // Description de la carte :
  const slotCardDescriptionElement = clonedCardElement.querySelector(
    "[slot='card-description']"
  );
  slotCardDescriptionElement.textContent = card.description;

  // ID de la carte :
  clonedCardElement.setAttribute("id", `card-${card.id}`);

  // Ajout de la copie du modèle
  cardsContainerElement.append(clonedCardElement);

  // Écoute du clic pour la suppression de carte
  listenToClickOnDeleteCardButton(card.id);

  // Écoute du clic pour la modification de carte
  listenToClickOnChangeCardButton(card.id);

  // Réordonnement des cartes
  orderCards(cardsContainerElement);
}

// Mise à jour du DOM de la carte
function updateCardDom(changeCardId, changeCardObject) {
  if (changeCardObject.description) {
    const updatedCard = document.querySelector(
      `#card-${changeCardId}  [slot="card-description"]`
    );
    updatedCard.innerHTML = changeCardObject.description;
  }
}

function updateCardInDOM(cardId, data){
  if (data.description){
    const cardSlotDescription = document.querySelector(`#card-${cardId} [slot="card-description"]`);
    cardSlotDescription.textContent = data.description;
  }
}
