import { closeModals } from "./utils.js";
import { listenToClickOnAddCardButton, addCardToList } from "./card.js";
import {
  getLists,
  createList,
  changeList,
  changeCard,
  deleteList,
} from "./api.js";
import Sortable from "sortablejs";

// --------------------------------------
// Event Listening (Écoute des événements)
// --------------------------------------

/**
 * Listener for a click on the add list button.
 */
export function listenToClickOnAddListButton() {
  const addListButtonElement = document.querySelector("#addlist-button");
  addListButtonElement.addEventListener("click", handleAddListButtonClick);
}

/**
 * Listener for submitting the add list form.
 */
export function listenToSubmitOnAddListForm() {
  const addListFormElement = document.querySelector("#add-list-modal form");
  addListFormElement.addEventListener("submit", handleAddListFormSubmit);
}

/**
 * Listener for submitting the change list form.
 */
export function listenToSubmitOnChangeListForm() {
  const changeListFormElement = document.querySelector(
    "#change-list-modal form"
  );
  changeListFormElement.addEventListener("submit", handleChangeListFormSubmit);
}

/**
 * Listener for clicking on the list name to edit it.
 * @param {Object} list - Object representing a list.
 */
function listenToClickOnChangeListButton(list) {
  const changeListButtonElement = document.querySelector(
    `#list-${list.id} [slot='list-name']`
  );
  changeListButtonElement.addEventListener(
    "click",
    handleChangeListButtonClick
  );
}

/**
 * Listener for clicking on the delete list button.
 * @param {Object} list - Object representing a list.
 */
function listenToClickOnDeleteListButton(list) {
  const deleteListButtonElement = document.querySelector(
    `#list-${list} [slot='remove-list-button']`
  );
  deleteListButtonElement.addEventListener(
    "click",
    handleDeleteListButtonClick
  );
}

/**
 * Listener for drag and drop events on lists.
 */
export function listenToDragOnList() {
  const listsContainerElement = document.querySelector("#lists-container");
  Sortable.create(listsContainerElement, {
    animation: 250,
    onEnd: handleListDragEnd,
  });
}

// --------------------------------------
// Event Handlers (Gestionnaires d'événements)
// --------------------------------------

/**
 * Event handler for clicking the add list button.
 */
function handleAddListButtonClick() {
  openAddListModal();
}

/**
 * Event handler for clicking on the list name to edit it.
 * @param {Event} event - Click event.
 */
function handleChangeListButtonClick(event) {
  const listName = event.currentTarget;
  const changeListFormElement = document.querySelector(
    "#change-list-modal form .name-input"
  );
  changeListFormElement.placeholder = listName.innerHTML;
  const listIdElement = listName.closest(".list");
  const listId = Number(listIdElement.id.substring(5));

  openChangeListModal(listId);
}

/**
 * Event handler for submitting the add list form.
 * @param {Event} event - Form submission event.
 */
async function handleAddListFormSubmit(event) {
  event.preventDefault();

  const addListFormElement = document.querySelector("#add-list-modal form");
  const addListFormData = new FormData(addListFormElement);
  const listToAdd = Object.fromEntries(addListFormData);

  const newList = await createList(listToAdd);

  if (newList) {
    addListToListsContainer(newList);

    addListFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la création de la liste...");
  }
}

/**
 * Event handler for submitting the change list form.
 * @param {Event} event - Form submission event.
 */
async function handleChangeListFormSubmit(event) {
  event.preventDefault();
  const changeListFormElement = document.querySelector(
    "#change-list-modal form"
  );
  const changeListFormData = new FormData(changeListFormElement);
  const listToChange = Object.fromEntries(changeListFormData);
  const listId = listToChange.list_id;

  const newList = await changeList(listId, listToChange);

  if (newList) {
    updateListDom(listId, listToChange);

    changeListFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la modification de la liste...");
  }
}

/**
 * Event handler for the end of a list drag and drop.
 * @param {Object} evt - Object representing the drag and drop event.
 */
