import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';
import useInView from '../../hooks/useInView';
import { useContent } from '../../services/ContentProvider';
import { makeTl } from '../../utils/i18n';

const P = '/Images/yaye-dia/';
const LABELS = {
  facade: ['Façade', 'Façade', 'Fachada', 'Fassade', '立面'],
  night: ['Vue de nuit', 'Night view', 'Vista nocturna', 'Nachtansicht', '夜景'],
  plan: ['Plan', 'Plan', 'Plano', 'Grundriss', '平面图'],
  aerial: ['Vue aérienne', 'Aerial view', 'Vista aérea', 'Luftaufnahme', '鸟瞰图'],
  model: ['Modèle 3D', '3D model', 'Modelo 3D', '3D-Modell', '3D模型'],
  arch: ['Architecture', 'Architecture', 'Arquitectura', 'Architektur', '建筑'],
  terrace: ['Terrasse', 'Terrace', 'Terraza', 'Terrasse', '露台'],
  ground: ['Plein pied', 'Single storey', 'Planta baja', 'Erdgeschoss', '平层'],
  overview: ['Vue générale', 'Overview', 'Vista general', 'Gesamtansicht', '全景'],
  living: ['Salon', 'Living room', 'Salón', 'Wohnzimmer', '客厅'],
  kitchen: ['Cuisine', 'Kitchen', 'Cocina', 'Küche', '厨房'],
  interior: ['Intérieur', 'Interior', 'Interior', 'Innenraum', '室内'],
  design: ['Design', 'Design', 'Diseño', 'Design', '设计'],
  vision: ['Vision', 'Vision', 'Visión', 'Vision', '愿景'],
  life: ['Cadre de vie', 'Living environment', 'Entorno de vida', 'Wohnumfeld', '生活环境'],
};
const LANG_INDEX = { fr: 0, en: 1, es: 2, de: 3, zh: 4 };
const E = (key, file) => ({ key, url: P + file });

// Vues complémentaires par modèle (fichiers déjà présents dans public/Images/yaye-dia/). La façade et le plan viennent des données.
const VIEWS = {
  f3: { exterior: [E('aerial', 'cite-vue-aerienne.jpg'), E('model', 'cite-yaye-dia-3D.jpg'), E('arch', 'architecture.jpg'), E('vision', 'vision.jpg')], interior: [] },
  f4pp: {
    exterior: [E('facade', 'villa-f4pp-facade.jpg'), E('ground', 'villa-f4-plein-pied.jpg'), E('overview', 'villa-f4pp.jpg'), E('plan', 'villa-f4pp-plan2.jpg')],
    interior: [E('living', 'salon-f4.jpg'), E('interior', 'salon-f4-interieur.jpg'), E('kitchen', 'cuisine-luxe.jpg'), E('design', 'design.jpg'), E('vision', 'vision.jpg'), E('plan', 'villa-f4pp-plan3.jpg')],
  },
  f4duplex: {
    exterior: [E('night', 'villa-f4duplex-nuit.jpg'), E('aerial', 'cite-vue-aerienne.jpg'), E('model', 'architecture-model-villa.jpg')],
    interior: [E('living', 'salon-f4.jpg'), E('interior', 'salon-f4-interieur.jpg'), E('kitchen', 'cuisine-luxe.jpg'), E('design', 'design.jpg'), E('vision', 'vision.jpg')],
  },
  f5: {
    exterior: [E('facade', 'villa-f5-facade3.jpg'), E('terrace', 'villa-f5-terrasse.jpg'), E('plan', 'villa-f5-terrasse-plan.jpg'), E('aerial', 'villa-f5-plan-aerien.jpg')],
    interior: [E('design', 'design.jpg'), E('kitchen', 'cuisine-luxe.jpg'), E('life', 'cadre-vie.jpg'), E('interior', 'salon-f4-interieur.jpg'), E('vision', 'vision.jpg')],
  },
};
const TAB_LABEL = { f3: 'F3', f4pp: 'F4 PP', f4duplex: 'F4 Duplex', f5: 'F5' };

