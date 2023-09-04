// point d'entrée, initialisation de l'application

// un module va pouvoir utiliser un "objet" mis à disposition par un autre module grâce à l'insctruction import
// Ici, on indique que l'on veut importer l'"objet" apiBaseUrl défini dans le module config.js en vue de l'utiliser dans le module courant
import { apiBaseUrl } from "./config.js";
import {
  initLists,
  listenToClickOnAddListButton,
  listenToSubmitOnAddListForm,
  listenToSubmitOnChangeListForm,
  listenToDragOnList,
} from "./list.js";
import { listenToClickOnModalClosingElements } from "./utils.js";
import {
  listenToSubmitOnAddCardForm,
  listenToSubmitOnChangeCardForm,
} from "./card.js";
import {
  listenToClickOnTitle,
  listenToSubmintOnChangeTitleForm,
} from "./table.js";

// Ton code JavaScript ici !
// console.log(apiBaseUrl);

// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
function listenToUserActions(){
  listenToClickOnAddListButton();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
  listenToSubmitOnChangeListForm();
  listenToSubmitOnChangeCardForm();
  listenToDragOnList();
  listenToClickOnTitle();
  listenToSubmintOnChangeTitleForm();
}

// --------------------------------------
// Initialisation de l'application
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  listenToUserActions();
  initLists();
});
