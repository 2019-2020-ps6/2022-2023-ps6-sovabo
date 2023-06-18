FROM node:18.16.0-alpine3.17 as build

#GESTION DES FICHIERS
#ON SE PLACE DANS LE WORKDIR

RUN apk add curl

USER node

WORKDIR /home/node/app

# Copie les fichiers package.json et package-lock.json (s'il existe)
COPY --chown=node:node *.json . 

RUN npm install

#INSTALLER CURL POUR LE HEALTHCHECK
RUN npm install 

#COPIER LE FRONT-END
COPY --chown=node:node . .

# RUN mkdir -p /var/lib/xyz c'est nul

EXPOSE 9428

#RUN chown -R node:node /home/node/app

CMD [ "npm", "start" ]