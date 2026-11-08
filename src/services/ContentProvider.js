
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as localData from '../data/siteData';

const ContentContext = createContext(null);

const API_BASE_URL = (
  process.env.REACT_APP_API_URL || 'https://api.groupendoyeafrica.com'
).replace(/\/+$/, '');

const EMPTY_CONTENT = {
  SITE: {},
  YAYE_SLIDES: [],
  PARTNERS_WORLD: [],
  AFRICA_PARTNERS: [],
  COMPANIES: [],
};

function getLocalContent() {
  const source =
    localData.default ||
    localData.content ||
    localData;

  const content = {
    ...EMPTY_CONTENT,
    ...source,
  };

  return content;
}

function normalizeApiContent(response) {
  if (!response || typeof response !== 'object') {
    return {};
  }

  let data = response.data || response.content || response;

  if (data && typeof data === 'object' && data.content) {
    data = data.content;
  }

  if (Array.isArray(data)) {
    const normalized = {};

    data.forEach((item) => {
      if (!item || typeof item !== 'object') return;

      const key = item.key || item.slug || item.name;

      if (key && item.value !== undefined) {
        normalized[key] = item.value;
      }
    });

    return normalized;
  }

  return typeof data === 'object' ? data : {};
}

function mergeContent(local, remote) {
  const merged = {
    ...local,
    ...remote,
  };

  // Les données locales restent disponibles
  // lorsqu'une donnée distante est absente ou vide.
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

  const localContent = useMemo(
    () => getLocalContent(),
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/content`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erreur API contenu : ${response.status}`
          );
        }

        const result = await response.json();

        const normalized = normalizeApiContent(result);

        setRemoteContent(normalized);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn(
            'GNAH : utilisation des contenus locaux.',
            error.message
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      controller.abort();
    };
  }, []);

  const content = useMemo(
    () => mergeContent(localContent, remoteContent),
    [localContent, remoteContent]
  );

  const value = useMemo(
    () => ({
      ...content,
      loading,
      refreshContent: async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/content`,
            {
              headers: {
                Accept: 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
          }

          const result = await response.json();

          setRemoteContent(normalizeApiContent(result));

          return true;
        } catch (error) {
          console.error(
            'Impossible de actualiser les contenus :',
            error
          );

          return false;
        }
      },
    }),
    [content, loading]
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (context === null) {
    throw new Error(
      'useContent doit être utilisé dans un ContentProvider.'
    );
  }

  return context;
}
