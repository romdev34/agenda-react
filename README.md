## creation de l'image
> docker build --no-cache . --tag ulysse699/agenda-react:1.0

## Etapes obligatoires dev et build

### installer les vendors en local (idem pour installer un vendor en particulier)
> docker run -ti --rm --name agenda  -v $(pwd):/app -p 80:80 ulysse699/agenda-react:1.0  npm install

### Lancer le projet en local (si dev local) à partir de l'image
> docker run -ti --rm --name agenda -v $(pwd):/app -p 80:80 ulysse699/agenda-react:1.0  npm run dev

### Lancer le projet en local (si dev local) à partir du dockerfile
> docker docker compose -f docker-compose-local.yml up

### Création du dossier dist (si projet deployé)
> docker run -it --rm  --name agenda -v $(pwd):/app ulysse699/agenda-react:1.0 npm run build

### Lancer le projet sur le serveur (si projet deployé)
> docker compose -f docker-compose-prod.yml up

> créer un fichier .env.local à la racine du projet (local et serveur si besoin de config particulière)

### pour supprimer un container lancé
> docker rm agenda
> 
> TODO mettre à jour le docker compose en local