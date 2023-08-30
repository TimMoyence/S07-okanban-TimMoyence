// ensemble de fonction permettant la communication avec notre back end :
// - en entrée : des données (sous forme d'objet)
// - en sortie : des données (sous forme d'objet)
import { apiBaseUrl } from './config.js';

export async function getLists(){

  // on utilse fetch afin que notre code javascript emette une reqûete en GET vers l'url http://localhost:3000/lists
  // fetch est une fonction asynchrone, on attends son résultat pour continuer
  const listsResponse = await fetch(`${apiBaseUrl}/lists`);

  // une fois la réponse obtenue, on peut parser le json contenu dans le corps de la réponse
  // pour obtenir l'objet (ici, le tableau d'objet) représenté par kle json reçu
  const lists = await listsResponse.json();

  return lists;
}

export async function createList(newList){

  // envoyer une requête en POST sur notre api :
  // Ici, on précise :
  // - quelle ressource on souhaite accéder - grâce à l'url : ici les listes -> /lists
  // - ce que l'on veut y faire - grâce au verbe HTTP : ici ajouter -> POST
  // - avec quelle données - grâce au corps de la requête : ici les infos de la liste à créer.
  const response = await fetch(`${apiBaseUrl}/lists`, {
    method: 'post',
    body: JSON.stringify(newList),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  // si on reçoit autre chose qu'un code 200, c'est que la création a échoué, on renvoit null pour l'indiquer
  if (!response.ok){
    return null;
  }

  const createdList = await response.json();

  return createdList;
}

export async function createCard(newCard){
  const response = await fetch(`${apiBaseUrl}/cards`, {
    method: 'post',
    body: JSON.stringify(newCard),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok){
    return null;
  }

  const createdCard = await response.json();

  return createdCard;
}
