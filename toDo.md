- Changer le CSS pour que ce soit plus jolie (vert ? avec un fond)
  
## Comment implémenté avec un user 
### Connexion
1 [ ] - Création de la connexion et deconnexion (cf atelier oquiz LordTyger)
  - [x] Création d'une modal de connexion et de redirection si personne n'est connecté alors on reviens vers cette page 
  - [ ] integration de l'id du user dans le HTML pour récupération par la table
  
2 [ ] - Recupération du nom de la table a parti de l'id du user intégré dans le HTML que l'on donne a getTable

3 [ ] - Réalisation d'un api et implémentation dans : handleChangeTitleFormSubmint pour permettre de changer le nom de la table, cela ce fait toujours a partir de l'id du user  

### Register

1 [ ] -  Ouverture et gestion de la modal sign Up 


## Une fois le client connecté et le projet initialisé 
- [ ] Quand on créé une liste il est important d'avoir accès en remontant a l'id du projet pour le créer dans la BDD


fin journée 16 septembre : ToDO prochaines étape 
Le login fonctionne
Le **register coté front** A voir comment récupérer dans le login les information necessaire pour avoir tous ce dont on a besoin coté front pour le titre et le projet et le logout 

- Un fois cela réaliser je vais pouvoir récupérer toutes le infos des table et des table de laisons pour les rendre dispo lors du login et donc avoir un user avec son okanban 
- ensuite il faudra appeler les fonction au bon endroit (la création des listes, des card etc après le login car on recupe a ce moment les card et liste associé a la personne (et pas avant))

## ++ 
Le **register coté back** ferifier si coté back on a les card et les Label (a voir a la fin)