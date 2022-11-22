.SILENT:

.PHONY: install

.env: .env.dev ## Copie le fichier .env.example et le renomme en .env à la racine du projet
	cp .env.dev .env

./public/.htaccess: ./src/config/.htaccess.example
	cp ./src/config/.htaccess.example ./public/.htaccess

install: .env ./src/config/.htaccess
	echo "installations des dépendances"
	npm install --legacy-peer-deps