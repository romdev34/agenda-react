## creation de l'image
> docker build --no-cache . --tag ulysse699/agenda-react:1.0

## Etapes obligatoires dev et build

### installer les vendors en local (idem pour installer un vendor en particulier)
> docker run -ti --rm --name agenda  -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm install

### Lancer le projet en local (si dev local)
> docker run -ti --rm --name agenda -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm run dev

### Création du dossier dist (si projet deployé)
> docker run -it --rm  --name agenda -v $(pwd):/app ulysse699/agenda-react:1.0 npm run build


### Lancer le projet sur le serveur (si projet deployé)
> docker run -ti --rm --name agenda -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm run preview

> créer un fichier .env.local à la racine du projet (local et serveur si besoin de config particulière)
