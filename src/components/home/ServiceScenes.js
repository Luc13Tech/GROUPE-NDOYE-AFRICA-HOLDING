import React, { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import useInView from '../../hooks/useInView';
import { useContent } from '../../services/ContentProvider';

// Couleurs [dessus, face avant, face latérale]
const COL = {
  forest: ['#3b8a72', '#26705a', '#1b5443'],
  terra: ['#e8966d', '#BF5A33', '#8f3d1d'],
  sand: ['#F4EEE4', '#E3D8C7', '#c9bba4'],
  sage: ['#dbe9df', '#A9BFAF', '#7d9886'],
  ink: ['#58665f', '#334039', '#1b2420'],
  water: ['#8ec0cc', '#659ba8', '#4c7d8a'],
};

// Boîte : [x, y, largeur, profondeur, hauteur, couleur, altitude]
const SCENES = {
  building: [[0.5, 0.5, 9, 9, 0.3, 'sand'], [1.2, 1.2, 2.2, 2.2, 3.4, 'forest', 0.3], [4.2, 1.2, 2.2, 2.2, 5.4, 'forest', 0.3], [1.2, 4.6, 2.2, 2.2, 2.2, 'terra', 0.3], [4.6, 4.8, 3.6, 2.6, 3.8, 'sand', 0.3], [7.2, 1.4, 1.4, 1.4, 1.5, 'sage', 0.3], [0.9, 8, 0.8, 0.8, 0.9, 'sage', 0.3], [8.3, 8.2, 0.8, 0.8, 0.9, 'sage', 0.3]],
  layers: [[0.5, 0.5, 9, 9, 0.5, 'sand', 0], [1.5, 1.5, 7, 7, 0.5, 'sage', 0.5], [2.5, 2.5, 5, 5, 0.5, 'forest', 1], [3.5, 3.5, 3, 3, 0.5, 'terra', 1.5], [4.5, 4.5, 1, 1, 2.2, 'sand', 2]],
  chart: [[0.5, 0.5, 9, 9, 0.3, 'sand', 0], [1, 6.6, 1.4, 1.4, 1.2, 'sage', 0.3], [2.7, 5.4, 1.4, 1.4, 2.4, 'sage', 0.3], [4.4, 4.2, 1.4, 1.4, 3.6, 'forest', 0.3], [6.1, 3, 1.4, 1.4, 4.8, 'forest', 0.3], [7.8, 1.8, 1.4, 1.4, 6.2, 'terra', 0.3]],
  road: [[0.2, 0.2, 9.6, 9.6, 0.15, 'water', 0], [0, 3.6, 10, 2.8, 0.5, 'ink', 2.2], [1.2, 4.1, 0.9, 1.8, 2.2, 'sand', 0], [4.5, 4.1, 0.9, 1.8, 2.2, 'sand', 0], [7.9, 4.1, 0.9, 1.8, 2.2, 'sand', 0], [1.2, 3.3, 0.7, 0.7, 3.2, 'terra', 2.7], [1.2, 6, 0.7, 0.7, 3.2, 'terra', 2.7], [7.9, 3.3, 0.7, 0.7, 3.2, 'terra', 2.7], [7.9, 6, 0.7, 0.7, 3.2, 'terra', 2.7], [3, 4.9, 1, 0.2, 0.05, 'sand', 2.7], [5.5, 4.9, 1, 0.2, 0.05, 'sand', 2.7]],
  leaf: [[0.5, 0.5, 9, 9, 0.3, 'sand', 0], [1, 1.2, 8, 1.4, 0.5, 'forest', 0.3], [1, 3, 8, 1.4, 0.5, 'sage', 0.3], [1, 4.8, 8, 1.4, 0.5, 'forest', 0.3], [1, 6.6, 8, 1.4, 0.5, 'sage', 0.3], [2.2, 1.7, 0.4, 0.4, 1.3, 'terra', 0.8], [5.4, 5.3, 0.4, 0.4, 1.3, 'terra', 0.8], [8.2, 8.4, 0.7, 0.7, 3.2, 'ink', 0.3]],
  zap: [[0.5, 0.5, 9, 9, 0.3, 'sand', 0], [1.2, 1.2, 2.4, 1.5, 0.35, 'water', 0.3], [3.9, 1.2, 2.4, 1.5, 0.35, 'water', 0.3], [6.6, 1.2, 2.4, 1.5, 0.35, 'water', 0.3], [1.2, 3.3, 2.4, 1.5, 0.35, 'water', 0.3], [3.9, 3.3, 2.4, 1.5, 0.35, 'water', 0.3], [6.6, 3.3, 2.4, 1.5, 0.35, 'water', 0.3], [7.5, 7.4, 0.5, 0.5, 6.2, 'sand', 0.3], [7.2, 7.1, 1.1, 1.1, 0.6, 'terra', 6.5], [6.2, 7.6, 3.1, 0.15, 0.15, 'sand', 6.8]],
};

function IsoScene({ scene }) {
  const boxes = SCENES[scene] || SCENES.building;
  return (
    <div className="iso" aria-hidden="true">
      <div className="iso__ground" />
      {boxes.map(([x, y, w, d, h, c, z = 0], i) => (
        <div
          key={`${scene}-${i}`}
          className="iso__box"
          style={{ '--x': x, '--y': y, '--w': w, '--d': d, '--h': h, '--z': z, '--i': i, '--c0': COL[c][0], '--c1': COL[c][1], '--c2': COL[c][2], translate: `0 0 calc(${z} * var(--u))` }}
        >
          <i className="iso__top" />
          <i className="iso__front" />
          <i className="iso__side" />
        </div>
      ))}
    </div>
  );
}

/** Liste des services à gauche, scène 3D isométrique à droite (les volumes « se construisent » à chaque changement). */
export default function ServiceScenes() {
  const { lang } = useLang();
  const { SERVICES } = useContent();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!auto || !inView || reduced || SERVICES.length < 2) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), 6000);
    return () => clearTimeout(t);
  }, [auto, inView, active, reduced, SERVICES.length]);

  if (!SERVICES.length) return null;
  const current = SERVICES[active] || SERVICES[0];
  const text = (s) => s[lang] || s.fr;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="svc" ref={ref}>
      <ul className="svc__list">
        {SERVICES.map((s, i) => (
          <li key={i} className={`svc__item${i === active ? ' is-on' : ''}`}>
            <button type="button" className="svc__btn" aria-expanded={i === active} onClick={() => { setActive(i); setAuto(false); }} onMouseEnter={() => { setActive(i); setAuto(false); }}>
              <span className="svc__n">{pad(i + 1)}</span>
              <span className="svc__t">{text(s).title}</span>
              <p className="svc__d">{text(s).desc}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="svc__stage">
        <span className="svc__tag">{pad(active + 1)} / {pad(SERVICES.length)}</span>
        <IsoScene scene={current.icon} key={`${active}-${current.icon}`} />
        <span className="svc__chip">{text(current).title}</span>
      </div>
    </div>
  );
}
