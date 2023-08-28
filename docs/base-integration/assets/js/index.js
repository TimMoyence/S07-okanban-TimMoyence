const listModal = document.querySelector(".list-modal");
const cardModal = document.querySelector(".card-modal");
const createListButton = document.querySelector(".create-list-button");
const createCardButton = document.querySelectorAll(".is-clickable");
const removeButton = document.querySelectorAll(".close");
const removeBackground = document.querySelectorAll(".modal-background");
const newListFormElement = document.querySelector(".new-card-form");

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
  createListButton.addEventListener("click", openAddListModal);
}

createCardButton.forEach((element) => {element.addEventListener("click", openAddCardModal);});
removeButton.forEach((element) => {element.addEventListener("click", closeModal);});
removeBackground.forEach((element) => {{element.addEventListener("click", closeModal);}})


function addListToListsContainer(newCardObject) {
    const listTemplateElement = document.querySelector("#list-template");
    const cardItemElement = listTemplateElement.content.cloneNode(true).firstElementChild;
    cardItemElement.querySelector("[slot='list-name']").textContent =
      newCardObject.name;
    const cardsListElement = document.querySelector("#lists-container");
    cardsListElement.append(cardItemElement);
}

function listenToSubmitOnAddListForm() {
    newListFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        const newCardElement = event.currentTarget;
        const newCardFormData = new FormData(newCardElement);
        //  console.log(newCardFormData.get("name"));
        const newCardObject = Object.fromEntries(newCardFormData);
        
        newListFormElement.reset();
        addListToListsContainer(newCardObject);
        closeModal();
    }
)}

function createListId() {
    let listId = parseInt(Math.floor(Math.random() * 101));
     
}

function listenToUserActions() {
  listenToClickOnAddListButton();
  listenToSubmitOnAddListForm();
}

// Appel de la méthode pour mettre en place les écouteurs d'événements
listenToUserActions();
