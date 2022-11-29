# Udemy courses management

Retrieve course reviews, comments and questions in a Udemy session, post them on the platform and respond to them directly from the platform.

## Installation des dépendances
- `make install`

## Déploiement
- Build du container en renseignant le port de Nginx
    - `docker build --build-arg PORT=CODE_DU_PORT .`
- lancement du docker-compose
    - `docker-compose up -d`
