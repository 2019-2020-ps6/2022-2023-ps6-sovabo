FROM node:18.16.0-alpine3.17 as build

ARG BACKEND_URL


#GESTION DES FICHIERS
#ON SE PLACE DANS LE WORKDIR
USER node
WORKDIR /home/node/app

# Copie les fichiers package.json et package-lock.json (s'il existe)
COPY --chown=node:node *.json . 

# substitute <BACKEND> in server.config.ts

RUN npm install

#COPIER LE FRONT-END ( avec application dockerignore )
COPY --chown=node:node . .

RUN sed -i "s/localhost:9428/${BACKEND_URL}/g" ./src/config/server.config.ts

#ON BUILD LA VERSION FINALE DU FRONT-END
#RUN npm run build --prod 
RUN npm run build:prod
##############################################
#ON CREE UN NOUVEL ENVIRONNEMENT POUR NGINX
FROM nginx:1.21.1-alpine

# Copier le fichier de configuration NGINX
COPY --from=build /home/node/app/nginx.conf /etc/nginx/conf.d/default.conf

# Copier le build de l'application Angular
# dossier dist : contient les fichiers statiques de l'application après le build
COPY --from=build /home/node/app/dist/* /usr/share/nginx/html

# A CE STADE :
# - on build l'application Angular
# - le build de l'application Angular est copié dans le dossier /usr/share/nginx/html
# - le fichier de configuration NGINX est copié dans le dossier /etc/nginx/conf.d/default.conf
# - le serveur NGINX est démarré

#CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
