# Scheduler/décodeur - Projet IOT CESI

## Introduction

Ce projet, sous licence MIT, est une implémentation de deux composants nécessaires au projet IOT proposé par l'école CESI Bordeaux dans le cadre de la formation Développeur informatique 2021 :

- Un *scheduler* (ou planificateur) accédant périodiquement à une service web d'une gateway exposant des informations de capteurs (ou sondes) météorologiques.
- Un décodeur qui convertit les données brutes en provenance de la gateway vers des données exploitables.

## Structure du projet

- Le projet est programmé en JavaScript et repose sur l'environnement d'éxécution backend fourni par [NodeJS](https://nodejs.org/).
- Le point d'entrée du programme est situé dans le fichier source JavaScript [`index.js`](./src/index.js).
- **Potentiellement à modifier** Le fichier `config.json` contient l'URL de la gateway dans la propriété `gatewayUrl`.

### Scheduler

Le scheduler est simplement une utilisation du module NodeJS `node-schedule`. Ce module permet de planifier l'appel à une fonction de manière périodique.

```js
// appelle la fonction "fonctionAppelée" toutes les 4 minutes.
schedule.scheduleJob('*/4 * * * *', fonctionAppelee);
```