function buildFaces(villa, mode) {
  const extra = VIEWS[villa.id] || { exterior: [], interior: [] };
  const base = mode === 'interior' ? extra.interior : [{ key: 'facade', url: villa.img }, { key: 'plan', url: villa.planImg }, ...extra.exterior];
  const seen = new Set();
  const list = base.filter((f) => f.url && !seen.has(f.url) && seen.add(f.url));
  if (!list.length) return [];
  return Array.from({ length: 6 }, (_, i) => list[i % list.length]);
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function VillaCube() {
  const { lang } = useLang();
  const tl = makeTl(lang);
  const { VILLA_TYPES, SITE } = useContent();
  const [code, setCode] = useState(VILLA_TYPES[0]?.id);
  const [mode, setMode] = useState('exterior');
  const [stageRef, inView] = useInView({ threshold: 0.15 });
  const cubeRef = useRef(null);
  const rot = useRef({ x: -14, y: -28, vx: 0, vy: 0, drag: false, px: 0, py: 0, last: 0 });

  const villa = VILLA_TYPES.find((v) => v.id === code) || VILLA_TYPES[0];
  const hasInterior = Boolean(villa && (VIEWS[villa.id]?.interior || []).length);
  const activeMode = hasInterior ? mode : 'exterior';
  const faces = useMemo(() => (villa ? buildFaces(villa, activeMode) : []), [villa, activeMode]);

  // Boucle d'animation : inertie après un geste, rotation lente au repos, suspendue hors de l'écran.
  useEffect(() => {
    if (!inView || !cubeRef.current) return undefined;
    const el = cubeRef.current;
    let raf;
    const frame = () => {
      const r = rot.current;
      if (!r.drag) {
        r.y += r.vy;
        r.x = Math.max(-80, Math.min(80, r.x + r.vx));
        r.vy *= 0.94;
        r.vx *= 0.94;
        const still = Math.abs(r.vy) < 0.03 && Math.abs(r.vx) < 0.03;
        if (still && !reducedMotion() && Date.now() - r.last > 2500) {
          r.y += 0.2;
          r.x += (-14 - r.x) * 0.02;
        }
      }
      el.style.transform = `rotateX(${r.x.toFixed(2)}deg) rotateY(${r.y.toFixed(2)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  if (!villa) return null;

  const down = (e) => {
    const r = rot.current;
    r.drag = true;
    r.px = e.clientX;
    r.py = e.clientY;
    r.last = Date.now();
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const r = rot.current;
    if (!r.drag) return;
    const dx = e.clientX - r.px;
    const dy = e.clientY - r.py;
    r.px = e.clientX;
    r.py = e.clientY;
    r.y += dx * 0.45;
    r.x = Math.max(-80, Math.min(80, r.x - dy * 0.45));
    r.vy = dx * 0.45;
    r.vx = -dy * 0.45;
    r.last = Date.now();
  };
  const up = () => {
    rot.current.drag = false;
    rot.current.last = Date.now();
  };
  const key = (e) => {
    if (e.key === 'ArrowLeft') rot.current.vy -= 6;
    if (e.key === 'ArrowRight') rot.current.vy += 6;
    if (e.key === 'ArrowUp') rot.current.vx += 4;
    if (e.key === 'ArrowDown') rot.current.vx -= 4;
    rot.current.last = Date.now();
  };

  const name = (villa[lang] || villa.fr).name;
  const standing = (villa[lang] || villa.fr).standing;
  const features = (villa.features && (villa.features[lang] || villa.features.fr)) || [];
  const rooms = villa.rooms || [];
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent((SITE.waMsg && (SITE.waMsg[lang] || SITE.waMsg.fr)) || '')}`;
  const label = (k) => (LABELS[k] ? LABELS[k][LANG_INDEX[lang] ?? 0] : '');

  return (
    <div className="vc">
      <div
        className="vc__stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label={tl('Cube 3D interactif : faites glisser pour tourner', 'Interactive 3D cube: drag to rotate', 'Cubo 3D interactivo: arrastre para girar', 'Interaktiver 3D-Würfel: zum Drehen ziehen', '交互式3D立方体：拖动旋转')}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={key}
      >
        <div className="vc__shadow" />
        <div className="vc__cube" ref={cubeRef} style={{ transform: 'rotateX(-14deg) rotateY(-28deg)' }}>
          {faces.map((f, i) => (
            <figure className="vc__face" key={`${villa.id}-${activeMode}-${i}`}>
              <img src={f.url} alt="" loading="lazy" draggable={false} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <figcaption>{label(f.key)}</figcaption>
            </figure>
          ))}
        </div>
        <span className="vc__hint">{tl('Faites glisser pour faire tourner la villa', 'Drag to rotate the villa', 'Arrastre para girar la villa', 'Ziehen, um die Villa zu drehen', '拖动以旋转别墅')}</span>
      </div>

      <div>
        <div className="vc__tabs" role="tablist">
          {VILLA_TYPES.map((v) => (
            <button key={v.id} type="button" role="tab" aria-selected={v.id === villa.id} className={`vc__tab${v.id === villa.id ? ' is-on' : ''}`} onClick={() => setCode(v.id)}>
              {TAB_LABEL[v.id] || v.id.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="eyebrow">{standing}</div>
        <h3 className="h2 vc__title">{name}</h3>
        <div className="vc__facts">
          <div><small>{tl('Terrain', 'Plot', 'Parcela', 'Grundstück', '地块')}</small><b>{villa.surface}</b></div>
          <div><small>{tl('Bâti', 'Built area', 'Construido', 'Wohnfläche', '建筑面积')}</small><b>{villa.bati}</b></div>
        </div>
        {hasInterior && (
          <div className="vc__mode" role="group">
            <button type="button" className={activeMode === 'exterior' ? 'is-on' : ''} onClick={() => setMode('exterior')}>{tl('Extérieur', 'Exterior', 'Exterior', 'Außen', '外观')}</button>
            <button type="button" className={activeMode === 'interior' ? 'is-on' : ''} onClick={() => setMode('interior')}>{tl('Intérieur', 'Interior', 'Interior', 'Innen', '室内')}</button>
          </div>
        )}
        {rooms.length > 0 && (
          <div className="vc__rooms">
            {rooms.map((r, i) => (
              <div key={i}><span>{r[lang] || r.fr}</span><b>{r.val}</b></div>
            ))}
          </div>
        )}
        {features.length > 0 && (
          <ul className="vc__list">
            {features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/projets" className="btn btn--dark btn--sm">{tl('Explorer la résidence', 'Explore the residence', 'Explorar la residencia', 'Die Residenz erkunden', '探索住宅区')} <span className="arr">→</span></Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">{tl('Réserver une villa', 'Reserve a villa', 'Reservar una villa', 'Villa reservieren', '预订别墅')}</a>
        </div>
      </div>
    </div>
  );
}