async function handleListDragEnd(evt) {
  const listElementList = document.querySelectorAll(".list");

  let position = 0;
  for (const listElement of listElementList) {
    const idListElement = listElement.id;
    const listId = idListElement.substring(5);

    const newList = await changeList(listId, { position: position });
    position++;
  }
}

/**
 * Event handler for clicking the delete list button.
 * @param {Event} event - Click event.
 */
async function handleDeleteListButtonClick(event) {
  const clickOnDeleteButton = event.currentTarget;
  const listDeleteElement = clickOnDeleteButton.closest("[slot='list-id']");
  const listId = listDeleteElement.id.substring(5);

  const deletingList = await deleteList(listId);

  if (deletingList) {
    listDeleteElement.remove();
  } else {
    alert("Un problème est survenu lors de la suppression de la liste...");
  }
}

// --------------------------------------
// DOM Modification (Modification du DOM)
// --------------------------------------

/**
 * Initializes lists from API data.
 */
export async function initLists() {
  const lists = await getLists();

  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}

/**
 * Opens the add list modal.
 */
function openAddListModal() {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
}

/**
 * Opens the change list modal.
 * @param {number} listId - ID of the list to edit.
 */
function openChangeListModal(listId) {
  const changeListModalElement = document.querySelector("#change-list-modal");
  changeListModalElement.classList.add("is-active");

  const listIdFormInputElement =
    changeListModalElement.querySelector("[name='list_id']");
  listIdFormInputElement.value = listId;
}

/**
 * Adds a list to the list container.
 * @param {Object} list - Object representing a list.
 */
function addListToListsContainer(list) {
  const listTemplate = document.querySelector("#list-template");
  const listTemplateContent = listTemplate.content;
  const clonedListTemplate = listTemplateContent.cloneNode(true);

    const slotListNameElement =
    clonedListTemplate.querySelector("[slot='list-name']");
  slotListNameElement.textContent = list.name;

  const slotListIdElement =
    clonedListTemplate.querySelector("[slot='list-id']");
  slotListIdElement.setAttribute("id", `list-${list.id}`);

  const listsContainerElement = document.querySelector("#lists-container");
  listsContainerElement.append(clonedListTemplate);

  listenToClickOnAddCardButton(list.id);

  listenToClickOnChangeListButton(list);

  listenToClickOnDeleteListButton(list.id);

  if (list.cards) {
    list.cards.forEach((card) => {
      addCardToList(card);
    });
  }

  const cardsContainerElement =
    slotListIdElement.querySelector(".message-body");
  Sortable.create(cardsContainerElement, {
    animation: 250,
    group: "cards",
    onEnd: (event) => {
      orderCards(event.to);
      if (event.from !== event.to) {
        orderCards(event.from);
      }
    },
  });
}

/**
 * Updates the list's DOM representation.
 * @param {number} listId - ID of the list to update.
 * @param {Object} listToChange - Object representing the changes to apply to the list.
 */
function updateListDom(listId, listToChange) {
  if (listToChange.name) {
    const listSlotName = document.querySelector(
      `#list-${listId} [slot='list-name']`
    );
    listSlotName.innerHTML = listToChange.name;
  }
}

/**
 * Reorders cards within a list.
 * @param {HTMLElement} cardsDestination - Container for cards within the list.
 */
export async function orderCards(cardsDestination) {
  const cardsElementInList = cardsDestination.querySelectorAll(".card");
  const listElement = cardsDestination.closest(".list");
  const listIdElement = listElement.id;
  const listId = listIdElement.substring(5);
  let position = 0;

  for (const card of cardsElementInList) {
    const cardIdElement = card.id;
    const cardId = cardIdElement.substring(5);
    const changingCard = await changeCard(cardId, {
      position: position,
      list_id: listId,
    });

    if (!changingCard) {
      alert("Un problème est survenu lors du réordonnancement des listes");
      break;
    }

    position++;
  }
}
