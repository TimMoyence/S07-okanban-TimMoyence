- Changer le CSS pour que ce soit plus jolie (vert ? avec un fond)
  
## Comment implémenté avec un user 
1 - Création de la connexion et deconnexion (cf atelier oquiz LordTyger)
  - Création d'un page de connexion et de redirection si personne n'est connecté alors on reviens vers cette page 
  - integration de l'id du user dans le HTML pour récupération par la table
  
2 - Recupération du nom de la table a parti de l'id du user intégré dans le HTML que l'on donne a getTable

3 - Réalisation d'un api et implémentation dans : handleChangeTitleFormSubmint pour permettre de changer le nom de la table, cela ce fait toujours a partir de l'id du user  


## Une fois le client connecté et le projet initialisé 
- Quand on créé une liste il est important d'avoir accès en remontant a l'id du projet pour le créer dans la BDD