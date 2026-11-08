
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLang } from '../hooks/useLang';
import { useContent } from '../services/ContentProvider';
import { makeTl, pick } from '../utils/i18n';

import Reveal from '../components/Reveal';
import Hero from '../components/home/Hero';
import AdsCarousel from '../components/home/AdsCarousel';
import VillaCube from '../components/home/VillaCube';
import ServiceScenes from '../components/home/ServiceScenes';

import '../components/home/home.css';

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

const prefersReducedMotion = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

const localized = (value, lang) => {
  if (!value || typeof value !== 'object') return {};
  return value[lang] || value.fr || {};
};

/* -------------------------------------------------------
   Image avec effet parallaxe
------------------------------------------------------- */

function ParallaxImage({ className = '', src, speed = 0.08 }) {
  const wrap = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let raf = 0;

    const update = () => {
      raf = 0;

      const element = wrap.current;
      const image = inner.current;

      if (!element || !image) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const distance =
        -(rect.top + rect.height / 2 - viewportHeight / 2) * speed;

      image.style.transform = `translate3d(0, ${distance.toFixed(1)}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={wrap} className={`pimg ${className}`}>
      <div ref={inner} className="pimg__in">
        {src && (
          <img
            src={src}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   En-tête des sections
------------------------------------------------------- */

function SectionHead({ eyebrow, title, lead, center = false }) {
  return (
    <Reveal
      className="head"
      style={{
        maxWidth: center ? '46rem' : '40rem',
        margin: center ? '0 auto' : 0,
        textAlign: center ? 'center' : 'left',
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 16 }}>
        {eyebrow}
      </div>

      <h2 className="h1">{title}</h2>

      {lead && (
        <p className="lead" style={{ marginTop: 18 }}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* -------------------------------------------------------
   Carte entreprise
------------------------------------------------------- */

function CompanyCard({ company, lang, visit }) {
  const [logoOk, setLogoOk] = useState(Boolean(company?.logo));

  const name = company?.name || 'GNAH';
  const sector = pick(company?.sector, lang) || '';
  const description = pick(company?.desc, lang) || '';

  const website =
    typeof company?.website === 'string' &&
    /^https?:\/\//i.test(company.website)
      ? company.website
      : null;

  return (
    <article className="ccard">
      <div className="ccard__logo">
        {logoOk ? (
          <img
            src={company.logo}
            alt={name}
            loading="lazy"
            onError={() => setLogoOk(false)}
          />
        ) : (
          <span className="ccard__mono">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="ccard__body">
        <div className="eyebrow">{sector}</div>

        <h3>{name}</h3>

        <p>{description}</p>

        {website && (
          <a
            className="link-arrow"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visit} <span className="arr">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   Page d'accueil
------------------------------------------------------- */

export default function Home() {
  const { lang } = useLang();
  const tl = makeTl(lang);

  const content = useContent() || {};

  const SITE = content.SITE || {};
  const YAYE_SLIDES = Array.isArray(content.YAYE_SLIDES)
    ? content.YAYE_SLIDES
    : [];

  const PARTNERS_WORLD = Array.isArray(content.PARTNERS_WORLD)
    ? content.PARTNERS_WORLD
    : [];

  const AFRICA_PARTNERS = Array.isArray(content.AFRICA_PARTNERS)
    ? content.AFRICA_PARTNERS
    : [];

  const COMPANIES = Array.isArray(content.COMPANIES)
    ? content.COMPANIES
    : [];

  const companies = COMPANIES.filter(
    (company) => company && company.active !== false
  );

  const worldCount = PARTNERS_WORLD.length;
  const africaCount = AFRICA_PARTNERS.length;

  const slide = (index) => YAYE_SLIDES[index]?.img || '';

  const whatsappNumber = String(SITE.whatsapp || '').replace(/\D/g, '');

  const whatsappMessage =
    typeof SITE.waMsg === 'string'
      ? SITE.waMsg
      : SITE.waMsg?.[lang] || SITE.waMsg?.fr || '';

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`
    : null;

  const visitLabel = tl(
    'Visiter le site',
    'Visit the website',
    'Visitar el sitio',
    'Website besuchen',
    '访问网站'
  );

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* PUBLICITÉS */}
      <AdsCarousel />

      {/* -------------------------------------------------
          PRÉSENTATION DU GROUPE
      ------------------------------------------------- */}

      <section className="section">
        <div className="container about">
          <Reveal variant="left" className="about__text">
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              African Development Company
            </div>

            <h2 className="h1" style={{ marginBottom: 26 }}>
              {tl(
                'Une société africaine au service des grands projets du continent',
                'An African company serving the continent’s major projects',
                'Una empresa africana al servicio de los grandes proyectos del continente',
                'Ein afrikanisches Unternehmen im Dienst der großen Projekte des Kontinents',
                '服务非洲大陆重大项目的非洲企业'
              )}
            </h2>

            <p>
              {tl(
                'Depuis 2015, G.N.A.H conçoit et structure des projets d’envergure dans l’immobilier, l’infrastructure publique, l’agriculture, la construction et les énergies renouvelables. Spécialistes, techniciens, ingénieurs et architectes y travaillent selon des stratégies et des plans définis pour chaque objectif, au service d’une vision continentale.',
                'Since 2015, G.N.A.H has designed and structured large-scale projects in real estate, public infrastructure, agriculture, construction and renewable energy. Specialists, technicians, engineers and architects work to strategies and plans defined for each objective, in service of a continental vision.',
                'Desde 2015, G.N.A.H concibe y estructura proyectos de gran envergadura en inmobiliaria, infraestructura pública, agricultura, construcción y energías renovables. Especialistas, técnicos, ingenieros y arquitectos trabajan con estrategias y planes definidos para cada objetivo, al servicio de una visión continental.',
                'Seit 2015 entwickelt und strukturiert G.N.A.H Großprojekte in den Bereichen Immobilien, öffentliche Infrastruktur, Landwirtschaft, Bau und erneuerbare Energien. Spezialisten, Techniker, Ingenieure und Architekten arbeiten nach Strategien und Plänen, die für jedes Ziel festgelegt sind, im Dienst einer kontinentalen Vision.',
                '自2015年起，G.N.A.H设计并构建房地产、公共基础设施、农业、建筑和可再生能源领域的大型项目。专家、技术人员、工程师和建筑师按照为每个目标制定的战略和计划开展工作，服务于大陆愿景。'
              )}
            </p>

            <Link
              to="/a-propos"
              className="btn btn--dark"
              style={{ marginTop: 14 }}
            >
              {tl(
                'Découvrir le groupe',
                'Discover the group',
                'Descubrir el grupo',
                'Die Gruppe entdecken',
                '了解集团'
              )}
              <span className="arr">→</span>
            </Link>
          </Reveal>

          <Reveal variant="right" className="about__media">
            <div className="about__frame" />

            <ParallaxImage
              className="about__main"
              src={slide(0)}
              speed={0.07}
            />

            <ParallaxImage
              className="about__small"
              src={slide(2)}
              speed={-0.05}
            />

            <div className="about__badge">
              <small>
                {tl(
                  'Depuis 2015',
                  'Since 2015',
                  'Desde 2015',
                  'Seit 2015',
                  '自2015年'
                )}
              </small>

              <b>
                {tl(
                  'Plus de dix ans d’exigence',
                  'More than ten years of excellence',
                  'Más de diez años de exigencia',
                  'Mehr als zehn Jahre Anspruch',
                  '十余年的卓越追求'
                )}
              </b>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------
          RÉSIDENCE YAYE DIA
      ------------------------------------------------- */}

      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow={`${tl(
              'Résidence Yaye Dia',
              'Yaye Dia Residence',
              'Residencia Yaye Dia',
              'Yaye Dia Residenz',
              'Yaye Dia住宅区'
            )} · ${tl(
              'Région de Thiès, Sénégal',
              'Thiès Region, Senegal',
              'Región de Thiès, Senegal',
              'Region Thiès, Senegal',
              '塞内加尔蒂耶斯地区'
            )}`}
            title={tl(
              '300 villas haut standing',
              '300 high-end villas',
              '300 villas de alto standing',
              '300 hochwertige Villen',
              '300栋高端别墅'
            )}
            lead={tl(
              'Sur des parcelles de 225 m², quatre modèles de villas composent une cité équipée : complexe sportif, aire de jeux, mosquée, centre commercial et district sanitaire.',
              'On 225 m² plots, four villa models form a fully equipped city: sports complex, playground, mosque, shopping centre and health district.',
              'Sobre parcelas de 225 m², cuatro modelos de villas componen una ciudad equipada: complejo deportivo, zona de juegos, mezquita, centro comercial y distrito sanitario.',
              'Auf Grundstücken von 225 m² bilden vier Villenmodelle eine voll ausgestattete Stadt: Sportkomplex, Spielbereich, Moschee, Einkaufszentrum und Gesundheitsbezirk.',
              '四种别墅户型坐落于225平方米的地块上，共同构成配套完善的城区：体育中心、游乐区、清真寺、购物中心和医疗区。'
            )}
          />

          <div style={{ marginTop: 'clamp(36px, 5vw, 64px)' }}>
            <VillaCube />
          </div>

          {YAYE_SLIDES.length > 0 && (
            <div className="strip">
              {YAYE_SLIDES.map((item, index) => {
                const translation = localized(item, lang);

                return (
                  <Reveal
                    key={item.id || item.img || index}
                    delay={(index % 4) * 0.08}
                    className="strip__item"
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={translation.title || ''}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                    )}

                    <div className="strip__cap">
                      <small>{translation.tag || ''}</small>
                      <b>{translation.title || ''}</b>
                      <span>{translation.sub || ''}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------
          SERVICES
      ------------------------------------------------- */}

      <section className="section section--ink on-dark">
        <div className="container">
          <SectionHead
            eyebrow={tl(
              'Notre expertise',
              'Our expertise',
              'Nuestra experiencia',
              'Unsere Expertise',
              '我们的专业'
            )}
            title={tl(
              'Nos services',
              'Our services',
              'Nuestros servicios',
              'Unsere Leistungen',
              '我们的服务'
            )}
          />

          <div style={{ marginTop: 'clamp(36px, 5vw, 64px)' }}>
            <ServiceScenes />
          </div>

          <div style={{ marginTop: 44 }}>
            <Link to="/services" className="btn btn--light">
              {tl(
                'Parcourir tous nos services',
                'Browse all our services',
                'Ver todos nuestros servicios',
                'Alle Leistungen ansehen',
                '浏览全部服务'
              )}
              <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          PARTENAIRES INTERNATIONAUX
      ------------------------------------------------- */}

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={tl(
              'Réseau mondial',
              'Global network',
              'Red mundial',
              'Weltweites Netzwerk',
              '全球网络'
            )}
            title={tl(
              `${worldCount} partenaires dans le monde, ${africaCount} pays africains`,
              `${worldCount} partners worldwide, ${africaCount} African countries`,
              `${worldCount} socios en el mundo, ${africaCount} países africanos`,
              `${worldCount} Partner weltweit, ${africaCount} afrikanische Länder`,
              `全球${worldCount}个合作伙伴，${africaCount}个非洲国家`
            )}
          />

          <div className="pgrid">
            {PARTNERS_WORLD.map((partner, index) => {
              const translation = localized(partner, lang);

              return (
                <Reveal
                  key={partner.code || index}
                  delay={(index % 4) * 0.07}
                  className="pcard"
                >
                  <div className="pcard__code">
                    {partner.code || ''}
                  </div>

                  <h3>{translation.country || ''}</h3>

                  <p>{translation.focus || ''}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="eyebrow" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {tl(
              'Pays africains partenaires',
              'African partner countries',
              'Países africanos socios',
              'Afrikanische Partnerländer',
              '非洲合作国家'
            )}
            {' · '}
            {africaCount}
          </div>

          {AFRICA_PARTNERS.length > 0 && (
            <div
              className="marquee"
              aria-label={AFRICA_PARTNERS.join(', ')}
            >
              <div className="marquee__track" aria-hidden="true">
                {[...AFRICA_PARTNERS, ...AFRICA_PARTNERS].map(
                  (country, index) => (
                    <span key={`${country}-${index}`}>
                      {country}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <Link to="/partenaires" className="btn btn--ghost">
              {tl(
                'Découvrir nos partenaires',
                'Meet our partners',
                'Conocer a nuestros socios',
                'Unsere Partner kennenlernen',
                '认识我们的合作伙伴'
              )}
              <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          ENTREPRISES DU GROUPE
      ------------------------------------------------- */}

      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow={tl(
              'L’écosystème GNAH',
              'The GNAH ecosystem',
              'El ecosistema GNAH',
              'Das GNAH-Ökosystem',
              'GNAH生态系统'
            )}
            title={tl(
              'Nos entreprises',
              'Our companies',
              'Nuestras empresas',
              'Unsere Unternehmen',
              '我们的企业'
            )}
          />

          <div className="cgrid">
            {companies.map((company, index) => (
              <Reveal
                key={company.id || company.name || index}
                delay={(index % 4) * 0.1}
              >
                <CompanyCard
                  company={company}
                  lang={lang}
                  visit={visitLabel}
                />
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link to="/entreprises" className="btn btn--dark">
              {tl(
                'Découvrir les entreprises du groupe',
                'Discover the group’s companies',
                'Descubrir las empresas del grupo',
                'Die Unternehmen der Gruppe entdecken',
                '了解集团旗下企业'
              )}
              <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          APPEL À L'ACTION FINAL
      ------------------------------------------------- */}

      <section className="section section--forest on-dark cta">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Groupe Ndoye Africa Holding
            </div>

            <h2
              className="display"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                maxWidth: '16ch',
                margin: '0 auto',
              }}
            >
              {tl(
                'Investissons ensemble dans l’avenir de l’Afrique',
                'Let’s invest together in Africa’s future',
                'Invirtamos juntos en el futuro de África',
                'Gemeinsam in die Zukunft Afrikas investieren',
                '共同投资非洲的未来'
              )}
            </h2>

            <p
              className="lead"
              style={{
                margin: '24px auto 0',
                maxWidth: '44ch',
                color: 'rgba(244,238,228,.78)',
              }}
            >
              {tl(
                'Des projets structurés, des partenariats durables et une vision continentale. Rejoignez l’écosystème GNAH.',
                'Structured projects, lasting partnerships and a continental vision. Join the GNAH ecosystem.',
                'Proyectos estructurados, alianzas duraderas y una visión continental. Únase al ecosistema GNAH.',
                'Strukturierte Projekte, dauerhafte Partnerschaften und eine kontinentale Vision. Werden Sie Teil des GNAH-Ökosystems.',
                '结构化的项目、持久的合作与大陆视野。加入GNAH生态系统。'
              )}
            </p>

            <div className="cta__actions">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--float"
                >
                  {tl(
                    'Échanger avec notre équipe',
                    'Talk to our team',
                    'Hablar con nuestro equipo',
                    'Mit unserem Team sprechen',
                    '与我们的团队交流'
                  )}
                  <span className="arr">→</span>
                </a>
              )}

              <Link to="/investisseurs" className="btn btn--ghost">
                {tl(
                  'Investir avec nous',
                  'Invest with us',
                  'Invierta con nosotros',
                  'Mit uns investieren',
                  '与我们一同投资'
                )}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
