import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as localData from '../data/siteData';
import { getPublicContent } from './api';

const ContentContext = createContext(null);

const EMPTY_CONTENT = {
  SITE: {},
  NAV: [],
  TAGLINE: {},
  SUBTITLE: {},
  STATS: [],
  SERVICES: [],
  PROJECTS: [],
  VILLAS: [],
  PARTNERS_WORLD: [],
  AFRICA_PARTNERS: [],
  COMPANIES: [],
  GALLERY: [],
  ADS: [],
  VIDEOS: [],
  YAYE_SLIDES: [],
  COMPANY_INTRO: {},
};

function getLocalContent() {
  const source = localData.default || localData.content || localData;
  return {
    ...EMPTY_CONTENT,
    ...source,
    NAV: source?.NAV || [],
    SITE: source?.SITE || {},
    TAGLINE: source?.TAGLINE || {},
    SUBTITLE: source?.SUBTITLE || {},
    STATS: source?.STATS || [],
    SERVICES: source?.SERVICES || [],
    PROJECTS: source?.PROJECTS || [],
    VILLAS: source?.VILLAS || [],
    PARTNERS_WORLD: source?.PARTNERS_WORLD || [],
    AFRICA_PARTNERS: source?.AFRICA_PARTNERS || [],
    COMPANIES: source?.COMPANIES || [],
    GALLERY: source?.GALLERY || [],
    ADS: source?.ADS || [],
    VIDEOS: source?.VIDEOS || [],
    YAYE_SLIDES: source?.YAYE_SLIDES || [],
    COMPANY_INTRO: source?.COMPANY_INTRO || {},
  };
}

function normalizeApiContent(response) {
  const local = getLocalContent();

  if (!response || typeof response !== 'object') {
    return local;
  }

  const payload =
    response.data && typeof response.data === 'object' && !Array.isArray(response.data)
      ? response.data
      : response.content && typeof response.content === 'object' && !Array.isArray(response.content)
        ? response.content
        : response;

  const blocks = payload?.blocks && typeof payload.blocks === 'object' ? payload.blocks : {};
  const site = {
    ...(blocks.site || {}),
    ...(payload?.SITE || {}),
    ...(payload?.site || {}),
  };

  const normalized = {
    ...local,
    ...payload,
    SITE: Object.keys(site).length ? site : local.SITE,
    NAV: local.NAV,
    TAGLINE: blocks.tagline || payload?.TAGLINE || local.TAGLINE || {},
    SUBTITLE: blocks.subtitle || payload?.SUBTITLE || local.SUBTITLE || {},
    STATS: Array.isArray(blocks.stats) ? blocks.stats : Array.isArray(payload?.STATS) ? payload.STATS : local.STATS,
    SERVICES: Array.isArray(payload?.services)
      ? payload.services
      : Array.isArray(blocks.services)
        ? blocks.services
        : local.SERVICES,
    PROJECTS: Array.isArray(payload?.projects)
      ? payload.projects
      : Array.isArray(local.PROJECTS)
        ? local.PROJECTS
        : [],
    VILLAS: Array.isArray(payload?.villas) ? payload.villas : local.VILLAS,
    PARTNERS_WORLD: Array.isArray(payload?.partners?.world)
      ? payload.partners.world
      : Array.isArray(payload?.PARTNERS_WORLD)
        ? payload.PARTNERS_WORLD
        : local.PARTNERS_WORLD,
    AFRICA_PARTNERS: Array.isArray(payload?.partners?.africa)
      ? payload.partners.africa
      : Array.isArray(payload?.AFRICA_PARTNERS)
        ? payload.AFRICA_PARTNERS
        : local.AFRICA_PARTNERS,
    COMPANIES: Array.isArray(payload?.companies) ? payload.companies : local.COMPANIES,
    GALLERY: Array.isArray(payload?.gallery) ? payload.gallery : local.GALLERY,
    ADS: Array.isArray(payload?.ads) ? payload.ads : local.ADS,
    VIDEOS: Array.isArray(payload?.videos) ? payload.videos : local.VIDEOS,
    YAYE_SLIDES: Array.isArray(blocks.yayeSlides)
      ? blocks.yayeSlides
      : Array.isArray(payload?.YAYE_SLIDES)
        ? payload.YAYE_SLIDES
        : local.YAYE_SLIDES,
    COMPANY_INTRO: blocks.companyIntro || payload?.COMPANY_INTRO || local.COMPANY_INTRO || {},
  };

  return normalized;
}

function mergeContent(local, remote) {
  const merged = { ...local, ...remote };

  Object.keys(local).forEach((key) => {
    const remoteValue = remote[key];
    const localValue = local[key];

    if (
      remoteValue === undefined ||
      remoteValue === null ||
      (Array.isArray(remoteValue) && remoteValue.length === 0)
    ) {
      merged[key] = localValue;
    }
  });

  return merged;
}

export function ContentProvider({ children }) {
  const [remoteContent, setRemoteContent] = useState({});
  const [loading, setLoading] = useState(true);

  const localContent = useMemo(() => getLocalContent(), []);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        const result = await getPublicContent();
        if (!isMounted) return;
        setRemoteContent(normalizeApiContent(result));
      } catch (error) {
        console.warn('GNAH: utilisation des contenus locaux.', error?.message || error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => mergeContent(localContent, remoteContent), [localContent, remoteContent]);

  const value = useMemo(
    () => ({
      ...content,
      loading,
      refreshContent: async () => {
        try {
          const result = await getPublicContent();
          const next = normalizeApiContent(result);
          setRemoteContent(next);
          return true;
        } catch (error) {
          console.error('Impossible de rafraîchir les contenus :', error);
          return false;
        }
      },
    }),
    [content, loading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);

  if (context === null) {
    throw new Error('useContent doit être utilisé dans un ContentProvider.');
  }

  return context;
}
