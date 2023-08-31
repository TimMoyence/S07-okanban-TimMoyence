// point d'entrée, initialisation de l'application

// un module va pouvoir utiliser un "objet" mis à disposition par un autre module grâce à l'insctruction import
// Ici, on indique que l'on veut importer l'"objet" apiBaseUrl défini dans le module config.js en vue de l'utiliser dans le module courant
import { apiBaseUrl } from "./config.js";
import { initLists, listenToClickOnAddListButton, listenToSubmitOnAddListForm } from "./list.js";
import { listenToClickOnModalClosingElements } from "./utils.js";
import { listenToSubmitOnAddCardForm } from "./card.js";

// Ton code JavaScript ici !
console.log(apiBaseUrl);

// --------------------------------------
// Lancement des fonctions d'event listening
// --------------------------------------
function listenToUserActions(){
  listenToClickOnAddListButton();
  listenToClickOnModalClosingElements();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
}

// --------------------------------------
// Initialisation de l'application
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  listenToUserActions();
  initLists();
});


// Plan d'action

// Objectif : Pouvoir supprimer UNE CARTE PARTICULIERE en cliquant sur le le bouton poubelle de CETTE CARTE PARTICULIERE

// Découpons cela en étapes :
// Il va falloir :
// - écouter le click sur le bouton poubelle de CETTE CARTE PARTICULIERE (dans un listener),
//        - quand ? à la création de CETTE CARTE PARTICULIERE comme ça cela marchera aussi bien pour le cartes CREES à l'initialisation de l'app que les cartes CREES durant l'utilisation de l'app.
// - réagir au click (dans un handler) pour supprimer CETTE CARTE PARTICULIERE correspondante en :
//        - supprimer visuellement CETTE CARTE PARTICULIERE du DOM (dom modifier) -> effet immédiat, visile lors de cette exécution de notre application front,
//        - demander au backend de supprimer CETTE CARTE PARTICULIERE (via fetch) -> effet visible lors des prochaines utilisation de l'app,
