# LIVRABLE OPS


Lors de cette semaine à temps plein, nous avons réussi à arriver jusqu'à l'étape 4

- Etape 1 : Done
- Etape 2 : Done 
- Etape 3 : Done
- Etape 4 : Done 

# Explication Etape 4

## Conteneurisations : services


### frontend :

 ce service web angular est configuré pour communiquer avec le service backend via le proxy Apache. L'URL que le service frontend va utilisé est configuré lors de la construction du conteneur.

### backend :

Ce service constitue la partie "serveur" nodejs de l'application. Avec la base de données et la partie routing pour envoyer les données


### apache :

Un serveur proxy apache qui permet de faire la liaison entre le front et le back. Les configurations émises dans le fichier proxy.conf permet de gérer toutes les requêtes provenant de <nomdedomaine>/front/.* vers le service frontend et la même chose pour le service backend

### Configurations

Le server apache écoute sur le port 80 avec comme nom de domaine "localhost" mais cela peut-être changé.

Toutes les requêtes envoyées à localhost/front/.* seront redirigées vers le conteneur frontend défini dans le service.

S'il faut rajouté des routes, cela se fera dans la partie config du fichier proxy.conf :
- une route pour accéder aux résultats playwright lors des lancements des tests par exemple


### Healthcheck

- L'état du backend est vérifié lors du build de l'application afin de vérifié qu'il soit à la fois assez isolé pour garantir la sécurité et accessible pour le front, on effectue cet appel ``http://localhost:9428/api/status`` qui permet au back de retourner un état --> 200 si tout va bien.
En faisant un grep 'ok', on vérifie que l'état retourné est 'ok' donc fonctionnel. Les quelques lignes situées en dessous permettent de retry le healthcheck si jamais il y a un soucis pour X raisons.

- Le frontend quant à lui va vérifier si le serveur proxy apache répond bien, que la configuration fonctionne





## Lancement de l'application

Pour lancer l'application, il suffit de se diriger dans le dossier /ops qui est à la racine du projet et éxecuter la commande : ``./run.sh``
Le lien permettant d'accéder à l'application est le suivant : http://localhost/front/
Le ServerName sovabojesuisbg.com n'est pas fonctionnel car il faut modifier le fichier hosts de la machine hôte pour pouvoir y accéder. 
Cela est dû au fait que le serveur apache écoute sur le port 80 et que le port 80 est déjà utilisé par le serveur apache de la machine hôte. 
Il faudrait donc changer le port d'écoute du serveur apache de la machine hôte pour pouvoir accéder à l'application via le nom de domaine sovabojesuisbg.com
