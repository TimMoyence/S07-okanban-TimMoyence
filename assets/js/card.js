// ensemble de fonction permettant la gestion des cartes
import { closeModals } from "./utils.js";
import {createCard, deleteCard } from './api.js';

// --------------------------------------
// Event Listening (sélection d'élément et mise en écoute d'évènement)
// --------------------------------------

export function listenToSubmitOnAddCardForm(){
  const addCardFormElement = document.querySelector('#add-card-modal form');

  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
}

export function listenToClickOnAddCardButton(listId){
  // je récupère le bouton + de la liste,
  const addCardButtonElement = document.querySelector(`#list-${listId} [slot='add-card-button']`);

  // on associe l'écouteur d'évènement au click sur ce bouton
  addCardButtonElement.addEventListener('click', handleAddCardButtonClick);
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
  cardToAdd.color = "#FF00FF";

  const createdCard = await createCard(cardToAdd);

  addCardToList(cardToAdd);

  if (createdCard){
    // on réinitialise le formulaire
    addCardFormElement.reset();
    // on ferme les modales
    closeModals();
  }else{
    alert ('un problème est survenu lors de la création de la carte...');
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

export function addCardToList(card){
  // on récupère l'emplacement où insérer la carte
  const cardsContainerElement = document.querySelector(`#list-${card.list_id} [slot='list-content']`);

  // on récupèrele template
  const cardTemplate = document.querySelector('#card-template');
  // on accède à son contenu
  const cardTemplateContent = cardTemplate.content;
  // on en crée une copie
  const clonedCardTemplate = cardTemplateContent.cloneNode(true);
  console.log('template', clonedCardTemplate);
  const clonedCardElement = clonedCardTemplate.querySelector('.card');



  console.log('element du template', clonedCardElement);

  // on modifie le template avec les infos de la carte à créer
  // description de la carte :
  const slotCardDescriptionElement = clonedCardElement.querySelector("[slot='card-description']");
  console.log(slotCardDescriptionElement);
  slotCardDescriptionElement.textContent = card.description;
  // id de la carte :
  clonedCardElement.setAttribute("id", `card-${card.id}`);


  // on ajoute la copie du template
  cardsContainerElement.append(clonedCardElement);

  // on récupère le bouton
  const removeCardButtonElement = clonedCardElement.querySelector("[slot='remove-card-button']");
  console.log(removeCardButtonElement);

  // on écoute le click
  removeCardButtonElement.addEventListener('click',
    // on réagit dans le handler
    async () => {
      console.log('ça clique sur la carte ' + card.id);

      // on demande à l'api la suppression de la carte
      const deleteCardResult = await deleteCard(card.id);

      if (deleteCardResult){
        // on supprime la carte du DOM
        clonedCardElement.remove();
      }else{
        alert ('suppression impossible');
      }
    });


}
