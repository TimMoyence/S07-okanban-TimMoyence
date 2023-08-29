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

// --------------------------------------
// Event Handler (écouteurs d'évènements)
// --------------------------------------
function handleAddListButtonClick(){
  openAddListModal();
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

// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
listenToClickOnAddListButton();
