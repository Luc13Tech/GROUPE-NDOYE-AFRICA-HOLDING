import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LangProvider } from './hooks/useLang';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Entreprises from './pages/Entreprises';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/"                element={<Layout><Home /></Layout>} />
          <Route path="/services"        element={<Layout><Services /></Layout>} />
          <Route path="/projets"         element={<Layout><Projects /></Layout>} />
          <Route path="/engagements"     element={<Layout><Commitments /></Layout>} />
          <Route path="/partenaires"     element={<Layout><Partners /></Layout>} />
          <Route path="/investisseurs"   element={<Layout><Investors /></Layout>} />
          <Route path="/collaboration"   element={<Layout><Collaboration /></Layout>} />
          <Route path="/a-propos"        element={<Layout><About /></Layout>} />
          <Route path="/contact"         element={<Layout><Contact /></Layout>} />
          <Route path="/galerie"         element={<Layout><Gallery /></Layout>} />
          <Route path="/videos"          element={<Layout><Videos /></Layout>} />
          <Route path="/entreprises" element={<Layout><Entreprises /></Layout>} />
          <Route path="/admin"           element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*"                element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
