async function getListsFromAPI(){

  // on utilse fetch afin que notre code javascript emette une reqûete en GET vers l'url http://localhost:3000/lists
  // fetch est une fonction asynchrone, on attends son résultat pour continuer
  const listsResponse = await fetch(`${apiBaseUrl}/lists`);

  // une fois la réponse obtenue, on peut parser le json contenu dans le corps de la réponse
  // pour obtenir l'objet (ici, le tableau d'objet) représenté par kle json reçu
  const lists = await listsResponse.json();

  console.log(lists);

  // on parcours le tableau (les listes reçues) et pour chacune
  lists.forEach((list) => {
    // on s'appuie sur la fonction addListToListsContainer qui permet de créer dans le DOM une liste à partir des informations qui la caractérise
    addListToListsContainer(list);

    // idem, pour chacune des cartes de chaque liste
    list.cards.forEach((card) => {
      addCardToList(card);
    });
  });

}

getListsFromAPI();
