// Ensemble de fonctions permettant la gestion des listes et des cartes

// Import des modules nécessaires
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

// Écouteur de clic sur le bouton d'ajout de liste
export function listenToClickOnAddListButton() {
  const addListButtonElement = document.querySelector("#addlist-button");
  addListButtonElement.addEventListener("click", handleAddListButtonClick);
}

// Écouteur de soumission du formulaire d'ajout de liste
export function listenToSubmitOnAddListForm() {
  const addListFormElement = document.querySelector("#add-list-modal form");
  addListFormElement.addEventListener("submit", handleAddListFormSubmit);
}

// Écouteur de soumission du formulaire de modification de liste
export function listenToSubmitOnChangeListForm() {
  const changeListFormElement = document.querySelector(
    "#change-list-modal form"
  );
  changeListFormElement.addEventListener("submit", handleChangeListFormSubmit);
}

// Écouteur de clic sur le nom de la liste pour la modifier
function listenToClickOnChangeListButton(list) {
  const changeListButtonElement = document.querySelector(
    `#list-${list.id} [slot='list-name']`
  );
  changeListButtonElement.addEventListener(
    "click",
    handleChangeListButtonClick
  );
}

// Écouteur de clic sur le bouton de suppression de liste
function listenToClickOnDeleteListButton(list) {
  const deleteListButtonElement = document.querySelector(
    `#list-${list} [slot='remove-list-button']`
  );
  deleteListButtonElement.addEventListener(
    "click",
    handleDeleteListButtonClick
  );
}

// Écouteur de glisser-déposer pour les listes
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

// Gestionnaire de clic sur le bouton d'ajout de liste
function handleAddListButtonClick() {
  openAddListModal();
}

// Gestionnaire de clic sur le nom de la liste pour la modifier
function handleChangeListButtonClick(event) {
  // Récupération du nom de la liste à partir de l'événement
  const listName = event.currentTarget;

  // Mise à jour du champ de formulaire pour le changement de nom
  const changeListFormElement = document.querySelector(
    "#change-list-modal form .name-input"
  );
  changeListFormElement.placeholder = listName.innerHTML;

  // Récupération de l'ID de la liste
  const listIdElement = listName.closest(".list");
  const listId = Number(listIdElement.id.substring(5));

  openChangeListModal(listId);
}

// Gestionnaire de soumission du formulaire d'ajout de liste
async function handleAddListFormSubmit(event) {
  event.preventDefault();

  // Récupération des données du formulaire
  const addListFormElement = document.querySelector("#add-list-modal form");
  const addListFormData = new FormData(addListFormElement);
  const listToAdd = Object.fromEntries(addListFormData);

  const newList = await createList(listToAdd);

  if (newList) {
    // Mise à jour de l'interface utilisateur avec les données de la liste créée
    addListToListsContainer(newList);

    // Réinitialisation du formulaire et fermeture des modales
    addListFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la création de la liste...");
  }
}

// Gestionnaire de soumission du formulaire de modification de liste
async function handleChangeListFormSubmit(event) {
  event.preventDefault();

  // Récupération des données du formulaire
  const changeListFormElement = document.querySelector(
    "#change-list-modal form"
  );
  const changeListFormData = new FormData(changeListFormElement);
  const listToChange = Object.fromEntries(changeListFormData);
  const listId = listToChange.list_id;

  const newList = await changeList(listId, listToChange);

  if (newList) {
    // Mise à jour de l'interface utilisateur avec les données de la liste modifiée
    updateListDom(listId, listToChange);

    // Réinitialisation du formulaire et fermeture des modales
    changeListFormElement.reset();
    closeModals();
  } else {
    alert("Un problème est survenu lors de la modification de la liste...");
  }
}

// Gestionnaire de fin de glisser-déposer pour les listes
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

// Gestionnaire de clic sur le bouton de suppression de liste
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

// Initialisation des listes à partir des données de l'API
export async function initLists() {
  const lists = await getLists();

  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}

// Ouverture de la modale d'ajout de liste
function openAddListModal() {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
}

// Ouverture de la modale de modification de liste
function openChangeListModal(listId) {
  const changeListModalElement = document.querySelector("#change-list-modal");
  changeListModalElement.classList.add("is-active");

  // Indication de l'identifiant de la liste dans le champ caché du formulaire
  const listIdFormInputElement =
    changeListModalElement.querySelector("[name='list_id']");
  listIdFormInputElement.value = listId;
}

// Ajout d'une liste dans le conteneur de listes
function addListToListsContainer(list) {
  // Récupération du modèle de liste
  const listTemplate = document.querySelector("#list-template");
  const listTemplateContent = listTemplate.content;
  const clonedListTemplate = listTemplateContent.cloneNode(true);

  // Modification du modèle avec les informations de la liste à créer
  // Nom de la liste :
  const slotListNameElement =
    clonedListTemplate.querySelector("[slot='list-name']");
  slotListNameElement.textContent = list.name;

  // ID de la liste :
  const slotListIdElement =
    clonedListTemplate.querySelector("[slot='list-id']");
  slotListIdElement.setAttribute("id", `list-${list.id}`);

  // Récupération du conteneur de listes
  const listsContainerElement = document.querySelector("#lists-container");
  listsContainerElement.append(clonedListTemplate);

  // Écoute du clic sur le bouton d'ajout de carte lors de la création de la liste
  listenToClickOnAddCardButton(list.id);

  // Écoute du clic sur le titre de la liste pour la modifier
  listenToClickOnChangeListButton(list);

  // Écoute du clic sur le bouton de suppression de liste
  listenToClickOnDeleteListButton(list.id);

  // Création des cartes associées à la liste si elles existent
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

// Mise à jour du DOM de la liste
function updateListDom(listId, listToChange) {
  if (listToChange.name) {
    const listSlotName = document.querySelector(
      `#list-${listId} [slot='list-name']`
    );
    listSlotName.innerHTML = listToChange.name;
  }
}

// Réordonner les cartes dans une liste
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
