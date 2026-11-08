import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as localData from '../data/siteData';
import { getPublicContent } from './api';

const ContentContext = createContext(null);

const EMPTY_CONTENT = {
  SITE: {}, NAV: [], TAGLINE: {}, SUBTITLE: {}, STATS: [], SERVICES: [], PROJECTS: [],
  VILLAS: [], PARTNERS_WORLD: [], AFRICA_PARTNERS: [], COMPANIES: [], GALLERY: [],
  ADS: [], ads: [], VIDEOS: [], YAYE_SLIDES: [], COMPANY_INTRO: {},
};

function getLocalContent() {
  const source = localData;
  return { ...EMPTY_CONTENT, ...source };
}

function normalizeApiContent(response, local) {
  if (!response || typeof response !== 'object') return {};

  const payload =
    response.data && typeof response.data === 'object' && !Array.isArray(response.data)
      ? response.data
      : response.content && typeof response.content === 'object' && !Array.isArray(response.content)
        ? response.content
        : response;
  const blocks = payload.blocks && typeof payload.blocks === 'object' ? payload.blocks : {};
  const site = { ...(blocks.site || {}), ...(payload.SITE || {}), ...(payload.site || {}) };
  const partners = payload.partners || {};

  return {
    SITE: Object.keys(site).length ? site : local.SITE,
    NAV: local.NAV,
    TAGLINE: blocks.tagline || payload.TAGLINE || local.TAGLINE,
    SUBTITLE: blocks.subtitle || payload.SUBTITLE || local.SUBTITLE,
    STATS: Array.isArray(blocks.stats) ? blocks.stats : local.STATS,
    SERVICES: Array.isArray(payload.services) ? payload.services : local.SERVICES,
    PROJECTS: Array.isArray(payload.projects) ? payload.projects : local.PROJECTS,
    VILLAS: Array.isArray(payload.villas) ? payload.villas : local.VILLAS,
    PARTNERS_WORLD: Array.isArray(partners.world) ? partners.world : local.PARTNERS_WORLD,
    AFRICA_PARTNERS: Array.isArray(partners.africa) ? partners.africa : local.AFRICA_PARTNERS,
    COMPANIES: Array.isArray(payload.companies) ? payload.companies : local.COMPANIES,
    GALLERY: Array.isArray(payload.gallery) ? payload.gallery : local.GALLERY,
    ADS: Array.isArray(payload.ads) ? payload.ads : local.ADS,
    ads: Array.isArray(payload.ads) ? payload.ads : (local.ADS || []),
    VIDEOS: Array.isArray(payload.videos) ? payload.videos : local.VIDEOS,
    YAYE_SLIDES: Array.isArray(blocks.yayeSlides) ? blocks.yayeSlides : local.YAYE_SLIDES,
    COMPANY_INTRO: blocks.companyIntro || local.COMPANY_INTRO,
    CONSORTIUM: blocks.consortium || local.CONSORTIUM,
    STRATEGY: blocks.strategy || local.STRATEGY,
    OPERATIONS: Array.isArray(blocks.operations) ? blocks.operations : local.OPERATIONS,
    INVEST_CAPACITY: Array.isArray(blocks.investCapacity) ? blocks.investCapacity : local.INVEST_CAPACITY,
    COMMITMENTS: Array.isArray(blocks.commitments) ? blocks.commitments : local.COMMITMENTS,
    AFRICA_OPPS: blocks.africaOpps || local.AFRICA_OPPS,
    OBJECTIVES: Array.isArray(blocks.objectives) ? blocks.objectives : local.OBJECTIVES,
    AMENITIES: Array.isArray(blocks.amenities) ? blocks.amenities : local.AMENITIES,
    LOTISSEMENT: blocks.lotissement || local.LOTISSEMENT,
    ARCH_PHILOSOPHY: blocks.archPhilosophy || local.ARCH_PHILOSOPHY,
    MATERIALS: blocks.materials || local.MATERIALS,
    version: payload.version,
  };
}

function mergeContent(local, remote) {
  const merged = { ...local, ...remote };
  Object.keys(local).forEach((key) => {
    const remoteValue = remote[key];
    if (remoteValue === undefined || remoteValue === null || (Array.isArray(remoteValue) && remoteValue.length === 0)) {
      merged[key] = local[key];
    }
  });
  // Keep the established lowercase alias expected by the home ads carousel.
  merged.ads = remote.ads?.length ? remote.ads : (local.ads || local.ADS || []);
  return merged;
}

export function ContentProvider({ children }) {
  const [remoteContent, setRemoteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const localContent = useMemo(getLocalContent, []);

  const refreshContent = async () => {
    try {
      const response = await getPublicContent();
      setRemoteContent(normalizeApiContent(response, localContent));
      return true;
    } catch (error) {
      console.error('Impossible de rafraîchir les contenus :', error);
      return false;
    }
  };

  useEffect(() => {
    let alive = true;
    getPublicContent()
      .then((response) => {
        if (alive) setRemoteContent(normalizeApiContent(response, localContent));
      })
      .catch((error) => {
        console.warn('GNAH: utilisation des contenus locaux.', error?.message || error);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, [localContent]);

  const content = useMemo(() => mergeContent(localContent, remoteContent), [localContent, remoteContent]);
  const value = useMemo(() => ({ ...content, loading, refreshContent }), [content, loading]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === null) throw new Error('useContent doit être utilisé dans un ContentProvider.');
  return context;
}
