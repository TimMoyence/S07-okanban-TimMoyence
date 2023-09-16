// Ensemble de fonctions permettant la communication avec notre backend :
// - En entrée : des données (sous forme d'objet)
// - En sortie : des données (sous forme d'objet)
import { apiBaseUrl } from "./config.js";

// Fonction pour obtenir la liste des listes depuis le backend
export async function getLists() {
  // Utilisation de la fonction fetch pour émettre une requête GET vers l'URL `${apiBaseUrl}/lists`
  const listsResponse = await fetch(`${apiBaseUrl}/lists`);

  // Une fois la réponse obtenue, on parse le JSON contenu dans le corps de la réponse
  const lists = await listsResponse.json();

  return lists;
}

// Fonction pour créer une nouvelle liste dans le backend
export async function createList(newList) {
  // Envoi d'une requête POST vers l'URL `${apiBaseUrl}/lists` avec le contenu de la nouvelle liste
  const response = await fetch(`${apiBaseUrl}/lists`, {
    method: "post",
    body: JSON.stringify(newList),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), la création a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const createdList = await response.json();

  return createdList;
}

// Fonction pour créer une nouvelle carte dans le backend
export async function createCard(newCard) {
  // Envoi d'une requête POST vers l'URL `${apiBaseUrl}/cards` avec le contenu de la nouvelle carte
  const response = await fetch(`${apiBaseUrl}/cards`, {
    method: "post",
    body: JSON.stringify(newCard),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), la création a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const createdCard = await response.json();

  return createdCard;
}

// Fonction pour mettre à jour une carte existante dans le backend
export async function updateCard(cardId, newCardData) {
  // Envoi d'une requête PATCH vers l'URL `${apiBaseUrl}/cards/${cardId}` avec les données de la carte à mettre à jour
  const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: "PATCH",
    body: JSON.stringify(newCardData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), la mise à jour a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const updatedCard = await response.json();

  return updatedCard;
}

// Fonction pour changer les données d'une carte existante dans le backend
export async function changeCard(changeCardId, changeCardObject) {
  // Envoi d'une requête PATCH vers l'URL `${apiBaseUrl}/cards/${changeCardId}` avec les nouvelles données de la carte
  const response = await fetch(`${apiBaseUrl}/cards/${changeCardId}`, {
    method: "PATCH",
    body: JSON.stringify(changeCardObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), le changement a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const changingCard = await response.json();

  return changingCard;
}

// Fonction pour supprimer une carte existante dans le backend
export async function deleteCard(cardId) {
  // Envoi d'une requête DELETE vers l'URL `${apiBaseUrl}/cards/${cardId}`
  const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), la suppression a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const deletingCard = await response.json();

  return deletingCard;
}

// Fonction pour changer les données d'une liste existante dans le backend
export async function changeList(newList, listToChange) {
  // Envoi d'une requête PATCH vers l'URL `${apiBaseUrl}/lists/${newList}` avec les nouvelles données de la liste
  const response = await fetch(`${apiBaseUrl}/lists/${newList}`, {
    method: "PATCH",
    body: JSON.stringify(listToChange),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), le changement a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const changeList = await response.json();

  return changeList;
}

// Fonction pour supprimer une liste existante dans le backend
export async function deleteList(listId) {
  // Envoi d'une requête DELETE vers l'URL `${apiBaseUrl}/lists/${listId}`
  const response = await fetch(`${apiBaseUrl}/lists/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Si la réponse n'a pas un code HTTP 200 (OK), la suppression a échoué, on renvoie null
  if (!response.ok) {
    return null;
  }

  const deletingCard = await response.json();

  return deletingCard;
}

// Fonction pour récupérer le titre d'une table depuis le backend
export async function getProject(id) {
  const projectResponse = await fetch(`${apiBaseUrl}/project/${id}`);
  const project = await projectResponse.json();

  return project;
}


export async function logIn(log){
  const response = await fetch(`${apiBaseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    return null;
  }

  const logIn = await response.json();

  return logIn;
}


export async function signUp(signUp){
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: "POST",
    body: JSON.stringify(signUp),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(response)
  if (!response.ok) {
    return null;
  };

  const signUpInformation = await response.json()
  
  return signUpInformation;
}

