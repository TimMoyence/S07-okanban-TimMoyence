console.log('fetch');

async function showUsersFromAPI(){

  // fetch permet d'accéder à une ressource réseau repérée par son URL
  const userResponse = await fetch("https://jsonplaceholder.typicode.com/users");

  // Une fois la promesse résolue, on récupère un objet représentant la réponse.

  // dans la réponse, on peut voir :
  // si la requête s'est bien passée avec la propriété ok (true si ok, false sinon)
  console.log(userResponse.ok);

  if (userResponse.ok){
    // la méthode asynchrone json de l'objet Response permet d'obenir l'objet javascript repésenté la le JSON contenu dans les corps de la réponse
    const userArray = await userResponse.json();
    console.log(userArray);

    // une fois l'objet récupéré, on peut le manipuler comme on l'habitude de faire pour un objet JavaScript quelconque
    userArray.forEach((user) => {
      const userP = document.createElement('p');
      userP.textContent = user.name,

      document.body.append(userP);
    });
  }
}

showUsersFromAPI();

async function postComment(){

  const myComment = {
    "postId": 1,
    "name": "Team Arancini",
    "email": "teamarancini@oclock.io",
    "body": "Super, quel beau post !"
  };

  const responsePostComment = await fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'post',
    body: JSON.stringify(myComment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  console.log(responsePostComment);

  if (responsePostComment.ok){
    const comment = await responsePostComment.json();
    console.log(`post créé avec l'id ${comment.id}`);
  }else{
    console.error('oups, problème');
  }
}

postComment();


async function showLists(){
  fetch("http://localhost:3000/lists");
}

showLists();
