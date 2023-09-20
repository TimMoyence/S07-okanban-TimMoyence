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
} from "./projet.js";
import {
  listenToClickOnLogIn,
  listenToSubmintLogInForm,
  listenToClickOnSignUp,
  listenToSubmintSignUpForm,
} from "./user.js";


// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
function listenToUserActions() {
  listenToClickOnAddListButton();
  listenToClickOnModalClosingElements();
  listenToClickOnTitle();
  listenToClickOnLogIn();
  listenToClickOnSignUp();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
  listenToSubmitOnChangeListForm();
  listenToSubmitOnChangeCardForm();
  listenToSubmintOnChangeTitleForm();
  listenToSubmintLogInForm();
  listenToSubmintSignUpForm();
  listenToDragOnList();
}

// --------------------------------------
// Initialisation de l'application
// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  listenToUserActions();
  // initLists();
});