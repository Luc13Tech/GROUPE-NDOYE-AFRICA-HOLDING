import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import { useContent } from '../services/ContentProvider';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { SITE = {} } = useContent();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const submit = async (event) => {
    event?.preventDefault();
    if (!email.trim() || !password) {
      setError('Veuillez saisir votre email et votre mot de passe.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await loginAdmin({ email: email.trim(), password });
      // Backend session uses HttpOnly cookie; only keep a non-secret UI flag.
      sessionStorage.setItem('gnah_admin', '1');
      navigate('/admin/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError?.message || 'Échec de connexion au serveur. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: "url('/Images/yaye-dia/cite-vue-aerienne.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.12)' }} />
      <form onSubmit={submit} style={{ position: 'relative', zIndex: 1, boxSizing: 'border-box', width: '100%', maxWidth: 430, padding: 'clamp(28px, 6vw, 48px)', background: 'rgba(13,20,39,.96)', border: '1px solid rgba(201,168,76,.3)', boxShadow: '0 24px 80px rgba(0,0,0,.6)' }}>
        <p style={{ color: 'var(--gold)', fontFamily: 'var(--f-display)', letterSpacing: '.18em', fontSize: '.68rem' }}>GROUPE NDOYE AFRICA HOLDING</p>
        <h1 style={{ color: 'var(--cream)', fontFamily: 'var(--f-elegant)', fontSize: '1.8rem', margin: '14px 0 8px' }}>Espace administration</h1>
        <p style={{ color: 'rgba(200,195,186,.6)', marginBottom: 26 }}>Accès réservé aux administrateurs autorisés.</p>
        {error && <div role="alert" style={{ color: '#f87171', border: '1px solid rgba(248,113,113,.35)', padding: 12, marginBottom: 18 }}>{error}</div>}
        <label htmlFor="admin-email" style={labelStyle}>Adresse e-mail</label>
        <input ref={emailRef} id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} style={fieldStyle} />
        <label htmlFor="admin-password" style={{ ...labelStyle, marginTop: 18 }}>Mot de passe</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submit(event)} style={fieldStyle} />
        <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: 13 }}>
          {loading ? 'Connexion…' : 'Accéder au panneau'}
        </button>
        <a href="/" style={{ display: 'block', marginTop: 24, textAlign: 'center', color: 'var(--gold)', textDecoration: 'none' }}>← Retour au site</a>
        {SITE.name && <span className="sr-only">{SITE.name}</span>}
      </form>
    </main>
  );
}

const labelStyle = { display: 'block', color: 'var(--gold)', marginBottom: 7 };
const fieldStyle = {
  boxSizing: 'border-box', width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.25)',
  color: 'var(--cream)', fontSize: '1rem', outline: 'none',
};
