import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { VILLA_TYPES, DEFAULT_ADMIN_CONTENT, SITE } from '../data/siteData';

// ── Mini chart helpers ──────────────────────────────────────
function LineChart({ data, color='#c9a84c', height=80 }) {
  const max = Math.max(...data.map(d=>d.val));
  const min = Math.min(...data.map(d=>d.val));
  const range = max - min || 1;
  const w=400; const h=height; const pad=16;
  const pts = data.map((d,i)=>{
    const x = pad + (i/(data.length-1))*(w-pad*2);
    const y = h - pad - ((d.val-min)/range)*(h-pad*2);
    return [x,y];
  });
  const path = pts.map((p,i)=>`${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
  const area = path + ` L${pts[pts.length-1][0]},${h-pad} L${pts[0][0]},${h-pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{width:'100%',height}} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad${color.replace('#','')})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i)=>(
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={color} stroke="var(--navy2)" strokeWidth="2"/>
      ))}
    </svg>
  );
}

function HBar({ label, val, max, color, pct }) {
  const [w, setW] = useState(0);
  useEffect(()=>{ setTimeout(()=>setW(pct), 200); },[pct]);
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
        <span style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color:'var(--cream)',letterSpacing:'.05em'}}>{label}</span>
        <span style={{fontFamily:'var(--f-display)',fontSize:'.68rem',color}}>{val} lots</span>
      </div>
      <div style={{height:7,background:'rgba(255,255,255,.06)',borderRadius:4,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${w}%`,background:color,borderRadius:4,transition:'width 1s ease',boxShadow:`0 0 8px ${color}60`}}/>
      </div>
    </div>
  );
}

// ── Nav icons
const Icons = {
  grid:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  home:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  villas:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/></svg>,
  partners:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  services:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
  gallery: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
  settings:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  lock:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  logout:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  eye:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  plus:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  search:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chart:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

// ── Initial lots data
const INIT_LOTS = [
  { id:1, nom:'Cité Yaye Dia — Villa F3 — Lot n°01', type:'F3', progress:65, status:'EN CONSTRUCTION' },
  { id:2, nom:'Cité Yaye Dia — Villa F4 Duplex — Lot n°12', type:'F4 Duplex', progress:100, status:'TERMINÉ' },
  { id:3, nom:'Cité Yaye Dia — Villa F5 — Lot n°07', type:'F5', progress:15, status:'PLANIFICATION' },
  { id:4, nom:'Cité Yaye Dia — Lotissement & Voirie', type:'Infrastructure', progress:40, status:'EN CONSTRUCTION' },
  { id:5, nom:'Cité Yaye Dia — Villa F4 Plein Pied — Lot n°23', type:'F4PP', progress:80, status:'EN CONSTRUCTION' },
  { id:6, nom:'Cité Yaye Dia — Villa F3 — Lot n°45', type:'F3', progress:100, status:'TERMINÉ' },
];

const STATUS_COLORS = {
  'TERMINÉ':        '#34d399',
  'EN CONSTRUCTION':'#f59e0b',
  'PLANIFICATION':  '#6366f1',
  'EN PAUSE':       '#f87171',
};

const TABS = [
  { id:'dashboard', label:'Tableau de bord',  icon:Icons.grid },
  { id:'projets',   label:'Projets',           icon:Icons.home },
  { id:'villas',    label:'Villas',            icon:Icons.villas },
  { id:'partenaires',label:'Partenaires',      icon:Icons.partners },
  { id:'services',  label:'Services',          icon:Icons.services },
  { id:'galerie',   label:'Galerie & Médias',  icon:Icons.gallery },
  { id:'settings',  label:'Paramètres',        icon:Icons.settings },
  { id:'password',  label:'Mot de passe',      icon:Icons.lock },
];

export default function AdminDashboard() {
  const navigate  = useNavigate();
  const [tab, setTab]             = useState('dashboard');
  const [lots, setLots]           = useState(INIT_LOTS);
  const [searchLot, setSearchLot] = useState('');
  const [modal, setModal]         = useState(null); // { type, data }
  const [form, setForm]           = useState({});
  const [settings, setSettings]   = useState({ phone:SITE.phone, email:SITE.email, address:SITE.address_fr, waMsg:typeof SITE.waMsg==='object'?SITE.waMsg.fr:SITE.waMsg });
  const [stgOk, setStgOk]         = useState(false);
  const [pwForm, setPwForm]       = useState({ cur:'', n1:'', n2:'' });
  const [pwMsg, setPwMsg]         = useState('');
  const [projets, setProjets]     = useState(() => { try{ return JSON.parse(localStorage.getItem('gnah_projets')||'null')||DEFAULT_ADMIN_CONTENT.projects; }catch{ return DEFAULT_ADMIN_CONTENT.projects; }});
  const [sideOpen, setSideOpen]   = useState(true);
  const intervalRef = useRef(null);

  // Auto-update chart data
  const [chartData, setChartData] = useState([
    { label:'T1 2024', val:12 },
    { label:'T2 2024', val:18 },
    { label:'T3 2024', val:22 },
    { label:'T4 2024', val:27 },
    { label:'T1 2025', val:31 },
    { label:'T2 2025', val:38 },
    { label:'T3 2025', val:44 },
    { label:'T4 2025', val:52 },
    { label:'T1 2026', val:58 },
    { label:'En cours', val:65 },
  ]);

  // Simulate live update every 8s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length-1];
        const inc = Math.floor(Math.random()*4) + 1;
        return [...prev.slice(0,-1), { ...last, val: last.val + inc }];
      });
    }, 8000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if(!sessionStorage.getItem('gnah_admin')){ navigate('/admin'); }
  }, [navigate]);

  const saveProjets = (arr) => { setProjets(arr); localStorage.setItem('gnah_projets', JSON.stringify(arr)); };
  const logout = () => { sessionStorage.removeItem('gnah_admin'); navigate('/admin'); };

  const villaCount = VILLA_TYPES.reduce((acc,v)=>{ acc[v.id]=lots.filter(l=>l.type===v.id||l.type===v.fr?.name||l.type===v.en?.name||l.type.toLowerCase().includes(v.id)).length; return acc; }, {});
  const f3c  = lots.filter(l=>l.type==='F3').length;
  const f4c  = lots.filter(l=>l.type==='F4PP').length;
  const f4dc = lots.filter(l=>l.type==='F4 Duplex').length;
  const f5c  = lots.filter(l=>l.type==='F5').length;
  const total = lots.length;
  const maxLots = Math.max(f3c,f4c,f4dc,f5c,1);
  const filteredLots = lots.filter(l => l.nom.toLowerCase().includes(searchLot.toLowerCase()) || l.type.toLowerCase().includes(searchLot.toLowerCase()));

  const openModal = (type, data={}) => { setModal(type); setForm(data); };
  const closeModal = () => { setModal(null); setForm({}); };

  const addLot = () => {
    if(!form.nom) return;
    setLots(p=>[...p,{ id:Date.now(), nom:form.nom, type:form.type||'F3', progress:parseInt(form.progress)||0, status:form.status||'PLANIFICATION' }]);
    closeModal();
  };
  const editLot = () => {
    setLots(p=>p.map(l=>l.id===form.id?{...form,progress:parseInt(form.progress)||0}:l));
    closeModal();
  };
  const delLot = (id) => { if(window.confirm('Supprimer ce lot ?')) setLots(p=>p.filter(l=>l.id!==id)); };

  const saveSettings = () => { localStorage.setItem('gnah_settings', JSON.stringify(settings)); setStgOk(true); setTimeout(()=>setStgOk(false),3000); };
  const changePw = () => {
    if(pwForm.cur !== SITE.adminPass){ setPwMsg('Mot de passe actuel incorrect.'); return; }
    if(pwForm.n1.length < 6){ setPwMsg('Minimum 6 caractères.'); return; }
    if(pwForm.n1 !== pwForm.n2){ setPwMsg('Les mots de passe ne correspondent pas.'); return; }
    SITE.adminPass = pwForm.n1; setPwMsg('Mot de passe mis à jour !'); setPwForm({cur:'',n1:'',n2:''});
  };

  const navBtnStyle = (id) => ({
    width:'100%', display:'flex', alignItems:'center', gap:10,
    padding:'11px 20px', background:'none', border:'none',
    borderLeft:`2px solid ${tab===id?'var(--gold)':'transparent'}`,
    color: tab===id ? 'var(--gold)' : 'rgba(245,240,232,.38)',
    fontFamily:'var(--f-display)', fontSize:'.62rem', letterSpacing:'.1em',
    textTransform:'uppercase', cursor:'pointer', transition:'all .2s', textAlign:'left',
    background: tab===id ? 'rgba(201,168,76,.06)' : 'none',
  });

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--navy)', fontFamily:'var(--f-body)' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:sideOpen?250:64, background:'var(--navy2)', borderRight:'var(--border-gold)', display:'flex', flexDirection:'column', flexShrink:0, transition:'width .3s', overflow:'hidden' }}>
        {/* Logo */}
        <div style={{ padding:'22px 18px', borderBottom:'var(--border-gold)' }}>
          {sideOpen && <>
            <div style={{ background:'rgba(13,20,39,.8)', padding:'7px 12px', marginBottom:4, border:'1px solid rgba(201,168,76,.2)' }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.58rem', color:'var(--cream)', letterSpacing:'.18em' }}>GROUPE NDOYE AFRICA</div>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.52rem', color:'var(--gold)', letterSpacing:'.28em', marginTop:2 }}>HOLDING.</div>
            </div>
            <div style={{ fontFamily:'var(--f-display)', fontSize:'.62rem', color:'var(--gold)', letterSpacing:'.14em' }}>Admin Panel</div>
            <div style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:'.6rem', color:'rgba(200,195,186,.35)', marginTop:2 }}>Panneau d'administration</div>
          </>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{ position:'absolute', top:24, right:sideOpen?18:-8, background:'var(--navy2)', border:'var(--border-gold)', color:'var(--gold)', padding:'4px 7px', cursor:'pointer', fontSize:'.7rem' }}>
            {sideOpen ? '‹' : '›'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, paddingTop:12, display:'flex', flexDirection:'column', overflowY:'auto' }}>
          {TABS.map(t=>(
            <button key={t.id} style={navBtnStyle(t.id)} onClick={()=>setTab(t.id)}>
              <span style={{ flexShrink:0 }}>{t.icon}</span>
              {sideOpen && t.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ borderTop:'var(--border-gold)', paddingTop:8, paddingBottom:12 }}>
          <button style={navBtnStyle('view')} onClick={()=>window.open('/','_blank')}>
            <span style={{flexShrink:0}}>{Icons.eye}</span>
            {sideOpen && 'Voir le site'}
          </button>
          <button style={{...navBtnStyle('logout'), color:'#f87171'}} onClick={logout}>
            <span style={{flexShrink:0}}>{Icons.logout}</span>
            {sideOpen && 'Déconnexion'}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1, padding:'36px 32px', overflowY:'auto', minWidth:0 }}>

        {/* ═══ DASHBOARD ═══ */}
        {tab==='dashboard' && (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
              <div>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)' }}>Tableau de Bord</div>
                <div style={{ fontSize:'.76rem', color:'rgba(200,195,186,.4)', marginTop:2 }}>{new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
              </div>
              <button onClick={()=>{setTab('projets');openModal('addProjet');}} className="btn btn-gold" style={{fontSize:'.68rem',padding:'9px 18px',display:'flex',alignItems:'center',gap:6}}>
                {Icons.plus} Nouveau projet
              </button>
            </div>

            {/* KPI CARDS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:28 }}>
              {[
                { lbl:'Lots enregistrés', val:lots.length, color:'var(--gold)', icon:Icons.home },
                { lbl:'Terminés', val:lots.filter(l=>l.status==='TERMINÉ').length, color:'#34d399', icon:Icons.chart },
                { lbl:'En construction', val:lots.filter(l=>l.status==='EN CONSTRUCTION').length, color:'#f59e0b', icon:Icons.villas },
                { lbl:'Projets', val:projets.length, color:'#6366f1', icon:Icons.grid },
              ].map((s,i)=>(
                <div key={i} style={{ background:'var(--navy2)', border:`1px solid ${s.color}30`, padding:'20px 18px', borderTop:`3px solid ${s.color}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <span style={{ color:s.color, opacity:.7 }}>{s.icon}</span>
                    <span style={{ fontFamily:'var(--f-display)', fontSize:'.55rem', color:'rgba(200,195,186,.3)', letterSpacing:'.1em', textTransform:'uppercase' }}>{s.lbl}</span>
                  </div>
                  <div style={{ fontFamily:'var(--f-elegant)', fontSize:'2rem', color:s.color, filter:`drop-shadow(0 0 8px ${s.color}50)` }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* LINE CHART */}
            <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:24, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                <div>
                  <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1rem', color:'var(--cream)' }}>Évolution de l'Activité Immobilière</div>
                  <div style={{ fontSize:'.72rem', color:'rgba(200,195,186,.35)', marginTop:2 }}>
                    Nombre de lots &amp; chantiers de construction terminés par trimestre
                    <span style={{ marginLeft:10, padding:'2px 8px', background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.55rem', letterSpacing:'.1em', border:'1px solid rgba(201,168,76,.25)' }}>Automatisé</span>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end', gap:16, marginBottom:12 }}>
                <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:'rgba(200,195,186,.45)' }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--gold)', display:'inline-block' }}/> Projets terminés
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.68rem', color:'rgba(200,195,186,.45)' }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'#f59e0b', display:'inline-block' }}/> Projets en cours
                </span>
              </div>
              <LineChart data={chartData} color="var(--gold)" height={110}/>
              {/* X labels */}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, paddingTop:8, borderTop:'1px solid rgba(201,168,76,.08)' }}>
                {chartData.map((d,i)=>(
                  <span key={i} style={{ fontFamily:'var(--f-display)', fontSize:'.52rem', color:'rgba(200,195,186,.3)', textAlign:'center', flex:1 }}>{d.label}</span>
                ))}
              </div>
            </div>

            {/* VILLA DISTRIBUTION */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
              <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:24 }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'.95rem', color:'var(--cream)', marginBottom:4 }}>Répartition des Villas</div>
                <div style={{ fontSize:'.72rem', color:'rgba(200,195,186,.35)', marginBottom:18 }}>Distribution par typologies (F3, F4, F5)</div>
                <HBar label="Villa F3 (Famille compacte)" val={f3c} max={maxLots} color="#f59e0b" pct={maxLots>0?(f3c/maxLots)*100:0}/>
                <HBar label="Villa F4 Plein Pied" val={f4c} max={maxLots} color="#34d399" pct={maxLots>0?(f4c/maxLots)*100:0}/>
                <HBar label="Villa F4 Duplex (Premium)" val={f4dc} max={maxLots} color="#6366f1" pct={maxLots>0?(f4dc/maxLots)*100:0}/>
                <HBar label="Villa F5 (Grand Luxe)" val={f5c} max={maxLots} color="#f472b6" pct={maxLots>0?(f5c/maxLots)*100:0}/>
                <div style={{ marginTop:14, padding:'12px 14px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.05)', fontSize:'.72rem', color:'rgba(200,195,186,.4)', lineHeight:1.6 }}>
                  <strong style={{ color:'rgba(200,195,186,.6)' }}>Note de l'administrateur :</strong> Vous pouvez ajouter des villas dans la section ci-dessous pour modifier la répartition automatiquement.
                </div>
              </div>

              {/* Planifier un chantier */}
              <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:24 }}>
                <div style={{ fontFamily:'var(--f-elegant)', fontSize:'.95rem', color:'var(--cream)', marginBottom:4 }}>Planifier un nouveau Chantier</div>
                <div style={{ fontSize:'.72rem', color:'rgba(200,195,186,.35)', marginBottom:18 }}>Ajouter un lot au registre</div>
                <div className="form-group" style={{ marginBottom:12 }}>
                  <label style={{ fontFamily:'var(--f-display)', fontSize:'.58rem', color:'rgba(201,168,76,.6)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6, display:'block' }}>NOM DU LOT / SECTEUR</label>
                  <input className="form-input form-input-dark" placeholder="ex: Villa F4 - Lot n°42" value={form.nom||''} onChange={e=>setForm(p=>({...p,nom:e.target.value}))} style={{borderRadius:6}}/>
                </div>
                <div className="form-group" style={{ marginBottom:16 }}>
                  <label style={{ fontFamily:'var(--f-display)', fontSize:'.58rem', color:'rgba(201,168,76,.6)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6, display:'block' }}>CATÉGORIE DE TYPOLOGIE</label>
                  <select className="form-select form-select-dark" value={form.type||'F3'} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{borderRadius:6}}>
                    {['F3','F4PP','F4 Duplex','F5','Infrastructure'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <button onClick={()=>{ if(!form.nom) return; setLots(p=>[...p,{id:Date.now(),nom:form.nom,type:form.type||'F3',progress:0,status:'PLANIFICATION'}]); setForm({}); }}
                  className="btn btn-gold" style={{ width:'100%', justifyContent:'center', fontSize:'.7rem', padding:'11px', borderRadius:8 }}>
                  {Icons.plus} Ajouter au Registre
                </button>
              </div>
            </div>

            {/* WORK TRACKING */}
            <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <div>
                  <div style={{ fontFamily:'var(--f-elegant)', fontSize:'.95rem', color:'var(--cream)' }}>Suivi des Travaux par Lot</div>
                  <div style={{ fontSize:'.72rem', color:'rgba(200,195,186,.35)', marginTop:2 }}>{lots.length} lots enregistrés</div>
                </div>
                <button onClick={()=>openModal('addLot',{type:'F3',status:'PLANIFICATION',progress:0})}
                  className="btn btn-gold" style={{ fontSize:'.62rem', padding:'7px 14px', display:'flex', alignItems:'center', gap:6 }}>
                  {Icons.plus} Ajouter un lot
                </button>
              </div>

              {/* Search */}
              <div style={{ position:'relative', marginBottom:16 }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(200,195,186,.3)' }}>{Icons.search}</span>
                <input className="form-input form-input-dark"
                  style={{ paddingLeft:36, background:'rgba(255,255,255,.04)', border:'1px solid rgba(201,168,76,.15)', borderRadius:8 }}
                  placeholder="Rechercher un lot..."
                  value={searchLot} onChange={e=>setSearchLot(e.target.value)}/>
              </div>

              {/* Table */}
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr>
                      {['NOM DU LOT','TYPE','PROGRESSION','STATUT','ACTIONS'].map((h,i)=>(
                        <th key={i} style={{ background:'rgba(201,168,76,.08)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.56rem', letterSpacing:'.14em', padding:'10px 12px', textAlign:'left', textTransform:'uppercase', borderBottom:'1px solid rgba(201,168,76,.15)', whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLots.map(lot=>(
                      <tr key={lot.id}>
                        <td style={{ padding:'11px 12px', borderBottom:'1px solid rgba(255,255,255,.04)', fontSize:'.82rem', color:'var(--cream)' }}>{lot.nom}</td>
                        <td style={{ padding:'11px 12px', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                          <span style={{ padding:'3px 8px', background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.58rem', letterSpacing:'.08em', border:'1px solid rgba(201,168,76,.2)' }}>{lot.type}</span>
                        </td>
                        <td style={{ padding:'11px 12px', borderBottom:'1px solid rgba(255,255,255,.04)', minWidth:160 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ flex:1, height:6, background:'rgba(255,255,255,.06)', borderRadius:3 }}>
                              <div style={{ height:'100%', width:`${lot.progress}%`, background:STATUS_COLORS[lot.status]||'var(--gold)', borderRadius:3, transition:'width .6s', boxShadow:`0 0 6px ${STATUS_COLORS[lot.status]||'var(--gold)'}60` }}/>
                            </div>
                            <span style={{ fontFamily:'var(--f-display)', fontSize:'.62rem', color:'rgba(200,195,186,.6)', minWidth:30 }}>{lot.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding:'11px 12px', borderBottom:'1px solid rgba(255,255,255,.04)', whiteSpace:'nowrap' }}>
                          <span style={{ padding:'3px 10px', background:`${STATUS_COLORS[lot.status]||'var(--gold)'}15`, color:STATUS_COLORS[lot.status]||'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.56rem', letterSpacing:'.08em', border:`1px solid ${STATUS_COLORS[lot.status]||'var(--gold)'}40` }}>
                            {lot.status}
                          </span>
                        </td>
                        <td style={{ padding:'11px 12px', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                          <div style={{ display:'flex', gap:6 }}>
                            <button onClick={()=>openModal('editLot',{...lot})} className="btn-edit" style={{ padding:'4px 9px', fontFamily:'var(--f-display)', fontSize:'.56rem', display:'flex', alignItems:'center', gap:4 }}>{Icons.edit} Modifier</button>
                            <button onClick={()=>delLot(lot.id)} className="btn-del" style={{ padding:'4px 9px', fontFamily:'var(--f-display)', fontSize:'.56rem', display:'flex', alignItems:'center', gap:4 }}>{Icons.trash} Supprimer</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredLots.length===0 && (
                      <tr><td colSpan={5} style={{ textAlign:'center', padding:'28px', color:'rgba(200,195,186,.3)', fontSize:'.82rem' }}>Aucun lot trouvé.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ═══ PROJETS ═══ */}
        {tab==='projets' && (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
              <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)' }}>Gestion des Projets</div>
              <button onClick={()=>openModal('addProjet',{active:true})} className="btn btn-gold" style={{fontSize:'.68rem',padding:'9px 18px',display:'flex',alignItems:'center',gap:6}}>
                {Icons.plus} Nouveau Projet
              </button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18 }}>
              {projets.map(p=>(
                <div key={p.id} style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:20 }}>
                  {p.img && <img src={p.img} alt={p.title?.fr||''} style={{ width:'100%', height:110, objectFit:'cover', marginBottom:12 }} onError={e=>{e.target.style.display='none';}}/>}
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ padding:'2px 8px', background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.58rem' }}>{p.category}</span>
                    <span style={{ padding:'2px 8px', background:p.active?'rgba(52,211,153,.1)':'rgba(248,113,113,.1)', color:p.active?'#34d399':'#f87171', fontFamily:'var(--f-display)', fontSize:'.58rem' }}>
                      {p.active?'ACTIF':'INACTIF'}
                    </span>
                  </div>
                  <div style={{ fontFamily:'var(--f-display)', fontSize:'.82rem', color:'var(--cream)', marginBottom:6 }}>{p.title?.fr||'Projet'}</div>
                  <p style={{ fontSize:'.75rem', color:'rgba(200,195,186,.5)', lineHeight:1.6, marginBottom:14 }}>{p.desc?.fr?.slice(0,100)+'...'}</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={()=>openModal('editProjet',{...p,title_fr:p.title?.fr,title_en:p.title?.en,desc_fr:p.desc?.fr,desc_en:p.desc?.en})} className="btn-edit" style={{padding:'5px 12px',fontFamily:'var(--f-display)',fontSize:'.6rem',display:'flex',alignItems:'center',gap:4}}>{Icons.edit} Modifier</button>
                    <button onClick={()=>{if(window.confirm('Supprimer ce projet ?'))saveProjets(projets.filter(x=>x.id!==p.id));}} className="btn-del" style={{padding:'5px 12px',fontFamily:'var(--f-display)',fontSize:'.6rem',display:'flex',alignItems:'center',gap:4}}>{Icons.trash} Supprimer</button>
                    <button onClick={()=>saveProjets(projets.map(x=>x.id===p.id?{...x,active:!x.active}:x))} className="btn-tog" style={{padding:'5px 12px',fontFamily:'var(--f-display)',fontSize:'.6rem'}}>
                      {p.active?'Désactiver':'Activer'}
                    </button>
                  </div>
                </div>
              ))}
              {projets.length===0 && <div style={{padding:'40px',color:'rgba(200,195,186,.3)',fontFamily:'var(--f-display)',fontSize:'.78rem'}}>Aucun projet. Créez le premier.</div>}
            </div>
          </>
        )}

        {/* ═══ VILLAS ═══ */}
        {tab==='villas' && (
          <>
            <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)', marginBottom:28 }}>Gestion des Villas</div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr>
                    {['Type','Nom FR','Surface Terrain','Surface Bâtie','Standing','Actions'].map((h,i)=>(
                      <th key={i} style={{ background:'rgba(201,168,76,.1)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.58rem', letterSpacing:'.14em', padding:'11px 14px', textAlign:'left', textTransform:'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VILLA_TYPES.map(v=>(
                    <tr key={v.id}>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)'}}><span style={{padding:'3px 8px',background:`${v.color}20`,color:v.color,fontFamily:'var(--f-display)',fontSize:'.62rem',border:`1px solid ${v.color}40`}}>{v.id.toUpperCase()}</span></td>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)',color:'var(--cream)',fontSize:'.84rem'}}>{v.fr?.name||v.id}</td>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)',color:'rgba(200,195,186,.6)',fontSize:'.82rem'}}>{v.surface}</td>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)',color:'var(--gold)',fontFamily:'var(--f-display)',fontSize:'.78rem',fontWeight:600}}>{v.bati}</td>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)',color:'rgba(200,195,186,.6)',fontSize:'.82rem'}}>{v.fr?.standing||''}</td>
                      <td style={{padding:'10px 14px',borderBottom:'1px solid rgba(201,168,76,.07)'}}>
                        <button onClick={()=>openModal('editVilla',{...v,name_fr:v.fr?.name,standing_fr:v.fr?.standing})} className="btn-edit" style={{padding:'4px 10px',fontFamily:'var(--f-display)',fontSize:'.58rem',display:'flex',alignItems:'center',gap:4}}>{Icons.edit} Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ═══ PARAMÈTRES ═══ */}
        {tab==='settings' && (
          <>
            <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)', marginBottom:28 }}>Paramètres du Site</div>
            <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:36, maxWidth:580 }}>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.72rem', color:'var(--gold)', letterSpacing:'.16em', marginBottom:22, textTransform:'uppercase' }}>COORDONNÉES DE CONTACT</div>
              {stgOk && <div style={{ background:'rgba(52,211,153,.08)', border:'1px solid rgba(52,211,153,.3)', color:'#34d399', padding:'10px 14px', marginBottom:16, fontSize:'.8rem', fontFamily:'var(--f-display)' }}>Paramètres sauvegardés avec succès.</div>}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[{k:'phone',l:'Téléphone'},{k:'email',l:'Email'},{k:'address',l:'Adresse'}].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{f.l}</label>
                    <input className="form-input form-input-dark" value={settings[f.k]} onChange={e=>setSettings(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label form-label-dark">Message WhatsApp par défaut</label>
                  <textarea className="form-textarea form-textarea-dark" style={{minHeight:80}} value={settings.waMsg} onChange={e=>setSettings(p=>({...p,waMsg:e.target.value}))}/>
                </div>
                <button onClick={saveSettings} className="btn btn-gold" style={{alignSelf:'flex-start',fontSize:'.72rem'}}>Sauvegarder</button>
              </div>
            </div>
          </>
        )}

        {/* ═══ MOT DE PASSE ═══ */}
        {tab==='password' && (
          <>
            <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)', marginBottom:28 }}>Changer le Mot de Passe</div>
            <div style={{ background:'var(--navy2)', border:'var(--border-gold)', padding:36, maxWidth:440 }}>
              {pwMsg && <div style={{ padding:'10px 14px', marginBottom:16, fontSize:'.8rem', fontFamily:'var(--f-display)', background:pwMsg.includes('mis à jour')?'rgba(52,211,153,.08)':'rgba(248,113,113,.08)', border:`1px solid ${pwMsg.includes('mis à jour')?'rgba(52,211,153,.3)':'rgba(248,113,113,.3)'}`, color:pwMsg.includes('mis à jour')?'#34d399':'#f87171' }}>{pwMsg}</div>}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[{k:'cur',l:'Mot de passe actuel'},{k:'n1',l:'Nouveau mot de passe'},{k:'n2',l:'Confirmer'}].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{f.l}</label>
                    <input className="form-input form-input-dark" type="password" placeholder="••••••••" value={pwForm[f.k]} onChange={e=>setPwForm(p=>({...p,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <button onClick={changePw} className="btn btn-gold" style={{alignSelf:'flex-start',fontSize:'.72rem'}}>Mettre à jour</button>
              </div>
            </div>
          </>
        )}

        {/* Other tabs placeholder */}
        {['partenaires','services','galerie'].includes(tab) && (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontFamily:'var(--f-elegant)', fontSize:'1.5rem', color:'var(--cream)', marginBottom:12, textTransform:'capitalize' }}>
              {TABS.find(t=>t.id===tab)?.label}
            </div>
            <p style={{ color:'rgba(200,195,186,.4)', fontSize:'.88rem', marginBottom:24 }}>
              Cette section permet de gérer le contenu publié sur la plateforme.
            </p>
            <button onClick={()=>openModal('add'+tab.charAt(0).toUpperCase()+tab.slice(1),{})} className="btn btn-gold" style={{fontSize:'.72rem',display:'inline-flex',alignItems:'center',gap:8}}>
              {Icons.plus} Ajouter un élément
            </button>
          </div>
        )}
      </main>

      {/* ═══ MODALS ═══ */}
      {modal && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div className="modal-box">
            <div className="modal-title">
              {modal==='addLot'?'Nouveau Lot':modal==='editLot'?'Modifier le Lot':
               modal==='addProjet'?'Nouveau Projet':modal==='editProjet'?'Modifier le Projet':
               modal==='editVilla'?'Modifier la Villa':'Formulaire'}
            </div>

            {/* LOT FORM */}
            {(modal==='addLot'||modal==='editLot') && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="form-group"><label className="form-label form-label-dark">Nom du lot *</label><input className="form-input form-input-dark" placeholder="ex: Cité Yaye Dia — Villa F3 — Lot n°01" value={form.nom||''} onChange={e=>setForm(p=>({...p,nom:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label form-label-dark">Type</label>
                  <select className="form-select form-select-dark" value={form.type||'F3'} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                    {['F3','F4PP','F4 Duplex','F5','Infrastructure'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label form-label-dark">Progression (0–100%)</label><input className="form-input form-input-dark" type="number" min="0" max="100" value={form.progress||0} onChange={e=>setForm(p=>({...p,progress:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label form-label-dark">Statut</label>
                  <select className="form-select form-select-dark" value={form.status||'PLANIFICATION'} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
                    {Object.keys(STATUS_COLORS).map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                  <button onClick={closeModal} style={{ padding:'9px 18px', background:'transparent', border:'var(--border-gold)', color:'rgba(200,195,186,.5)', fontFamily:'var(--f-display)', fontSize:'.65rem', cursor:'pointer' }}>Annuler</button>
                  <button onClick={modal==='addLot'?addLot:editLot} className="btn btn-gold" style={{ fontSize:'.7rem' }}>{modal==='addLot'?'Ajouter':'Enregistrer'}</button>
                </div>
              </div>
            )}

            {/* PROJET FORM */}
            {(modal==='addProjet'||modal==='editProjet') && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  {k:'title_fr',l:'Titre FR *'},{k:'title_en',l:'Titre EN'},
                  {k:'desc_fr',l:'Description FR *',ta:true},{k:'desc_en',l:'Description EN',ta:true},
                  {k:'category',l:'Catégorie'},{k:'img',l:'URL Image'},
                ].map(f=>(
                  <div key={f.k} className="form-group">
                    <label className="form-label form-label-dark">{f.l}</label>
                    {f.ta ? <textarea className="form-textarea form-textarea-dark" style={{minHeight:70}} value={form[f.k]||''} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/> : <input className="form-input form-input-dark" value={form[f.k]||''} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}/>}
                  </div>
                ))}
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <input type="checkbox" checked={form.active!==false} onChange={e=>setForm(p=>({...p,active:e.target.checked}))} style={{accentColor:'var(--gold)',width:16,height:16}}/>
                  <label style={{fontFamily:'var(--f-display)',fontSize:'.65rem',color:'var(--text)',letterSpacing:'.1em',textTransform:'uppercase'}}>Projet actif (visible sur le site)</label>
                </div>
                <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                  <button onClick={closeModal} style={{ padding:'9px 18px', background:'transparent', border:'var(--border-gold)', color:'rgba(200,195,186,.5)', fontFamily:'var(--f-display)', fontSize:'.65rem', cursor:'pointer' }}>Annuler</button>
                  <button onClick={()=>{
                    if(!form.title_fr) return;
                    const item={ id:form.id||Date.now(), active:form.active!==false, category:form.category||'Immobilier', img:form.img||'', title:{fr:form.title_fr,en:form.title_en||form.title_fr}, desc:{fr:form.desc_fr||'',en:form.desc_en||form.desc_fr||''}, waMsg:{fr:`Bonjour, je suis intéressé(e) par le projet "${form.title_fr}".`,en:`Hello, I am interested in the "${form.title_fr}" project.`} };
                    modal==='addProjet' ? saveProjets([...projets,item]) : saveProjets(projets.map(x=>x.id===item.id?item:x));
                    closeModal();
                  }} className="btn btn-gold" style={{ fontSize:'.7rem' }}>{modal==='addProjet'?'Créer':'Enregistrer'}</button>
                </div>
              </div>
            )}

            {/* VILLA FORM */}
            {modal==='editVilla' && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="form-group"><label className="form-label form-label-dark">Nom FR</label><input className="form-input form-input-dark" value={form.name_fr||''} onChange={e=>setForm(p=>({...p,name_fr:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label form-label-dark">Standing FR</label><input className="form-input form-input-dark" value={form.standing_fr||''} onChange={e=>setForm(p=>({...p,standing_fr:e.target.value}))}/></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div className="form-group"><label className="form-label form-label-dark">Surface terrain</label><input className="form-input form-input-dark" value={form.surface||''} onChange={e=>setForm(p=>({...p,surface:e.target.value}))}/></div>
                  <div className="form-group"><label className="form-label form-label-dark">Surface bâtie</label><input className="form-input form-input-dark" value={form.bati||''} onChange={e=>setForm(p=>({...p,bati:e.target.value}))}/></div>
                </div>
                <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                  <button onClick={closeModal} style={{ padding:'9px 18px', background:'transparent', border:'var(--border-gold)', color:'rgba(200,195,186,.5)', fontFamily:'var(--f-display)', fontSize:'.65rem', cursor:'pointer' }}>Annuler</button>
                  <button onClick={closeModal} className="btn btn-gold" style={{ fontSize:'.7rem' }}>Enregistrer</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
