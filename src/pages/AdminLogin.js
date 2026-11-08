import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await loginAdmin(email.trim(), password);
      sessionStorage.setItem('gnah_admin', token);
      navigate('/admin/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.status === 401
        ? 'Identifiants incorrects. Réessayez.'
        : loginError.message || 'Connexion impossible pour le moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)', display: 'grid', placeItems: 'center', padding: 20 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 430, padding: 'clamp(28px, 6vw, 48px)', background: 'var(--navy2)', border: 'var(--border-gold)', boxShadow: '0 24px 80px rgba(0,0,0,.35)' }}>
        <p style={{ color: 'var(--gold)', fontFamily: 'var(--f-display)', letterSpacing: '.18em', fontSize: '.68rem' }}>GROUPE NDOYE AFRICA HOLDING</p>
        <h1 style={{ color: 'var(--cream)', fontFamily: 'var(--f-elegant)', fontSize: '1.8rem', margin: '14px 0 8px' }}>Espace administration</h1>
        <p style={{ color: 'rgba(200,195,186,.6)', marginBottom: 26 }}>Accès réservé aux administrateurs autorisés.</p>
        {error && <div role="alert" style={{ color: '#f87171', border: '1px solid rgba(248,113,113,.35)', padding: 12, marginBottom: 18 }}>{error}</div>}
        <label htmlFor="admin-email" style={{ display: 'block', color: 'var(--gold)', marginBottom: 7 }}>Adresse e-mail</label>
        <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} style={fieldStyle} />
        <label htmlFor="admin-password" style={{ display: 'block', color: 'var(--gold)', margin: '18px 0 7px' }}>Mot de passe</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} style={fieldStyle} />
        <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: 13 }}>
          {loading ? 'Connexion…' : 'Accéder au panneau'}
        </button>
        <a href="/" style={{ display: 'block', marginTop: 24, textAlign: 'center', color: 'var(--gold)', textDecoration: 'none' }}>← Retour au site</a>
      </form>
    </main>
  );
}

const fieldStyle = {
  boxSizing: 'border-box', width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.25)',
  color: 'var(--cream)', fontSize: '1rem', outline: 'none',
};
