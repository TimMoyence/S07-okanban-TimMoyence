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
} from "./projet.js";
import { listenToClickOnLogIn, listenToSubmintLogInForm } from "./user.js";
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
  listenToClickOnLogIn();
  listenToSubmintLogInForm();
}

// --------------------------------------
// Initialisation de l'application
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  listenToUserActions();
  initLists();
});


// Plan d'action (suppression de la carte)

// Objectif : Pouvoir supprimer UNE CARTE PARTICULIERE en cliquant sur le le bouton poubelle de CETTE CARTE PARTICULIERE

// Découpons cela en étapes :
// Il va falloir :
// - écouter le click sur le bouton poubelle de CETTE CARTE PARTICULIERE (dans un listener),
//        - quand ? à la création de CETTE CARTE PARTICULIERE comme ça cela marchera aussi bien pour le cartes CREES à l'initialisation de l'app que les cartes CREES durant l'utilisation de l'app.
// - réagir au click (dans un handler) pour supprimer CETTE CARTE PARTICULIERE correspondante en :
//        - supprimer visuellement CETTE CARTE PARTICULIERE du DOM (dom modifier) -> effet immédiat, visile lors de cette exécution de notre application front,
//        - demander au backend de supprimer CETTE CARTE PARTICULIERE (via fetch) -> effet visible lors des prochaines utilisation de l'app,


// Plan d'action (édition de la carte)

// Objectif : Pouvoir modifier UNE CARTE PARTICULIERE en cliquant sur le le bouton crayon de CETTE CARTE PARTICULIERE

// Découpons cela en étapes :

// Il va falloir :

// - écouter le click sur le bouton crayon de CETTE CARTE PARTICULIERE (dans un listener),
//        - quand ? à la création de CETTE CARTE PARTICULIERE comme ça cela marchera aussi bien pour le cartes CREES à l'initialisation de l'app que les cartes CREES durant l'utilisation de l'app.
// - réagir au click (dans un handler) pour ouvrir une modale permettant de saisir les nouvelles informations de CETTE CARTE PARTICULIERE

// -> transmettre l'id (pour le stocker dans la modale mais aussi venir préremplir le formulaire à partir des informations de la carte présente dans el DOM)

// - écouter la soumission de LA modale d'édition
//        - quand ? au démarrage de l'application (c'est la même modale qui va être utilisée pour éditer toutes les cartes)

// -> transmettre l'id (ça se fait tout seul, il est dans le formulaire)

// - réagir à cette soumission en :
//        - demander au backend de modifier CETTE CARTE PARTICULIERE avec les informations saisies (via fetch) -> effet visible lors des prochaines utilisation de l'app,
//        - modifier visuellement CETTE CARTE PARTICULIERE dans DOM avec le nouveau libellé (dom modifier) -> effet immédiat, visile lors de cette exécution de notre application front,
