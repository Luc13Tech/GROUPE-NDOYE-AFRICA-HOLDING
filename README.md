# Groupe Ndoye Africa Holding — site public

Site React (PWA, 5 langues : FR / EN / ES / DE / ZH) publié sur Vercel : <https://groupendoyeafrica.com>.

- **Contenu** : lu depuis l'API `https://api.groupendoyeafrica.com/api/content`, géré dans l'administration.
  Si l'API est injoignable, le site affiche sa copie intégrée (`src/data/siteData.js`) : il reste toujours complet.
- **Administration** : espace séparé et sécurisé, <https://api.groupendoyeafrica.com/> (dépôt `GROUPE-NDOYE-AFRICA-HOLDING-Backend-`).
  `groupendoyeafrica.com/admin` y renvoie ; si l'appareil contient des modifications de l'ancien tableau de bord,
  la page propose de les télécharger pour les importer (rien n'est effacé du navigateur).
- Le site ne fait que **lire** : aucun mot de passe, aucune donnée d'administration n'est présent dans ce dépôt.

## Variables Vercel
| Variable | Valeur |
|---|---|
| `REACT_APP_API_URL` | `https://api.groupendoyeafrica.com` (valeur par défaut si absente) |

## Structure
```
public/
  Images/               photos (yaye-dia, entreprises, accueil, logo, icons)
  sw.js                 service worker (incrémenter la version du cache à chaque livraison)
  manifest.json · robots.txt · sitemap.xml · index.html
src/
  App.js                routes ; /admin → AdminMoved
  index.js · index.css  point d'entrée · charte « Terre & Lumière » (Times New Roman)
  data/siteData.js      copie intégrée de TOUT le contenu (mêmes noms que ceux fournis par useContent)
  services/api.js       lecture de l'API (sans cookie)
  services/ContentProvider.js   contenu de l'API, sinon siteData — hook useContent()
  hooks/                useLang (langue), useInView
  utils/i18n.js         aides de traduction
  components/           Navbar, Footer, FloatingButtons, PageHero, Reveal, PWAInstallPrompt
  components/home/      Hero, AdsCarousel, ServiceScenes, VillaCube
  pages/                Home, Services, Projects, Commitments, Partners, Entreprises, Investors,
                        Collaboration, About, Contact, Gallery, Videos, AdminMoved
vercel.json             réécritures SPA et en-têtes de sécurité
```

## Modifier le contenu
1. **Au quotidien** : dans l'administration (textes, services, villas, partenaires, entreprises, projets, galerie, vidéos, publicités).
2. **Copie intégrée** : si `src/data/siteData.js` est modifié, régénérer le contenu du serveur depuis le dépôt backend :
   `npm run import-site-data -- ../GROUPE-NDOYE-AFRICA-HOLDING`. Au redémarrage, le serveur ajoute ce qui manque et
   n'applique une correction que si l'élément n'a pas été modifié dans l'administration.

## Développement
```bash
npm install
npm start          # http://localhost:3000
npm run build
```

## Images référencées mais absentes de `public/Images/yaye-dia/`
`cite-plan-top.jpg`, `cover.jpg`, `cuisine.jpg`, `dechets.jpg`, `master.jpg`, `salon-duplex.jpg`, `villa-f5-facade2.jpg`, `villa-f5.jpg`
— à ajouter dans le dépôt, ou à remplacer depuis l'administration.
