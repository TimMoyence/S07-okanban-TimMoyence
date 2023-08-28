# Révisions en vrac

## `API REST` 

 -> Interface pour gérer des données qui sont dans une BDD. 

REST = **un ensemble de normes**. Par exemple : 

- les chemins pour accéder aux ressources suivent des conventions précises. 
  - `GET /cards` => obtenir toutes les cartes
  - `POST /lists` => créer une liste
- les données renvoyées sont généralement en JSON et transitent via des requêtes HTTP(S)

## CORS

Cross Origin Ressource Sharing : une sécurité mis en place par le navigateur pour éviter les requêtes vers un backend qui n'autorise pas les requêtes depuis certaines URL. 

En rajoutant côté backend : `app.use(cors('*'));`, on assoupli la politique des CORS pour permettre une requête vers mon backend depuis TOUTES (`*`) les URL. 

## POST Body

Quand on fait une requête, on envoie très généralement un **body**.
On peut choisir le format du body :

- `application/json`
- `application/x-www-form-urlencoded`
- `multipart/form-data`

Le body quand il transite sur le réseau, c'est TOUJOURS du texte. Le header permet de préciser le format de ce texte.

Côté Backend, les BODY parser se chargent de "deserialiser" les données du format texte en object Javascript.

- `application/json` ➡️ `app.use(express.json())`
- `application/x-www-form-urlencoded` ➡️ `app.use(express.urlencoded({ extended: true }))`
- `multipart/form-data` ➡️ `app.use(multer().none())`

Lorsque vous soumettez un FORMULAIRE (`method="POST" action="login"`), alors le body part "naturellement" au format `app.use(express.urlencoded({ extended: true }))`

Avec l'utilisation de `fetch`, on peut à présent CHOISIR le format du body qu'on envoie au backend.
