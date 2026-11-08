import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LangProvider, useLang } from './hooks/useLang';
import { ContentProvider, useContent } from './services/ContentProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Commitments from './pages/Commitments';
import Partners from './pages/Partners';
import Investors from './pages/Investors';
import Collaboration from './pages/Collaboration';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Entreprises from './pages/Entreprises';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ORIGIN = 'https://groupendoyeafrica.com';

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function PageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const { NAV = [], SITE = {}, TAGLINE = {}, COMPANY_INTRO = {} } = useContent();

  useEffect(() => {
    const item = (NAV || []).find((n) => n.path === pathname);
    const name = SITE.name || 'Groupe Ndoye Africa Holding';
    document.title =
      pathname === '/'
        ? `${name} — ${TAGLINE[lang] || TAGLINE.fr || ''}`
        : `${item ? item[lang] || item.fr : name} — ${name}`;
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;

    const intro = (COMPANY_INTRO && (COMPANY_INTRO[lang] || COMPANY_INTRO.fr)) || '';
    const description = intro.length > 158 ? `${intro.slice(0, 155).trimEnd()}…` : intro;
    setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), { content: description });
    setTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }), { content: 'index, follow' });
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), { href: `${ORIGIN}${pathname}` });
  }, [pathname, lang, NAV, SITE, TAGLINE, COMPANY_INTRO]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <div id="contenu" key={pathname}>
        <Outlet />
      </div>
      <Footer />
      <FloatingButtons />
      <PWAInstallPrompt />
    </>
  );
}

function ProtectedAdminRoute() {
  const isLogged = sessionStorage.getItem('gnah_admin') === '1';
  return isLogged ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <LangProvider>
      <ContentProvider>
        <BrowserRouter>
          <PageMeta />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projets" element={<Projects />} />
              <Route path="/engagements" element={<Commitments />} />
              <Route path="/partenaires" element={<Partners />} />
              <Route path="/entreprises" element={<Entreprises />} />
              <Route path="/investisseurs" element={<Investors />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/videos" element={<Videos />} />
            </Route>

            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Analytics />
        </BrowserRouter>
      </ContentProvider>
    </LangProvider>
  );
}
