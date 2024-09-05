# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### creation de l'image
docker build --no-cache . --tag ulysse699/agenda-react:1.0

### installer les vendors en local (idem pour installer un vendor en particulier)
docker run -ti --rm --name agenda  -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm install

### Lancer le projet en local
docker run -ti --rm --name agenda -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm run dev

### Lancer le projet sur le serveur
docker run -ti --rm --name agenda -v $(pwd):/app -p 8012:8012 ulysse699/agenda-react:1.0  npm run preview

### créer un fichier .env.local à la racine du projet et modifier le port de l'API
