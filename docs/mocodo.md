

---- Première version

```
LISTE: code liste, name, position
CARTE: code carte, description, position, couleur
LABEL: code label, nom, couleur

APPARTIENT, 11 CARTE, 0N LISTE
CHOISIR, 0N LABEL, 0N CARTE

CONTIENT, 11 LISTE, 0N TABLE

USER : code user, email, passaword, firstname, lastname
DETIENT, 11 TABLE, 01 USER
TABLE : code table, name

```


---- Version réorganisé : 

```
:
:
APPARTIENT, 11 CARTE, 0N LISTE
CARTE: code carte, description, position, couleur

USER : code user, email, passaword, firstname, lastname
DETIENT, 11 TABLE, 01 USER
LISTE: code liste, name, position
CHOISIR, 0N LABEL, 0N CARTE

:
TABLE : code table, name
CONTIENT, 11 LISTE, 0N TABLE
LABEL: code label, nom, couleur
```