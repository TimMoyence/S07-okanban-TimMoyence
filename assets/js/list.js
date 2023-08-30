// ensemble de fonction permettant la gestion des listes
import { closeModals } from "./utils.js";
import {listenToClickOnAddCardButton, addCardToList} from "./card.js";
import { getLists, createList, getOneList } from "./api.js";

// --------------------------------------
// Event Listening (sélection d'élément et mise en écoute d'évènement)
// --------------------------------------
export function listenToClickOnAddListButton(){
  // 1 - sélection de l'éléments sur lequel écouter
  const addListButtonElement = document.querySelector('#addlist-button');

  // 2 - association d'un écouteur dévènement pour un type d'évènement sur l'élément
  addListButtonElement.addEventListener("click", handleAddListButtonClick);
}

export function listenToSubmitOnAddListForm(){
  const addListFormElement = document.querySelector('#add-list-modal form');

  addListFormElement.addEventListener('submit', handleAddListFormSubmit);
}

export function listenToSubmitOnChangeListForm() {
  const changeListFormElement = document.querySelector("#change-list-modal form");

  changeListFormElement.addEventListener("submit", handleChangeListFormSubmit);
}

function listenToClickOnChangeListButton(listId) {
  // 1 - sélection de l'éléments sur lequel écouter
    const changeListButtonElement = document.querySelector(
    `#list-${listId} [slot='list-name']`
  );

  // console.log(changeListButtonElement);
  // 2 - association d'un écouteur dévènement pour un type d'évènement sur l'élément
  changeListButtonElement.addEventListener("click", handleChangeListButtonClick);
}


// --------------------------------------
// Event Handler (écouteurs d'évènements)
// --------------------------------------
function handleAddListButtonClick(){
  openAddListModal();
}

function handleChangeListButtonClick(event) {

  // ! J'arrive a récuperer la div
  const listId = event.currentTarget
  openChangeListModal(listId.innerHTML);
}

async function handleAddListFormSubmit(event) {
  event.preventDefault();
 
  // 1 - on recueille les données de l'utilisateur
  const addListFormElement = document.querySelector("#add-list-modal form");

  const addListFormData = new FormData(addListFormElement);
  const listToAdd = Object.fromEntries(addListFormData);

  // 2 - on transmets les données saisies à l'API en lui inquant que faire de ces données (ici, d'ajouter une liste)
  // 3 - on récupère les données retournées par l'API (on connait maintenant l'id de la liste créée)
  // une fois que l'on a recueilli les données de la liste à créer, on peut demander la création de cette liste au backend.
  // ce dernier nous renverra les informations de la liste créées (avec notamment son id)
  // nous pourrons ainsi ajouter CETTE liste à notre interface utilisateur.
  const newList = await createList(listToAdd);

  if (newList) {
    // on met à jour l'interface utilisateur avec les données retournée par l'API
    addListToListsContainer(newList);

    // on réinitialise le formulaire
    addListFormElement.reset();
    // on ferme les modales
    closeModals();
  } else {
    alert("un problème est survenu lors de la création de la liste...");
  }
}

async function handleChangeListFormSubmit(event) {
  event.preventDefault();
  
  // 1 - on recueille les données de l'utilisateur
  const changeListFormElement = document.querySelector("#change-list-modal form");

  const changeListFormData = new FormData(changeListFormElement);
  const listToChange = Object.fromEntries(changeListFormData);
  console.log(listToChange.id);


  // const newList = await changeList(listToChange);

  // if (newList) {
  //   // on met à jour l'interface utilisateur avec les données retournée par l'API
  //   addListToListsContainer(newList);

  //   // on réinitialise le formulaire
  //   changeListFormElement.reset();
  //   // on ferme les modales
  //   closeModals();
  // } else {
  //   alert("un problème est survenu lors de la création de la liste...");
  // }
}


// --------------------------------------
// DOM Modifier (modificateurs du DOM)
// --------------------------------------
export async function initLists(){
  const lists = await getLists();

  lists.forEach((list) => {
    addListToListsContainer(list);
  });
}

function openAddListModal(){
  // on sélectionne l'élément que l'on souhaite modifie
  const addListModalElement = document.querySelector('#add-list-modal');

  // on le modifie
  addListModalElement.classList.add('is-active');
}

function openChangeListModal(name) {
  // on sélectionne l'élément que l'on souhaite modifie
  const addListModalElement = document.querySelector("#change-list-modal");

  // ! test ajout placehorlder
  // const addElementInPlaceholder = document.querySelector(
  //   "#change-list-modal .input"
  // );
  // addElementInPlaceholder.placeholder.add(name); 
  // console.log(addElementInPlaceholder);
  
  // on le modifie
  addListModalElement.classList.add("is-active");
}

function addListToListsContainer(list){
  // console.log(list);

  // on récupèrele template
  const listTemplate = document.querySelector('#list-template');
  // on accède à son contenu
  const listTemplateContent = listTemplate.content;
  // on en crée une copie
  const clonedListTemplate = listTemplateContent.cloneNode(true);

  // on modifie le template avec les infos de la liste à créer
  // nom de la liste :
  const slotListNameElement = clonedListTemplate.querySelector("[slot='list-name']");
  // console.log(slotListNameElement);
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


  // en ecoute du clic du titre de la liste 
  listenToClickOnChangeListButton(list.id);

  // création des cartes associées à la liste s'il y a lieu
  if (list.cards){
    list.cards.forEach((card) => {
      addCardToList(card);
    });
  }
}
