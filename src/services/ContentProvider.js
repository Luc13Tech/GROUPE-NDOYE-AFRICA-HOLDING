import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as localData from '../data/siteData';
import { getPublicContent } from './api';

/**
 * Contenu du site : celui publié depuis l'administration (API) quand il est disponible,
 * sinon les données intégrées au site (src/data/siteData.js), qui restent la copie de secours.
 * Les clés exposées portent les mêmes noms que dans siteData.js.
 */
const ContentContext = createContext(null);

const CACHE_KEY = 'gnah_content_v1';

// Clé du bloc dans l'API → nom de la donnée dans le site.
const BLOCKS = {
  tagline: 'TAGLINE',
  subtitle: 'SUBTITLE',
  stats: 'STATS',
  operations: 'OPERATIONS',
  investCapacity: 'INVEST_CAPACITY',
  commitments: 'COMMITMENTS',
  africaOpps: 'AFRICA_OPPS',
  companyIntro: 'COMPANY_INTRO',
  consortium: 'CONSORTIUM',
  strategy: 'STRATEGY',
  objectives: 'OBJECTIVES',
  amenities: 'AMENITIES',
  lotissement: 'LOTISSEMENT',
  archPhilosophy: 'ARCH_PHILOSOPHY',
  materials: 'MATERIALS',
  yayeSlides: 'YAYE_SLIDES',
  collabBenefits: 'COLLAB_BENEFITS',
  collabTypes: 'COLLAB_TYPES',
  expertiseList: 'EXPERTISE_LIST',
  processSteps: 'PROCESS_STEPS',
  contactSubjects: 'CONTACT_SUBJECTS',
};

// Collection de l'API → nom de la donnée dans le site.
const COLLECTIONS = {
  services: 'SERVICES',
  companies: 'COMPANIES',
  projects: 'PROJECTS',
  gallery: 'GALLERY_ITEMS',
  videos: 'VIDEOS',
  ads: 'ADS',
};

// Données sans lesquelles une section ne peut pas s'afficher : une liste vide garde la version intégrée.
const NEVER_EMPTY = new Set(['YAYE_SLIDES', 'VILLA_TYPES']);

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const sameShape = (remote, local) => (Array.isArray(local) ? Array.isArray(remote) : isObject(remote));

/** Convertit la réponse de l'API au format des données du site. Ce qui manque reste local. */
export function fromApi(payload) {
  if (!isObject(payload) || !isObject(payload.blocks)) return {};
  const out = {};
  const { blocks } = payload;

  if (isObject(blocks.site)) out.SITE = { ...localData.SITE, ...blocks.site };
  for (const [key, name] of Object.entries(BLOCKS)) {
    if (sameShape(blocks[key], localData[name])) out[name] = blocks[key];
  }
  for (const [key, name] of Object.entries(COLLECTIONS)) {
    if (Array.isArray(payload[key])) out[name] = payload[key];
  }
  // Les villas sont identifiées dans le site par leur code (f3, f4, f4-duplex, f5).
  if (Array.isArray(payload.villas)) out.VILLA_TYPES = payload.villas.map((v) => ({ ...v, id: v.code }));
  for (const name of NEVER_EMPTY) if (Array.isArray(out[name]) && out[name].length === 0) delete out[name];
  if (isObject(payload.partners)) {
    if (Array.isArray(payload.partners.world)) out.PARTNERS_WORLD = payload.partners.world;
    if (Array.isArray(payload.partners.africa)) out.AFRICA_PARTNERS = payload.partners.africa;
  }
  out.version = payload.version;
  return out;
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* stockage indisponible : sans conséquence */
  }
}

export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(() => fromApi(readCache()));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getPublicContent()
      .then((payload) => {
        if (!alive) return;
        const next = fromApi(payload);
        if (next.version) {
          setRemote(next);
          writeCache(payload);
        }
      })
      .catch(() => {
        /* API injoignable : le site affiche ses données intégrées */
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => ({ ...localData, ...remote, loading }), [remote, loading]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === null) throw new Error('useContent doit être utilisé dans un ContentProvider.');
  return context;
}
