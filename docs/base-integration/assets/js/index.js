const listModal = document.querySelector(".list-modal");
const cardModal = document.querySelector(".card-modal");

function openAddListModal() {
    listModal.classList.add("is-active");
}

function openAddCardModal() {
  cardModal.classList.add("is-active");
}

function closeModal() {
  listModal.classList.remove("is-active");
  cardModal.classList.remove("is-active");
}

function listenToClickOnAddListButton() {
  const createListButton = document.querySelector(".create-list-button");

  createListButton.addEventListener("click", openAddListModal);
}

function listenToClickOnAddCardButton(listId) {
  // je récupère le bouton + de la liste,
  const addCardButtonElement = document.querySelector(
    `#list-${listId} [slot='add-card-button']`
  );

  // on associe l'écouteur d'évènement au click sur ce bouton
  addCardButtonElement.addEventListener("click", handleAddCardButtonClick);
}

function handleAddCardButtonClick(event) {
  // on récupère l'id de la liste pour laquelle on veut créer une carte
  const clickedButtonElement = event.currentTarget;
  const listIdElement = clickedButtonElement.closest("[slot=list-id]");
  const idValue = listIdElement.id;
  const listId = Number(idValue.substring(5));
  // on demande l'affichage de la modal en précisant à quelle liste elle permet d'ajouter une carte
  openAddCardModal(listId);
}

function removeButtonAll() {
  const removeButton = document.querySelectorAll(".close");
  const removeBackground = document.querySelectorAll(".modal-background");

  removeButton.forEach((element) => {element.addEventListener("click", closeModal);});
  removeBackground.forEach((element) => {{element.addEventListener("click", closeModal);}})
}

function addListToListsContainer(newCardObject) {
    const listTemplateElement = document.querySelector("#list-template");

    const cardItemElement = listTemplateElement.content.cloneNode(true);
    cardItemElement.querySelector("[slot='list-name']").textContent =
      newCardObject.name;

    const slotListIdElement = cardItemElement.querySelector("[slot='list-id']");
    slotListIdElement.setAttribute("id", `list-${newCardObject.listId}`);

    const cardsListElement = document.querySelector("#lists-container");
    cardsListElement.append(cardItemElement);

      listenToClickOnAddCardButton(newCardObject.listId);
}

function listenToSubmitOnAddListForm() {
  const newListFormElement = document.querySelector(".new-card-form");

    newListFormElement.addEventListener("submit", function(event) {
      event.preventDefault();
      const newCardElement = event.currentTarget;
      const newCardFormData = new FormData(newCardElement);
      //  console.log(newCardFormData.get("name"));
      const newCardObject = Object.fromEntries(newCardFormData);

      // temporairement, on génère un faux id aléatoire pour notre liste (en attendant que le BackEnd s'en charge)
      newCardObject.listId = parseInt(Math.floor(Math.random() * 101));

      newListFormElement.reset();
      addListToListsContainer(newCardObject);
      closeModal();
    }
)}


function listenToUserActions() {
  listenToClickOnAddListButton();
  listenToSubmitOnAddListForm();
  removeButtonAll();
}

// Appel de la méthode pour mettre en place les écouteurs d'événements
listenToUserActions();
