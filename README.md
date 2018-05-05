# Projet d'expérimentation

## Le principe
Appli web permettant d'organiser des ressources web.

En bonus, le projet permet d'afficher la côte d'une action américaine.

## Les technos
* Angular 5
* Express 4.16
* MongoDB: 3.0

## Le faire fonctionner chez soi

### Prérecquis
* Disposer d'un acces à une basse de données mongoDb (par exemple avec un compte mLab - mlab.com)
* (Bonus: disposer d'un compte Alpha Vantage)
* Avoir node et npm installés

### Etapes
```
git clone https://github.com/Ennoriel/mean-learning.git
cd mean-learning/client
npm i
cd ../server
npm i
```

Créer un ficher keys.json à la racine du dossier server contenant les infos de la base de données gitLab et Alpha Vantage :
```
{
    "mongoHost": "",
    "mongoPort": "",
    "mongoDatabase": "",
    "mongoUser": "",
    "mongoPass": "",
    "alphaVantageApiKey": ""
}
```
Dans deux instances de console différentes :
```
cd client
npm start
```
```
cd server
npm start
```
L'appli est déployé : [http://localhost:4200](http://localhost:4200)

## Backlog

* Ajouter des tags aux objets bookmark & resource
* Passer à Angular 6
* Gérer la possession des bookmarks & resources sur les utilisateurs
* Gérer la pagination des pages
* implémenter la recherche asynchrone des bookmark (cf lien descrption)
* Améliorer la gestion des erreurs back
* Ajouter width + height à l'objet BaseChartConfig
* Ajouter un système de log sur le front
* Ajouter un système de log sur le back
* Faire un test karma
* Créer une tache cyclique
* A la création de compte, créer un deuxième input pour le mot de passe pour vérifier la bonne saisie
* Corriger la méthode updateUser
* Implémenter un service renvoyant une promesse pour recharger app.component (et mettre à jour l'attribut isLogged (se baser sur le service AlertService)
* Pimper le style global
* créer un filtre asynchrone pour vérifier que les identifiants et mots de passe ne sont pas déjà pris (cf lien description)
* Créer un composant d'affichage d'un bookmark
