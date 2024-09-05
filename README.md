# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Lancer le container
docker compose up

### si besoin de réinstaller les modules
docker exec -ti agenda npm install

### si problème de dépendences entre les modules on rajoute cela dans le Dockerfile
npm config set legacy-peer-deps true

Puis on relance
docker exec -ti agenda npm install

Pour créer le build jouer par exemple
docker exec -ti agenda npm run build

