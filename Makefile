.SILENT:

.PHONY: install

.env: .env.dev ## Copie le fichier .env.example et le renomme en .env à la racine du projet
	cp .env.dev .env

## Si le déploiement se fait sur Apache
## ./public/.htaccess: ./src/config/.htaccess.example
## cp ./src/config/.htaccess.example ./public/.htaccess

## install: .env ./public/.htaccess
install: .env
	echo "copie des fichiers d'environnement"