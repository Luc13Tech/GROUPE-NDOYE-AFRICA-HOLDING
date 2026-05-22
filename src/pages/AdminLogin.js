import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SITE } from '../data/siteData';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const submit = () => {
    if (!password) { setError('Veuillez entrer le mot de passe.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (password === SITE.adminPass) {
        sessionStorage.setItem('gnah_admin', '1');
        navigate('/admin/dashboard');
      } else {
        setError('Mot de passe incorrect. Réessayez.');
        setLoading(false);
      }
    }, 700);
  };

  return (
    <div style={{
      minHeight:'100vh', background:'var(--navy)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20, position:'relative', overflow:'hidden'
    }}>
      {/* Background */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:"url('/images/yaye-dia/cite-vue-aerienne.jpg')",
        backgroundSize:'cover', backgroundPosition:'center',
        filter:'brightness(.12)', zIndex:0,
      }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,.08) 0%,transparent 70%)', zIndex:1 }}/>

      {/* Card */}
      <div style={{
        position:'relative', zIndex:2,
        background:'rgba(13,20,39,.95)', backdropFilter:'blur(20px)',
        border:'1px solid rgba(201,168,76,.28)',
        padding:'52px 44px', width:'100%', maxWidth:420,
        textAlign:'center',
        boxShadow:'0 24px 80px rgba(0,0,0,.6)',
      }}>
        {/* Gold top border */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,var(--gold),transparent)' }}/>

        {/* Logo */}
        <div style={{ marginBottom:28 }}>
          <img src="/images/logo/gnah-logo.png" alt="GNAH" style={{ height:56, margin:'0 auto 14px', display:'block' }}
            onError={e=>{e.target.style.display='none';}}/>
          <div style={{ background:'rgba(5,8,16,.6)', padding:'8px 16px', border:'1px solid rgba(201,168,76,.25)', display:'inline-block', marginBottom:6 }}>
            <div style={{ fontFamily:'var(--f-display)', fontSize:'.72rem', color:'var(--cream)', letterSpacing:'.22em' }}>GROUPE NDOYE AFRICA</div>
            <div style={{ display:'flex', alignItems:'center', gap:6, justifyContent:'center', marginTop:4 }}>
              <div style={{ width:22, height:1.5, background:'var(--gold)' }}/>
              <div style={{ fontFamily:'var(--f-display)', fontSize:'.6rem', color:'var(--gold)', letterSpacing:'.3em' }}>HOLDING.</div>
              <div style={{ width:22, height:1.5, background:'var(--gold)' }}/>
            </div>
          </div>
        </div>

        <div style={{ fontFamily:'var(--f-display)', fontSize:'1rem', color:'var(--gold)', letterSpacing:'.18em', marginBottom:6, textTransform:'uppercase' }}>
          Espace Administration
        </div>
        <div style={{ fontFamily:'var(--f-serif)', fontStyle:'italic', color:'rgba(200,195,186,.4)', fontSize:'.88rem', marginBottom:32 }}>
          Accès réservé aux administrateurs
        </div>

        {error && (
          <div style={{ background:'rgba(248,113,113,.08)', border:'1px solid rgba(248,113,113,.3)', color:'#f87171', padding:'10px 14px', marginBottom:18, fontSize:'.8rem', fontFamily:'var(--f-display)', letterSpacing:'.06em' }}>
            {error}
          </div>
        )}

        {/* Password field */}
        <div style={{ textAlign:'left', marginBottom:20 }}>
          <label style={{ display:'block', fontFamily:'var(--f-display)', fontSize:'.62rem', letterSpacing:'.18em', color:'rgba(201,168,76,.65)', textTransform:'uppercase', marginBottom:8 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e=>{ setPassword(e.target.value); setError(''); }}
            onKeyDown={e=>e.key==='Enter'&&submit()}
            placeholder="••••••••••"
            autoFocus
            style={{
              width:'100%', padding:'13px 16px',
              background:'rgba(255,255,255,.04)',
              border:'1px solid rgba(201,168,76,.22)',
              color:'var(--cream)', fontFamily:'var(--f-body)',
              fontSize:'.95rem', outline:'none',
              transition:'border-color .2s',
              letterSpacing:'.12em',
            }}
            onFocus={e=>e.target.style.borderColor='var(--gold)'}
            onBlur={e=>e.target.style.borderColor='rgba(201,168,76,.22)'}
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width:'100%', padding:'13px',
            background:loading?'rgba(201,168,76,.4)':'linear-gradient(135deg,#c9a84c,#e8c96a,#8b6914)',
            border:'none', color:'var(--navy)',
            fontFamily:'var(--f-display)', fontSize:'.75rem',
            letterSpacing:'.18em', textTransform:'uppercase',
            cursor:loading?'wait':'pointer',
            transition:'all .3s',
          }}
          onMouseEnter={e=>{if(!loading)e.currentTarget.style.opacity='.9';}}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >
          {loading ? (
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <span style={{ width:14, height:14, border:'2px solid var(--navy)', borderTopColor:'transparent', borderRadius:'50%', display:'inline-block', animation:'spin .8s linear infinite' }}/>
              Vérification...
            </span>
          ) : 'Accéder au panneau'}
        </button>

        <div style={{ marginTop:28, paddingTop:20, borderTop:'1px solid rgba(201,168,76,.1)' }}>
          <a href="/" style={{ fontFamily:'var(--f-display)', fontSize:'.6rem', letterSpacing:'.14em', color:'rgba(201,168,76,.35)', textDecoration:'none', textTransform:'uppercase', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(201,168,76,.35)'}>
            ← Retour au site
          </a>
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
