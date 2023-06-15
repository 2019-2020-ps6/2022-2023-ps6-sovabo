FROM node:18.16.0-alpine3.17 as build

WORKDIR /app

# Copie les fichiers package.json et package-lock.json (s'il existe)
COPY package*.json . 

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers
COPY . .

EXPOSE 4200

CMD [ "npm", "start" ]
