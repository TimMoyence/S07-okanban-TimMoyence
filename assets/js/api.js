/**
 * Module containing functions for communication with the backend.
 * @module backendCommunication
 */
import { apiBaseUrl } from "./config.js";

/**
 * Gets the list of lists from the backend.
 * @async
 * @function
 * @returns {Promise<Object[] | null>} A promise resolved with an array of objects representing the lists or null in case of failure.
 */
export async function getLists() {
  const listsResponse = await fetch(`${apiBaseUrl}/lists`);
  const lists = await listsResponse.json();
  return lists;
}

/**
 * Creates a new list in the backend.
 * @async
 * @function
 * @param {Object} newList - The data of the new list.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the created list or null in case of failure.
 */
export async function createList(newList) {
  const response = await fetch(`${apiBaseUrl}/lists`, {
    method: "post",
    body: JSON.stringify(newList),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    const createdList = await response.json();
    return createdList;
  }
  return null;
}

/**
 * Creates a new card in the backend.
 * @async
 * @function
 * @param {Object} newCard - The data of the new card.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the created card or null in case of failure.
 */
export async function createCard(newCard) {
  const response = await fetch(`${apiBaseUrl}/cards`, {
    method: "post",
    body: JSON.stringify(newCard),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
  }
  return null;
  const createdCard = await response.json();
  return createdCard;
}

/**
 * Updates an existing card in the backend.
 * @async
 * @function
 * @param {string} cardId - The ID of the card to update.
 * @param {Object} newCardData - The data to update the card with.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the updated card or null in case of failure.
 */
export async function updateCard(cardId, newCardData) {
  const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: "PATCH",
    body: JSON.stringify(newCardData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    const updatedCard = await response.json();
    return updatedCard;
  }
  return null;
  }


/**
 * Changes the data of an existing card in the backend.
 * @async
 * @function
 * @param {string} changeCardId - The ID of the card to change.
 * @param {Object} changeCardObject - The new data for the card.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the changed card or null in case of failure.
 */
export async function changeCard(changeCardId, changeCardObject) {
  const response = await fetch(`${apiBaseUrl}/cards/${changeCardId}`, {
    method: "PATCH",
    body: JSON.stringify(changeCardObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    const changingCard = await response.json();
    return changingCard;
  }
  return null;
}

/**
 * Deletes an existing card in the backend.
 * @async
 * @function
 * @param {string} cardId - The ID of the card to delete.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the deleted card or null in case of failure.
 */
export async function deleteCard(cardId) {
  const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    const deletingCard = await response.json();
    return deletingCard;
  }
  return null;
}

/**
 * Changes the data of an existing list in the backend.
 * @async
 * @function
 * @param {string} newList - The ID of the list to change.
 * @param {Object} listToChange - The new data for the list.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the changed list or null in case of failure.
 */
export async function changeList(newList, listToChange) {
  const response = await fetch(`${apiBaseUrl}/lists/${newList}`, {
    method: "PATCH",
    body: JSON.stringify(listToChange),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
  }
  return null;
  const changeList = await response.json();
  return changeList;
}

/**
 * Deletes an existing list in the backend.
 * @async
 * @function
 * @param {string} listId - The ID of the list to delete.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the deleted list or null in case of failure.
 */
export async function deleteList(listId) {
  // Envoi d'une requête DELETE vers l'URL `${apiBaseUrl}/lists/${listId}`
  const response = await fetch(`${apiBaseUrl}/lists/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    const deletingCard = await response.json();
    return deletingCard;
  }
  return null;
}

/**
 * Gets the title of a project from the backend.
 * @async
 * @function
 * @param {string} id - The ID of the project.
 * @returns {Promise<Object | null>} A promise resolved with the object representing the project or null in case of failure.
 */
export async function getProject(id) {
  const projectResponse = await fetch(`${apiBaseUrl}/project/${id}`);
  const project = await projectResponse.json();
  return project;
}

/**
 * Logs in a user with the provided credentials.
 * @async
 * @function
 * @param {Object} log - User login credentials.
 * @returns {Promise<Object | null>} A promise resolved with the login information or null in case of failure.
 */
export async function logIn(log){
  const response = await fetch(`${apiBaseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    const logIn = await response.json();
    return logIn;
  }
  return null;
}

/**
 * Signs up a new user with the provided information.
 * @async
 * @function
 * @param {Object} signUp - User signup information.
 * @returns {Promise<Object | null>} A promise resolved with the signup information or null in case of failure.
 */
export async function signUp(signUp){
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: "POST",
    body: JSON.stringify(signUp),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    const signUpInformation = await response.json() 
    return signUpInformation;
    }
    return null;
  };

/**
 * Gets session data from the backend.
 * @async
 * @function
 * @returns {Promise<Object | null>} A promise resolved with session data or null in case of failure.
 */
export async function getSession(){
 const response = await fetch(`${apiBaseUrl}/getSessionData`);
 if (response.ok) {
   console.log('JE PASSE PAR LA ')
   const getSessionData = await response.json()
   console.log('Mais pas la')
   
   console.log(getSessionData)
   
   return getSessionData;
};
return null;
}

export async function fetchUserDataWithCookie(userToken) {
  const response = await fetch(`${apiBaseUrl}/getSessionData`, {
    headers: {
      'Authorization': `Bearer ${userToken}`, // Utilisez l'en-tête d'autorisation approprié
    },
  });

  if (response.ok) {
    const getSessionData = await response.json();
    return getSessionData;
  }

  return null;
}
