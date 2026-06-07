import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { VILLA_TYPES, DEFAULT_ADMIN_CONTENT, SITE, SERVICES, COMPANIES } from '../data/siteData';

function LineChart({ data, color = '#c9a84c', height = 90 }) {
  const max = Math.max(...data.map(d => d.val));
  const min = Math.min(...data.map(d => d.val));
  const range = max - min || 1;
  const w = 400;
  const h = height;
  const pad = 14;
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.val - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const area = path + ` L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  const id = `gr${color.replace('#', '')}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={color} stroke="var(--navy2)" strokeWidth="2" />
      ))}
    </svg>
  );
}

function HBar({ label, val, color, pct }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setTimeout(() => setW(pct), 300);
  }, [pct]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontFamily: 'var(--f-display)', fontSize: '.68rem', color: 'var(--cream)', letterSpacing: '.05em' }}>{label}</span>
        <span style={{ fontFamily: 'var(--f-display)', fontSize: '.68rem', color }}>{val} lots</span>
      </div>
      <div style={{ height: 7, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: 4, transition: 'width 1s ease', boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
}

const IC = {
  grid: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  home: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
  villas: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" /></svg>,
  partners: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  services: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 2,7 12,12 22,7" /><polyline points="2,17 12,22 22,17" /></svg>,
  gallery: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>,
  settings: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  lock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  logout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  edit: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  trash: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
};

const INIT_LOTS = [
  { id: 1, nom: 'Cité Yaye Dia — Villa F3 — Lot n°01', type: 'F3', progress: 65, status: 'EN CONSTRUCTION' },
  { id: 2, nom: 'Cité Yaye Dia — Villa F4 Duplex — Lot n°12', type: 'F4 Duplex', progress: 100, status: 'TERMINÉ' },
  { id: 3, nom: 'Cité Yaye Dia — Villa F5 — Lot n°07', type: 'F5', progress: 15, status: 'PLANIFICATION' },
  { id: 4, nom: 'Cité Yaye Dia — Lotissement & Voirie', type: 'Infrastructure', progress: 40, status: 'EN CONSTRUCTION' },
  { id: 5, nom: 'Cité Yaye Dia — Villa F4 Plein Pied — Lot n°23', type: 'F4PP', progress: 80, status: 'EN CONSTRUCTION' },
  { id: 6, nom: 'Cité Yaye Dia — Villa F3 — Lot n°45', type: 'F3', progress: 100, status: 'TERMINÉ' },
];
const STATUS_COLORS = { 'TERMINÉ': '#34d399', 'EN CONSTRUCTION': '#f59e0b', 'PLANIFICATION': '#6366f1', 'EN PAUSE': '#f87171' };
const TABS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: IC.grid },
  { id: 'projets', label: 'Projets', icon: IC.home },
  { id: 'villas', label: 'Villas', icon: IC.villas },
  { id: 'services', label: 'Services', icon: IC.services },
  { id: 'partenaires', label: 'Partenaires', icon: IC.partners },
  { id: 'galerie', label: 'Galerie & Médias', icon: IC.gallery },
  { id: 'settings', label: 'Paramètres', icon: IC.settings },
  { id: 'password', label: 'Mot de passe', icon: IC.lock },
  { id: 'entreprises', label: 'Entreprises', icon: <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z' /><path d='M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2' /><path d='M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2' /></svg> },
];
const SVC_ICONS_LIST = ['building', 'layers', 'chart', 'road', 'leaf', 'zap', 'star', 'globe', 'home', 'heart'];
const GALLERY_CATS = ['Vue Générale', 'Extérieur', 'Intérieur', 'Plans 3D', 'Immeubles', 'Commodités'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(false);
  const [lots, setLots] = useState(INIT_LOTS);
  const [searchLot, setSearchLot] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [settings, setSettings] = useState({ phone: SITE.phone, email: SITE.email, address: SITE.address_fr, waMsg: typeof SITE.waMsg === 'object' ? SITE.waMsg.fr : SITE.waMsg });
  const [stgOk, setStgOk] = useState(false);
  const [pwForm, setPwForm] = useState({ cur: '', n1: '', n2: '' });
  const [pwMsg, setPwMsg] = useState('');
  const [projets, setProjets] = useState(() => { try { return JSON.parse(localStorage.getItem('gnah_projets') || 'null') || DEFAULT_ADMIN_CONTENT.projects; } catch { return DEFAULT_ADMIN_CONTENT.projects; } });
  const [servicesList, setServicesList] = useState(() => { try { return JSON.parse(localStorage.getItem('gnah_services') || 'null') || SERVICES.map((s, i) => ({ id: i + 1, active: true, icon: s.icon, title_fr: s.fr.title, title_en: s.en.title, desc_fr: s.fr.desc, desc_en: s.en.desc })); } catch { return []; } });
  const [galleryList, setGalleryList] = useState(() => { try { return JSON.parse(localStorage.getItem('gnah_gallery') || 'null') || []; } catch { return []; } });
  const [partnersList, setPartnersList] = useState(() => { try { return JSON.parse(localStorage.getItem('gnah_partners') || 'null') || []; } catch { return []; } });
  const [companiesList, setCompaniesList] = useState(() => { try { const s = localStorage.getItem('gnah_companies'); if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p; } return COMPANIES; } catch { return COMPANIES; } });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [chartData, setChartData] = useState([
    { label: 'T1 2024', val: 12 }, { label: 'T2 2024', val: 18 }, { label: 'T3 2024', val: 22 }, { label: 'T4 2024', val: 27 },
    { label: 'T1 2025', val: 31 }, { label: 'T2 2025', val: 38 }, { label: 'T3 2025', val: 44 }, { label: 'T4 2025', val: 52 },
    { label: 'T1 2026', val: 58 }, { label: 'En cours', val: 65 },
  ]);
  const intervalRef = useRef(null);

  useEffect(() => { if (!sessionStorage.getItem('gnah_admin')) navigate('/admin'); }, [navigate]);
  useEffect(() => { const h = () => setIsDesktop(window.innerWidth >= 1024); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setChartData(prev => { const last = prev[prev.length - 1]; return [...prev.slice(0, -1), { ...last, val: last.val + Math.floor(Math.random() * 4) + 1 }]; });
    }, 8000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const saveList = (key, setter, data) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };
  const logout = () => { sessionStorage.removeItem('gnah_admin'); navigate('/admin'); };
  const openModal = (type, data = {}) => { setModal(type); setForm({ ...data }); };
  const closeModal = () => { setModal(null); setForm({}); };

  const f3c = lots.filter(l => l.type === 'F3').length;
  const f4c = lots.filter(l => l.type === 'F4PP').length;
  const f4dc = lots.filter(l => l.type === 'F4 Duplex').length;
  const f5c = lots.filter(l => l.type === 'F5').length;
  const maxLots = Math.max(f3c, f4c, f4dc, f5c, 1);
  const filteredLots = lots.filter(l => l.nom.toLowerCase().includes(searchLot.toLowerCase()) || l.type.toLowerCase().includes(searchLot.toLowerCase()));

  const inp = { width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.2)', color: 'var(--cream)', fontFamily: 'var(--f-body)', fontSize: '.85rem', outline: 'none', borderRadius: 6, transition: 'border-color .2s' };
  const sel = { ...inp, background: 'rgba(13,20,39,.95)' };
  const txa = { ...inp, resize: 'vertical', minHeight: 80 };
  const lbl = { fontFamily: 'var(--f-display)', fontSize: '.58rem', color: 'rgba(201,168,76,.6)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6, display: 'block' };
  const card = { background: 'var(--navy2)', border: 'var(--border-gold)', padding: 'clamp(14px,2vw,22px)', marginBottom: 18 };
  const tag = (color) => ({ padding: '2px 8px', background: `${color}15`, color, fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.08em', border: `1px solid ${color}40`, display: 'inline-block' });
  const navBtn = (id) => ({ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: tab === id ? 'rgba(201,168,76,.06)' : 'none', border: 'none', borderLeft: `2px solid ${tab === id ? 'var(--gold)' : 'transparent'}`, color: tab === id ? 'var(--gold)' : 'rgba(245,240,232,.38)', fontFamily: 'var(--f-display)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left', transition: 'all .2s' });
  const btnCancel = { padding: '9px 16px', background: 'transparent', border: 'var(--border-gold)', color: 'rgba(200,195,186,.5)', fontFamily: 'var(--f-display)', fontSize: '.65rem', cursor: 'pointer' };
  const sectionTitle = { fontFamily: 'var(--f-elegant)', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'var(--cream)', marginBottom: 20 };

  const FF = ({ label, k, type = 'text', options, textarea, ph }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      {textarea ? <textarea style={txa} value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={ph || ''} />
        : options ? <select style={sel} value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}><option value="">Sélectionner...</option>{options.map(o => <option key={o}>{o}</option>)}</select>
          : <input style={inp} type={type} value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={ph || ''} />}
    </div>
  );

  const Sidebar = () => (
    <>
      <div style={{ padding: '16px 14px', borderBottom: 'var(--border-gold)' }}>
        <div style={{ background: 'rgba(13,20,39,.8)', padding: '7px 10px', border: '1px solid rgba(201,168,76,.2)', marginBottom: 4 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: '.52rem', color: 'var(--cream)', letterSpacing: '.16em' }}>GROUPE NDOYE AFRICA</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: '.48rem', color: 'var(--gold)', letterSpacing: '.26em', marginTop: 2 }}>HOLDING.</div>
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', color: 'var(--gold)', letterSpacing: '.12em' }}>Admin Panel</div>
      </div>
      <nav style={{ flex: 1, paddingTop: 8, overflowY: 'auto' }}>
        {TABS.map(t => <button key={t.id} style={navBtn(t.id)} onClick={() => { setTab(t.id); setSideOpen(false); }}><span style={{ flexShrink: 0 }}>{t.icon}</span>{t.label}</button>)}
      </nav>
      <div style={{ borderTop: 'var(--border-gold)', paddingTop: 6, paddingBottom: 8 }}>
        <button style={navBtn('view')} onClick={() => window.open('/', '_blank')}><span>{IC.eye}</span>Voir le site</button>
        <button style={{ ...navBtn('logout'), color: '#f87171' }} onClick={logout}><span>{IC.logout}</span>Déconnexion</button>
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--navy)', position: 'relative' }}>
      {!isDesktop && sideOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 9400 }} onClick={() => setSideOpen(false)} />}

      <aside style={isDesktop
        ? { width: 248, background: 'var(--navy2)', borderRight: 'var(--border-gold)', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }
        : { position: 'fixed', top: 0, left: sideOpen ? 0 : '-260px', bottom: 0, width: 250, background: 'var(--navy2)', borderRight: 'var(--border-gold)', display: 'flex', flexDirection: 'column', zIndex: 9500, transition: 'left .3s ease', overflowY: 'auto' }}>
        <Sidebar />
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {!isDesktop && (
          <div style={{ height: 50, background: 'var(--navy2)', borderBottom: 'var(--border-gold)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 12, flexShrink: 0 }}>
            <button onClick={() => setSideOpen(o => !o)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', padding: 4 }}>{IC.menu}</button>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--gold)', letterSpacing: '.14em' }}>{TABS.find(t => t.id === tab)?.label || 'Admin'}</div>
          </div>
        )}

        <div style={{ flex: 1, padding: 'clamp(14px,2.5vw,32px)', overflowY: 'auto' }}>

          {tab === 'dashboard' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={sectionTitle}>Tableau de Bord</div>
                  <div style={{ fontSize: '.74rem', color: 'rgba(200,195,186,.4)', marginTop: -14 }}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                <button onClick={() => { setTab('projets'); openModal('addProjet', { active: true }); }} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Nouveau projet</button>
              </div>

              <div className="dash-grid">
                {[{ lbl: 'Lots', val: lots.length, color: 'var(--gold)' }, { lbl: 'Terminés', val: lots.filter(l => l.status === 'TERMINÉ').length, color: '#34d399' }, { lbl: 'En construction', val: lots.filter(l => l.status === 'EN CONSTRUCTION').length, color: '#f59e0b' }, { lbl: 'Projets', val: projets.length, color: '#6366f1' }].map((s, i) => (
                  <div key={i} className="dash-card" style={{ borderTop: `3px solid ${s.color}` }}>
                    <span className="dash-val" style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color}60)` }}>{s.val}</span>
                    <span className="dash-lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(.85rem,1.5vw,1rem)', color: 'var(--cream)', marginBottom: 4 }}>Évolution de l'Activité Immobilière</div>
                <div style={{ fontSize: '.7rem', color: 'rgba(200,195,186,.35)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  Lots & chantiers par trimestre
                  <span style={{ padding: '2px 7px', background: 'rgba(201,168,76,.1)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.52rem', border: '1px solid rgba(201,168,76,.25)' }}>Automatisé</span>
                </div>
                <LineChart data={chartData} color="var(--gold)" height={90} />
                <div style={{ display: 'flex', overflowX: 'auto', marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(201,168,76,.08)', gap: 0 }}>
                  {chartData.map((d, i) => <span key={i} style={{ fontFamily: 'var(--f-display)', fontSize: '.46rem', color: 'rgba(200,195,186,.3)', textAlign: 'center', flex: '1 0 auto', minWidth: 28 }}>{d.label}</span>)}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginBottom: 18 }}>
                <div style={card}>
                  <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(.85rem,1.5vw,.95rem)', color: 'var(--cream)', marginBottom: 4 }}>Répartition des Villas</div>
                  <div style={{ fontSize: '.7rem', color: 'rgba(200,195,186,.35)', marginBottom: 14 }}>Distribution par typologies</div>
                  <HBar label="Villa F3 (Famille compacte)" val={f3c} color="#f59e0b" pct={(f3c / maxLots) * 100} />
                  <HBar label="Villa F4 Plein Pied" val={f4c} color="#34d399" pct={(f4c / maxLots) * 100} />
                  <HBar label="Villa F4 Duplex (Premium)" val={f4dc} color="#6366f1" pct={(f4dc / maxLots) * 100} />
                  <HBar label="Villa F5 (Grand Luxe)" val={f5c} color="#f472b6" pct={(f5c / maxLots) * 100} />
                </div>
                <div style={card}>
                  <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(.85rem,1.5vw,.95rem)', color: 'var(--cream)', marginBottom: 4 }}>Planifier un nouveau Chantier</div>
                  <label style={lbl}>NOM DU LOT / SECTEUR</label>
                  <input style={{ ...inp, marginBottom: 10 }} placeholder="ex: Villa F4 - Lot n°42" value={form.qn || ''} onChange={e => setForm(p => ({ ...p, qn: e.target.value }))} />
                  <label style={lbl}>CATÉGORIE DE TYPOLOGIE</label>
                  <select style={{ ...sel, marginBottom: 14 }} value={form.qt || 'F3'} onChange={e => setForm(p => ({ ...p, qt: e.target.value }))}>
                    {['F3', 'F4PP', 'F4 Duplex', 'F5', 'Infrastructure'].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <button onClick={() => { if (!form.qn) return; setLots(p => [...p, { id: Date.now(), nom: form.qn, type: form.qt || 'F3', progress: 0, status: 'PLANIFICATION' }]); setForm(p => ({ ...p, qn: '', qt: 'F3' })); }} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', borderRadius: 8 }}>{IC.plus} Ajouter au Registre</button>
                </div>
              </div>

              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--f-elegant)', fontSize: 'clamp(.85rem,1.5vw,.95rem)', color: 'var(--cream)' }}>Suivi des Travaux par Lot</div>
                    <div style={{ fontSize: '.7rem', color: 'rgba(200,195,186,.35)', marginTop: 2 }}>{lots.length} lots</div>
                  </div>
                  <button onClick={() => openModal('addLot', { type: 'F3', status: 'PLANIFICATION', progress: 0 })} className="btn btn-gold" style={{ fontSize: '.62rem', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>{IC.plus} Ajouter</button>
                </div>
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(200,195,186,.3)' }}>{IC.search}</span>
                  <input style={{ ...inp, paddingLeft: 34 }} placeholder="Rechercher un lot..." value={searchLot} onChange={e => setSearchLot(e.target.value)} />
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 440 }}>
                    <thead><tr>{['Lot', 'Type', 'Progression', 'Statut', 'Actions'].map((h, i) => <th key={i} style={{ background: 'rgba(201,168,76,.08)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.54rem', letterSpacing: '.12em', padding: '9px 10px', textAlign: 'left', textTransform: 'uppercase', borderBottom: '1px solid rgba(201,168,76,.15)', whiteSpace: 'nowrap' }}>{h}</th>)}</thead>
                    <tbody>
                      {filteredLots.map(lot => (
                        <tr key={lot.id}>
                          <td style={{ padding: '9px 10px', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: '.8rem', color: 'var(--cream)', minWidth: 150 }}>{lot.nom}</td>
                          <td style={{ padding: '9px 10px', borderBottom: '1px solid rgba(255,255,255,.04)', whiteSpace: 'nowrap' }}><span style={tag('var(--gold)')}>{lot.type}</span></td>
                          <td style={{ padding: '9px 10px', borderBottom: '1px solid rgba(255,255,255,.04)', minWidth: 120 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                              <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,.06)', borderRadius: 3 }}>
                                <div style={{ height: '100%', width: `${lot.progress}%`, background: STATUS_COLORS[lot.status] || 'var(--gold)', borderRadius: 3, transition: 'width .6s' }} />
                              </div>
                              <span style={{ fontFamily: 'var(--f-display)', fontSize: '.58rem', color: 'rgba(200,195,186,.6)', minWidth: 26 }}>{lot.progress}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '9px 10px', borderBottom: '1px solid rgba(255,255,255,.04)', whiteSpace: 'nowrap' }}><span style={tag(STATUS_COLORS[lot.status] || 'var(--gold)')}>{lot.status}</span></td>
                          <td style={{ padding: '9px 10px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                              <button onClick={() => openModal('editLot', { ...lot })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit} Modifier</button>
                              <button onClick={() => { if (window.confirm('Supprimer ?')) setLots(p => p.filter(l => l.id !== lot.id)); }} className="btn-del" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.trash}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredLots.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 20, color: 'rgba(200,195,186,.3)', fontSize: '.8rem' }}>Aucun lot trouvé.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === 'projets' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={sectionTitle}>Gestion des Projets</div>
                <button onClick={() => openModal('addProjet', { active: true })} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Nouveau Projet</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 14 }}>
                {projets.map(p => (
                  <div key={p.id} style={{ background: 'var(--navy2)', border: 'var(--border-gold)', overflow: 'hidden' }}>
                    {p.img && <img src={p.img} alt={p.title?.fr || ''} style={{ width: '100%', height: 110, objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />}
                    <div style={{ padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 5 }}>
                        <span style={tag('var(--gold)')}>{p.category}</span>
                        <span style={tag(p.active ? '#34d399' : '#f87171')}>{p.active ? 'ACTIF' : 'INACTIF'}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: '.82rem', color: 'var(--cream)', marginBottom: 5 }}>{p.title?.fr}</div>
                      <p style={{ fontSize: '.74rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.6, marginBottom: 12 }}>{(p.desc?.fr || '').slice(0, 80)}...</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button onClick={() => openModal('editProjet', { ...p, title_fr: p.title?.fr, title_en: p.title?.en, desc_fr: p.desc?.fr, desc_en: p.desc?.en })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit} Modifier</button>
                        <button onClick={() => { if (window.confirm('Supprimer ?')) saveList('gnah_projets', setProjets, projets.filter(x => x.id !== p.id)); }} className="btn-del">{IC.trash}</button>
                        <button onClick={() => saveList('gnah_projets', setProjets, projets.map(x => x.id === p.id ? { ...x, active: !x.active } : x))} className="btn-tog">{p.active ? 'Désactiver' : 'Activer'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'services' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={sectionTitle}>Gestion des Services</div>
                <button onClick={() => openModal('addService', { active: true, icon: 'building' })} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Nouveau Service</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 14 }}>
                {servicesList.map(s => (
                  <div key={s.id} style={{ background: 'var(--navy2)', border: 'var(--border-gold)', padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 5 }}>
                      <span style={tag('var(--gold)')}>{s.icon}</span>
                      <span style={tag(s.active ? '#34d399' : '#f87171')}>{s.active ? 'ACTIF' : 'INACTIF'}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: '.82rem', color: 'var(--cream)', marginBottom: 5 }}>{s.title_fr}</div>
                    <p style={{ fontSize: '.74rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.6, marginBottom: 12 }}>{(s.desc_fr || '').slice(0, 80)}...</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button onClick={() => openModal('editService', { ...s })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit} Modifier</button>
                      <button onClick={() => { if (window.confirm('Supprimer ?')) saveList('gnah_services', setServicesList, servicesList.filter(x => x.id !== s.id)); }} className="btn-del">{IC.trash}</button>
                      <button onClick={() => saveList('gnah_services', setServicesList, servicesList.map(x => x.id === s.id ? { ...x, active: !x.active } : x))} className="btn-tog">{s.active ? 'Désactiver' : 'Activer'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'partenaires' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={sectionTitle}>Gestion des Partenaires</div>
                <button onClick={() => openModal('addPartner', { active: true })} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Nouveau Partenaire</button>
              </div>
              {partnersList.length === 0
                ? <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(200,195,186,.35)', fontFamily: 'var(--f-display)', fontSize: '.82rem' }}>Aucun partenaire ajouté. Créez le premier.</div>
                : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                  {partnersList.map(p => (
                    <div key={p.id} style={{ background: 'var(--navy2)', border: 'var(--border-gold)', padding: 18 }}>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: '.9rem', color: 'var(--cream)', marginBottom: 4 }}>{p.country}</div>
                      <p style={{ fontSize: '.76rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.6, marginBottom: 12 }}>{p.focus}</p>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => openModal('editPartner', { ...p })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit}</button>
                        <button onClick={() => { if (window.confirm('Supprimer ?')) saveList('gnah_partners', setPartnersList, partnersList.filter(x => x.id !== p.id)); }} className="btn-del">{IC.trash}</button>
                      </div>
                    </div>
                  ))}
                </div>}
            </>
          )}

          {tab === 'galerie' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={sectionTitle}>Galerie & Médias</div>
                <button onClick={() => openModal('addGallery', { category: 'Extérieur', active: true })} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Ajouter une Photo</button>
              </div>
              {galleryList.length === 0
                ? <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ color: 'rgba(200,195,186,.35)', fontFamily: 'var(--f-display)', fontSize: '.82rem', marginBottom: 12 }}>Aucune photo ajoutée manuellement.</div>
                  <p style={{ color: 'rgba(200,195,186,.25)', fontSize: '.78rem', maxWidth: 400, margin: '0 auto' }}>Les photos du code apparaissent automatiquement sur la page Galerie. Ajoutez ici des photos supplémentaires.</p>
                </div>
                : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
                  {galleryList.map(g => (
                    <div key={g.id} style={{ background: 'var(--navy2)', border: 'var(--border-gold)', overflow: 'hidden' }}>
                      {g.img && <img src={g.img} alt={g.title} style={{ width: '100%', height: 100, objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />}
                      <div style={{ padding: 10 }}>
                        <div style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--cream)', marginBottom: 4 }}>{g.title}</div>
                        <span style={tag('var(--gold)')}>{g.category}</span>
                        <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
                          <button onClick={() => openModal('editGallery', { ...g })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit}</button>
                          <button onClick={() => { if (window.confirm('Supprimer ?')) saveList('gnah_gallery', setGalleryList, galleryList.filter(x => x.id !== g.id)); }} className="btn-del">{IC.trash}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>}
            </>
          )}

          {tab === 'villas' && (
            <>
              <div style={sectionTitle}>Gestion des Villas</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
                  <thead><tr>{['Type', 'Nom', 'Terrain', 'Bâti', 'Standing', 'Actions'].map((h, i) => <th key={i} style={{ background: 'rgba(201,168,76,.1)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.56rem', letterSpacing: '.12em', padding: '10px 12px', textAlign: 'left', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>)}</thead>
                  <tbody>
                    {VILLA_TYPES.map(v => (
                      <tr key={v.id}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)' }}><span style={tag(v.color)}>{v.id.toUpperCase()}</span></td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)', color: 'var(--cream)', fontSize: '.84rem' }}>{v.fr?.name}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)', color: 'rgba(200,195,186,.6)', fontSize: '.82rem' }}>{v.surface}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontSize: '.78rem', fontWeight: 600 }}>{v.bati}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)', color: 'rgba(200,195,186,.6)', fontSize: '.82rem' }}>{v.fr?.standing}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(201,168,76,.07)' }}><button onClick={() => openModal('editVilla', { ...v, name_fr: v.fr?.name, standing_fr: v.fr?.standing })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit} Modifier</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'entreprises' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={sectionTitle}>Gestion des Entreprises</div>
                <button onClick={() => openModal('addCompany', { active: true })} className="btn btn-gold" style={{ fontSize: '.68rem', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>{IC.plus} Nouvelle Entreprise</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 14 }}>
                {companiesList.map(c => (
                  <div key={c.id} style={{ background: 'var(--navy2)', border: 'var(--border-gold)', overflow: 'hidden' }}>
                    <div style={{ background: 'rgba(5,8,16,.8)', padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 90, borderBottom: '2px solid var(--gold)' }}>
                      {c.logo
                        ? <img src={c.logo} alt={c.name} style={{ maxHeight: 60, maxWidth: 160, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
                        : <div style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '.1em' }}>{(c.name || '?').slice(0, 2).toUpperCase()}</div>}
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 5 }}>
                        <span style={tag('var(--gold)')}>{typeof c.sector === 'object' ? c.sector.fr : c.sector}</span>
                        <span style={tag(c.active !== false ? '#34d399' : '#f87171')}>{c.active !== false ? 'ACTIF' : 'INACTIF'}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: '.9rem', color: 'var(--cream)', marginBottom: 4 }}>{c.name}</div>
                      {c.country && <div style={{ fontSize: '.72rem', color: 'rgba(200,195,186,.45)', marginBottom: 8 }}>{c.country}</div>}
                      <p style={{ fontSize: '.74rem', color: 'rgba(200,195,186,.5)', lineHeight: 1.6, marginBottom: 12 }}>{((typeof c.desc === 'object' ? c.desc.fr : c.desc) || '').slice(0, 80)}...</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button onClick={() => openModal('editCompany', { ...c, desc_fr: typeof c.desc === 'object' ? c.desc.fr : c.desc, desc_en: typeof c.desc === 'object' ? c.desc.en : '', sector_fr: typeof c.sector === 'object' ? c.sector.fr : c.sector })} className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{IC.edit} Modifier</button>
                        <button onClick={() => { if (window.confirm('Supprimer ?')) saveList('gnah_companies', setCompaniesList, companiesList.filter(x => x.id !== c.id)); }} className="btn-del">{IC.trash}</button>
                        <button onClick={() => saveList('gnah_companies', setCompaniesList, companiesList.map(x => x.id === c.id ? { ...x, active: x.active === false ? true : false } : x))} className="btn-tog">{c.active !== false ? 'Désactiver' : 'Activer'}</button>
                      </div>
                    </div>
                  </div>
                ))}
                {companiesList.length === 0 && <div style={{ padding: '40px 20px', color: 'rgba(200,195,186,.35)', fontFamily: 'var(--f-display)', fontSize: '.82rem', textAlign: 'center' }}>Aucune entreprise. Créez la première.</div>}
              </div>
            </>
          )}

          {tab === 'settings' && (
            <>
              <div style={sectionTitle}>Paramètres du Site</div>
              <div style={{ ...card, maxWidth: 520 }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', color: 'var(--gold)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 18 }}>COORDONNÉES DE CONTACT</div>
                {stgOk && <div style={{ background: 'rgba(52,211,153,.08)', border: '1px solid rgba(52,211,153,.3)', color: '#34d399', padding: '9px 12px', marginBottom: 14, fontSize: '.8rem', fontFamily: 'var(--f-display)' }}>Sauvegardé avec succès.</div>}
                {[{ k: 'phone', l: 'Téléphone' }, { k: 'email', l: 'Email' }, { k: 'address', l: 'Adresse' }].map(f => (
                  <div key={f.k} style={{ marginBottom: 12 }}><label style={lbl}>{f.l}</label><input style={inp} value={settings[f.k]} onChange={e => setSettings(p => ({ ...p, [f.k]: e.target.value }))} /></div>
                ))}
                <div style={{ marginBottom: 14 }}><label style={lbl}>Message WhatsApp</label><textarea style={txa} value={settings.waMsg} onChange={e => setSettings(p => ({ ...p, waMsg: e.target.value }))} /></div>
                <button onClick={() => { localStorage.setItem('gnah_settings', JSON.stringify(settings)); setStgOk(true); setTimeout(() => setStgOk(false), 3000); }} className="btn btn-gold" style={{ fontSize: '.72rem' }}>Sauvegarder</button>
              </div>
            </>
          )}

          {tab === 'password' && (
            <>
              <div style={sectionTitle}>Changer le Mot de Passe</div>
              <div style={{ ...card, maxWidth: 420 }}>
                {pwMsg && <div style={{ padding: '9px 12px', marginBottom: 14, fontSize: '.8rem', fontFamily: 'var(--f-display)', background: pwMsg.includes('mis à jour') ? 'rgba(52,211,153,.08)' : 'rgba(248,113,113,.08)', border: `1px solid ${pwMsg.includes('mis à jour') ? 'rgba(52,211,153,.3)' : 'rgba(248,113,113,.3)'}`, color: pwMsg.includes('mis à jour') ? '#34d399' : '#f87171' }}>{pwMsg}</div>}
                {[{ k: 'cur', l: 'Mot de passe actuel' }, { k: 'n1', l: 'Nouveau mot de passe' }, { k: 'n2', l: 'Confirmer' }].map(f => (
                  <div key={f.k} style={{ marginBottom: 12 }}><label style={lbl}>{f.l}</label><input style={inp} type="password" placeholder="••••••••" value={pwForm[f.k]} onChange={e => setPwForm(p => ({ ...p, [f.k]: e.target.value }))} /></div>
                ))}
                <button onClick={() => {
                  if (pwForm.cur !== 'admin123') { setPwMsg('Mot de passe actuel incorrect.'); return; }
                  if (pwForm.n1.length < 6) { setPwMsg('Minimum 6 caractères.'); return; }
                  if (pwForm.n1 !== pwForm.n2) { setPwMsg('Les mots de passe ne correspondent pas.'); return; }
                  setPwMsg('Mot de passe mis à jour !'); setPwForm({ cur: '', n1: '', n2: '' });
                }} className="btn btn-gold" style={{ fontSize: '.72rem' }}>Mettre à jour</button>
              </div>
            </>
          )}
        </div>
      </main>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ width: '100%', maxWidth: 'min(96vw,540px)' }}>
            <div className="modal-title">
              {modal === 'addLot' ? 'Nouveau Lot' : modal === 'editLot' ? 'Modifier le Lot' :
                modal === 'addProjet' ? 'Nouveau Projet' : modal === 'editProjet' ? 'Modifier le Projet' :
                  modal === 'addService' ? 'Nouveau Service' : modal === 'editService' ? 'Modifier le Service' :
                    modal === 'addGallery' ? 'Ajouter une Photo' : modal === 'editGallery' ? 'Modifier la Photo' :
                      modal === 'addPartner' ? 'Nouveau Partenaire' : modal === 'editPartner' ? 'Modifier le Partenaire' :
                        modal === 'editVilla' ? 'Modifier la Villa' : 'Formulaire'}
            </div>

            {(modal === 'addLot' || modal === 'editLot') && (
              <div>
                <FF label="Nom du lot *" k="nom" ph="ex: Cité Yaye Dia — Villa F3 — Lot n°01" />
                <FF label="Type" k="type" options={['F3', 'F4PP', 'F4 Duplex', 'F5', 'Infrastructure']} />
                <FF label="Progression (0–100%)" k="progress" type="number" />
                <FF label="Statut" k="status" options={Object.keys(STATUS_COLORS)} />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => { if (!form.nom) return; if (modal === 'addLot') setLots(p => [...p, { id: Date.now(), nom: form.nom, type: form.type || 'F3', progress: parseInt(form.progress) || 0, status: form.status || 'PLANIFICATION' }]); else setLots(p => p.map(l => l.id === form.id ? { ...form, progress: parseInt(form.progress) || 0 } : l)); closeModal(); }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addLot' ? 'Ajouter' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {(modal === 'addProjet' || modal === 'editProjet') && (
              <div>
                <FF label="Titre FR *" k="title_fr" />
                <FF label="Titre EN" k="title_en" />
                <FF label="Description FR *" k="desc_fr" textarea />
                <FF label="Description EN" k="desc_en" textarea />
                <FF label="Catégorie" k="category" options={['Immobilier', 'Infrastructure', 'Agriculture', 'Énergie', 'Autre']} />
                <FF label="URL Image" k="img" ph="/Images/yaye-dia/villa-f5.jpg" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <input type="checkbox" checked={form.active !== false} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                  <label style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--text)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Projet actif (visible sur le site)</label>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => { if (!form.title_fr) return; const item = { id: form.id || Date.now(), active: form.active !== false, category: form.category || 'Immobilier', img: form.img || '', title: { fr: form.title_fr, en: form.title_en || form.title_fr }, desc: { fr: form.desc_fr || '', en: form.desc_en || form.desc_fr || '' }, waMsg: { fr: `Bonjour, je suis intéressé(e) par "${form.title_fr}".`, en: `Hello, I am interested in "${form.title_fr}".` } }; modal === 'addProjet' ? saveList('gnah_projets', setProjets, [...projets, item]) : saveList('gnah_projets', setProjets, projets.map(x => x.id === item.id ? item : x)); closeModal(); }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addProjet' ? 'Créer' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {(modal === 'addService' || modal === 'editService') && (
              <div>
                <FF label="Titre FR *" k="title_fr" />
                <FF label="Titre EN" k="title_en" />
                <FF label="Titre ES" k="title_es" />
                <FF label="Titre DE" k="title_de" />
                <FF label="Description FR *" k="desc_fr" textarea />
                <FF label="Description EN" k="desc_en" textarea />
                <FF label="Icône" k="icon" options={SVC_ICONS_LIST} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <input type="checkbox" checked={form.active !== false} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                  <label style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--text)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Service actif</label>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => { if (!form.title_fr) return; const item = { id: form.id || Date.now(), active: form.active !== false, icon: form.icon || 'building', title_fr: form.title_fr, title_en: form.title_en || form.title_fr, title_es: form.title_es || form.title_fr, title_de: form.title_de || form.title_fr, desc_fr: form.desc_fr || '', desc_en: form.desc_en || '' }; modal === 'addService' ? saveList('gnah_services', setServicesList, [...servicesList, item]) : saveList('gnah_services', setServicesList, servicesList.map(x => x.id === item.id ? item : x)); closeModal(); }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addService' ? 'Créer' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {(modal === 'addGallery' || modal === 'editGallery') && (
              <div>
                <FF label="Titre *" k="title" ph="ex: Villa F5 — Façade nuit" />
                <FF label="Titre EN" k="title_en" />
                <FF label="URL Image *" k="img" ph="/Images/yaye-dia/villa-f5.jpg" />
                <FF label="Catégorie" k="category" options={GALLERY_CATS} />
                <FF label="Description" k="desc" textarea ph="Description courte de la photo..." />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <input type="checkbox" checked={form.active !== false} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                  <label style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--text)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Photo visible sur le site</label>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => { if (!form.title || !form.img) return; const item = { id: form.id || Date.now(), active: form.active !== false, title: form.title, title_en: form.title_en || form.title, img: form.img, category: form.category || 'Extérieur', desc: form.desc || '' }; modal === 'addGallery' ? saveList('gnah_gallery', setGalleryList, [...galleryList, item]) : saveList('gnah_gallery', setGalleryList, galleryList.map(x => x.id === item.id ? item : x)); closeModal(); }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addGallery' ? 'Ajouter' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {(modal === 'addCompany' || modal === 'editCompany') && (
              <div>
                <FF label="Nom de l'entreprise *" k="name" ph="ex: Terratransport" />
                <FF label="Logo URL" k="logo" ph="/Images/entreprises/logo-terratransport.png" />
                <FF label="Secteur FR *" k="sector_fr" ph="ex: Transport & Logistique" />
                <FF label="Secteur EN" k="sector_en" ph="ex: Transport & Logistics" />
                <FF label="Description FR *" k="desc_fr" textarea ph="Description de l'entreprise..." />
                <FF label="Description EN" k="desc_en" textarea />
                <FF label="Site web" k="website" ph="https://www.terratransport.com" />
                <FF label="Pays" k="country" ph="ex: Sénégal" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <input type="checkbox" checked={form.active !== false} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                  <label style={{ fontFamily: 'var(--f-display)', fontSize: '.65rem', color: 'var(--text)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Entreprise active (visible sur le site)</label>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => {
                    if (!form.name) return;
                    const item = {
                      id: form.id || Date.now(),
                      active: form.active !== false,
                      name: form.name,
                      logo: form.logo || '',
                      sector: { fr: form.sector_fr || '', en: form.sector_en || form.sector_fr || '', es: form.sector_fr || '', de: form.sector_fr || '' },
                      desc: { fr: form.desc_fr || '', en: form.desc_en || form.desc_fr || '', es: form.desc_fr || '', de: form.desc_fr || '' },
                      website: form.website || '#',
                      country: form.country || '',
                    };
                    modal === 'addCompany'
                      ? saveList('gnah_companies', setCompaniesList, [...companiesList, item])
                      : saveList('gnah_companies', setCompaniesList, companiesList.map(x => x.id === item.id ? item : x));
                    closeModal();
                  }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addCompany' ? 'Créer' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {(modal === 'addPartner' || modal === 'editPartner') && (
              <div>
                <FF label="Pays *" k="country" ph="ex: Turquie" />
                <FF label="Code / Drapeau" k="code" ph="ex: TR 🇹🇷" />
                <FF label="Focus (FR) *" k="focus" textarea ph="ex: Immobilier, infrastructure..." />
                <FF label="Focus (EN)" k="focus_en" textarea />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={() => { if (!form.country) return; const item = { id: form.id || Date.now(), country: form.country, code: form.code || '', focus: form.focus || '', focus_en: form.focus_en || form.focus || '' }; modal === 'addPartner' ? saveList('gnah_partners', setPartnersList, [...partnersList, item]) : saveList('gnah_partners', setPartnersList, partnersList.map(x => x.id === item.id ? item : x)); closeModal(); }} className="btn btn-gold" style={{ fontSize: '.7rem' }}>{modal === 'addPartner' ? 'Créer' : 'Enregistrer'}</button>
                </div>
              </div>
            )}

            {modal === 'editVilla' && (
              <div>
                <FF label="Nom FR" k="name_fr" />
                <FF label="Standing FR" k="standing_fr" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ marginBottom: 12 }}><label style={lbl}>Surface terrain</label><input style={inp} value={form.surface || ''} onChange={e => setForm(p => ({ ...p, surface: e.target.value }))} /></div>
                  <div style={{ marginBottom: 12 }}><label style={lbl}>Surface bâtie</label><input style={inp} value={form.bati || ''} onChange={e => setForm(p => ({ ...p, bati: e.target.value }))} /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button onClick={closeModal} style={btnCancel}>Annuler</button>
                  <button onClick={closeModal} className="btn btn-gold" style={{ fontSize: '.7rem' }}>Enregistrer</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  }
