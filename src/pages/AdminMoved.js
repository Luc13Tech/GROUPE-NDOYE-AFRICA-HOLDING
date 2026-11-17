import React, { useEffect, useMemo } from 'react';
import { API_BASE_URL } from '../services/api';

// Clés de l'ancien tableau de bord, qui enregistrait ses modifications dans ce navigateur.
const LEGACY_KEYS = ['gnah_services', 'gnah_projets', 'gnah_gallery', 'gnah_partners', 'gnah_companies', 'gnah_settings'];
const ADMIN_URL = `${API_BASE_URL}/`;

function readLegacy() {
  const items = {};
  try {
    for (const key of LEGACY_KEYS) {
      const value = localStorage.getItem(key);
      if (value) items[key] = value;
    }
  } catch {
    /* stockage indisponible */
  }
  return items;
}

/**
 * /admin : l'administration est désormais un espace séparé, servi par le serveur sécurisé
 * (api.groupendoyeafrica.com). Si ce navigateur contient encore des modifications de l'ancien
 * tableau de bord, elles sont proposées au téléchargement (rien n'est effacé) pour être importées.
 */
export default function AdminMoved() {
  const legacy = useMemo(readLegacy, []);
  const hasLegacy = Object.keys(legacy).length > 0;

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    if (!hasLegacy) window.location.replace(ADMIN_URL);
    return () => meta.remove();
  }, [hasLegacy]);

  const download = () => {
    const data = { format: 'gnah-legacy-admin', exportedAt: new Date().toISOString(), items: legacy };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'gnah-ancien-tableau-de-bord.json' });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Groupe Ndoye Africa Holding</p>
        <h1 style={styles.title}>Espace d’administration</h1>
        <p style={styles.text}>L’administration du site se trouve désormais à une adresse séparée et sécurisée.</p>
        <a href={ADMIN_URL} style={styles.button} rel="noopener">
          Ouvrir l’administration
        </a>
        {hasLegacy && (
          <div style={styles.legacy}>
            <p style={styles.text}>
              Ce navigateur contient des modifications faites avec l’ancien tableau de bord. Téléchargez-les, puis importez le
              fichier dans la nouvelle administration (rubrique « Sauvegarde ») : seuls les éléments manquants seront ajoutés.
            </p>
            <button type="button" onClick={download} style={styles.secondary}>
              Télécharger les anciennes données
            </button>
          </div>
        )}
        <a href="/" style={styles.back}>
          ← Retour au site
        </a>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20, background: 'var(--ink)', fontFamily: 'var(--font)' },
  card: { width: '100%', maxWidth: 480, padding: 'clamp(28px, 6vw, 44px)', background: 'var(--forest-2)', border: '1px solid var(--line-dark)', borderRadius: 'var(--radius)', color: 'var(--ivory)', textAlign: 'center' },
  eyebrow: { color: 'var(--champagne)', letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '.75rem' },
  title: { fontSize: '1.8rem', fontWeight: 400, margin: '12px 0 10px' },
  text: { color: 'rgba(247,244,238,.78)', lineHeight: 1.7, margin: '0 0 22px' },
  button: { display: 'inline-block', padding: '13px 26px', background: 'var(--champagne)', color: 'var(--ink)', textDecoration: 'none', borderRadius: 6 },
  legacy: { marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line-dark)' },
  secondary: { padding: '11px 20px', background: 'transparent', color: 'var(--champagne-light)', border: '1px solid var(--champagne)', borderRadius: 6, fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer' },
  back: { display: 'block', marginTop: 28, color: 'var(--champagne-light)', textDecoration: 'none' },
};
