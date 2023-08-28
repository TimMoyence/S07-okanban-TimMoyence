// Exemple 1 : Mise à jour d'un élément dans le DOM

// on récupère l'élément dans le DOM (ici, par son nom d'élément)
const titleElement = document.querySelector('h1');

// manipulation des classes d'un élément grâce à al proprité classList
// cf la doc : https://developer.mozilla.org/fr/docs/Web/API/Element/classList
titleElement.classList.add('title');

// on met à jour l'élément
titleElement.textContent = "Todo List...";

// Exemple 2 : Réaction à une action utilisateur (Ici, réaction au click sur un bouton)

// on récupère l'élément dans le DOM (ici, par sa classe)
const deleteAllButtonElement = document.querySelector('.button-deleteall');

// on prépare un gestionnaire / écouteur d'évènement (une fonction)
const handleDeleteAllButtonElementClick = () => {
  console.log('je dois supprimer toutes les taches');

  // récupérer toutes les taches
  const taskElementList = document.querySelectorAll('.taskitem');

  // suprimer chacune des taches
  /*
  for (const taskElement of taskElementList) {
    taskElement.remove();
  }
  */
  taskElementList.forEach((taskElement) => {
    taskElement.remove();
  });

};

// on indique que lorsque le clic se produit sur le bouton deleteAllButtonElement, alors il faudra exécuter la fonction handleDeleteAllButtonElementClick
deleteAllButtonElement.addEventListener('click', handleDeleteAllButtonElementClick);

// Exemple 3 : ajout d'une tâche à la validation du formulaire
const newTaskFormElement = document.querySelector('.newtask-form');


const handleTaskDelete = (event) => {
  // on récupère le lien cliqué
  const clickedLinkElement = event.currentTarget;

  // on remonte à son ancêtre le plus proche qui possède al classe taskitem
  const taskElementToDelete = clickedLinkElement.closest('.taskitem');

  // on supprime cet élément
  taskElementToDelete.remove();
};

const addNewTask = (newTask) => {
  // je récupère mon template (stucture html représentant une tache)
  const taskItemTemplateElement = document.querySelector("#taskitem-template");

  // je le clone afin de pouvoir le personaliser pour la tache à créer
  const taskItemElement = taskItemTemplateElement.content.cloneNode(true).firstElementChild ;

  // dans le clone, je vient injecter le contenu à présenter (ici, le libellé de la tache)
  // note, pour récupérer l'élément à customiser, on utilise un sélecteur d'attribut, cela permet d'encore mieux séparé le fond de la forme
  taskItemElement.querySelector("[slot='task-label']").textContent = newTask.taskname;

  // on récupère une référence à l'élément du DOM qui contient la liste des tâches
  const tasksListElement = document.querySelector('.tasks-list');

  // on injecte le clone du template configuré dans l'élément du DOM qui contient la liste des tâches
  tasksListElement.append(taskItemElement);

  // on récupère le lien de suppression de CETTE tâche
  const taskDeleteElement = taskItemElement.querySelector('.task-delete');

  // on associe l'acouteur d'évènement handleTaskDelete au click sur le lien de suppression
  taskDeleteElement.addEventListener('click', handleTaskDelete);

};


// écouteur d'évènement de la soumission du formulaire newtask-form
const handleNewTaskFormSubmit = (event) => {
  // on empêche que le comportement par défaut du navigateur se produise (effectuer une requete http dans le cas de la soumission d'un formulaire)
  event.preventDefault();

  // on récupère l'élément sur lequel on a attaché l'écouteur d'évènement (ici le formulaire)
  const newTaskFormElement = event.currentTarget;
  console.log(newTaskFormElement);

  // on fabrique un FormData à partir du formulaire
  const newTaskFormData = new FormData(newTaskFormElement);

  // bizarrerie : si on console.log le FormData, on ne voit pas les data
  console.log(newTaskFormData);
  // il faut aller les chercher une à une avec la méthode get des FormData
  console.log(newTaskFormData.get('taskname'));

  // on peut fabriquer un objet contenant les champ du formulaire et les valeurs associée grâce à la méthode fromEntries de la classe Object.
  const formDataObject = Object.fromEntries(newTaskFormData);

  addNewTask(formDataObject);
};

newTaskFormElement.addEventListener('submit', handleNewTaskFormSubmit);









