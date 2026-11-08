# GNAH — plateforme web

Plateforme institutionnelle multilingue de Groupe Ndoye Africa Holding (FR, EN, ES, DE, ZH). Le frontend existant est une application React 18 / Create React App, déployable sur Vercel. Le backend Express et MongoDB est isolé dans `server/` pour Render.

## Organisation actuelle

- `src/pages/` : pages publiques et écrans d’administration.
- `src/components/` : composants réutilisables de navigation, mise en page et accueil.
- `src/data/siteData.js` : contenu initial du site et traductions.
- `src/hooks/` : état partagé, notamment la langue active.
- `src/services/` : accès API et chargement du contenu distant.
- `src/utils/` : fonctions de traduction et helpers sans dépendance React.
- `server/src/` : API Express, authentification, modèles MongoDB et routes métier.
- `public/Images/` : médias historiques du site (respecter la casse `Images`).

Les anciens imports sous `src/pages/FloatingButtons.js` et `services/ContentProvider.js` restent disponibles comme points de compatibilité ; les nouveaux imports doivent viser `src/components/` et `src/services/`.

## Développement local

1. Installer les dépendances du frontend avec `npm ci` à la racine.
2. Copier `.env.example` vers `.env` et garder `REACT_APP_API_URL=http://localhost:4000` en développement.
3. Lancer l'API : `cd server && npm install && cp .env.example .env && npm run dev`.
4. Renseigner une adresse e-mail d'administration, un hash bcrypt de mot de passe, un secret JWT robuste et une URI MongoDB dans `server/.env`.
5. Dans un autre terminal, lancer le frontend avec `npm start`.

Ne jamais committer `.env`, les mots de passe, les clés Cloudinary ou les secrets JWT. L'administration utilise désormais l'API et n'embarque plus de mot de passe par défaut dans le code client.

## Déploiement

- **Vercel** : racine du dépôt, commande de build `npm run build`, variable `REACT_APP_API_URL` définie sur l'URL Render de l'API.
- **Render** : créer un service Web Node à partir du dossier `server`, commande de démarrage `npm start`, puis configurer `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `CLIENT_ORIGIN` et les identifiants Cloudinary.
- L'API expose `GET /api/health`, `GET /api/content`, `POST /api/auth/login`, les routes `/api/ads`, `/api/news`, `/api/analytics` et `/api/media`.

L'authentification protège les opérations d'administration côté serveur. Les identifiants de service doivent être configurés dans Render; l'interface d'administration locale existante utilise encore le stockage navigateur pour certaines listes et doit migrer progressivement vers les endpoints CRUD avant une mise en production complète.
