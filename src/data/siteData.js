// ══════════════════════════════════════════════════════════════
//  GROUPE NDOYE AFRICA HOLDING — Site Data
//  Langues : FR / EN / ES / DE / ZH
// ══════════════════════════════════════════════════════════════

export const SITE = {
  name:       'Groupe Ndoye Africa Holding',
  short:      'G.N.A.H',
  phone:      '+221 77 939 84 84',
  whatsapp:   '221779398484',
  email:      'groupendoyeafricaholding@gmail.com',
  address_fr: 'Cité Baobab, Sénégal',
  adminPass:  'admin123',
  social: {
    facebook:  'https://www.facebook.com/groupendoyeafricaholding',
    instagram: 'https://www.instagram.com/assanedesignconception',
    tiktok:    'https://www.tiktok.com/@assane.design.con',
    threads:   'https://www.threads.net/@assanedesignconception',
    linkedin:  'https://www.linkedin.com/company/groupendoyeafricaholding',
  },
  waMsg: {
    fr: "Bonjour Groupe Ndoye Africa Holding, je souhaite avoir plus d'informations.",
    en: 'Hello Groupe Ndoye Africa Holding, I would like more information.',
    es: 'Hola Groupe Ndoye Africa Holding, me gustaría tener más información.',
    de: 'Hallo Groupe Ndoye Africa Holding, ich hätte gerne mehr Informationen.',
    zh: '您好，Groupe Ndoye Africa Holding，我想了解更多信息。',
  },
};

export const NAV = [
  { id:'home',          path:'/',               fr:'Accueil',       en:'Home',          es:'Inicio',        de:'Startseite',      zh:'首页' },
  { id:'services',      path:'/services',       fr:'Services',      en:'Services',      es:'Servicios',     de:'Leistungen',      zh:'服务' },
  { id:'projets',       path:'/projets',        fr:'Projets',       en:'Projects',      es:'Proyectos',     de:'Projekte',        zh:'项目' },
  { id:'engagements',   path:'/engagements',    fr:'Engagements',   en:'Commitments',   es:'Compromisos',   de:'Verpflichtungen', zh:'承诺' },
  { id:'partenaires',   path:'/partenaires',    fr:'Partenaires',   en:'Partners',      es:'Socios',        de:'Partner',         zh:'合作伙伴' },
  { id:'entreprises',   path:'/entreprises',    fr:'Entreprises',   en:'Companies',     es:'Empresas',      de:'Unternehmen',     zh:'企业' },
  { id:'investisseurs', path:'/investisseurs',  fr:'Investisseurs', en:'Investors',     es:'Inversores',    de:'Investoren',      zh:'投资者' },
  { id:'collaboration', path:'/collaboration',  fr:'Collaboration', en:'Collaboration', es:'Colaboración',  de:'Zusammenarbeit',  zh:'合作' },
  { id:'about',         path:'/a-propos',       fr:'À Propos',      en:'About',         es:'Acerca de',     de:'Über uns',        zh:'关于我们' },
  { id:'contact',       path:'/contact',        fr:'Contact',       en:'Contact',       es:'Contacto',      de:'Kontakt',         zh:'联系我们' },
  { id:'galerie',       path:'/galerie',        fr:'Galerie',       en:'Gallery',       es:'Galería',       de:'Galerie',         zh:'画廊' },
  { id:'videos',        path:'/videos',         fr:'Vidéos',        en:'Videos',        es:'Videos',        de:'Videos',          zh:'视频' },
];

export const TAGLINE = {
  fr:"Bâtir l'Afrique de demain", en:"Building tomorrow's Africa",
  es:"Construyendo el África del mañana", de:"Das Afrika von morgen bauen",
  zh:"建设明日非洲",
};
export const SUBTITLE = {
  fr:"L'immobilier au vrai sens du mot", en:"Real estate in the truest sense",
  es:"Bienes raíces en el verdadero sentido", de:"Immobilien im wahrsten Sinne",
  zh:"真正意义上的房地产",
};

export const STATS = [
  { val:'10+', fr:"Années d'expérience",        en:'Years of experience',       es:'Años de experiencia',         de:'Jahre Erfahrung',                zh:'年经验' },
  { val:'7',   fr:'Partenaires mondiaux',       en:'Global partners',           es:'Socios mundiales',            de:'Weltweite Partner',             zh:'全球合作伙伴' },
  { val:'300', fr:'Villas Yaye Dia',            en:'Yaye Dia Villas',           es:'Villas Yaye Dia',             de:'Yaye Dia Villen',               zh:'Yaye Dia别墅' },
  { val:'11',  fr:'Pays africains partenaires', en:'African partner countries', es:'Países socios africanos',     de:'Afrikanische Partnerländer',    zh:'非洲合作国家' },
];

export const SERVICES = [
  { icon:'building',
    fr:{title:'Gestion Immobilière',desc:"Administration et valorisation de vos biens immobiliers avec une expertise locale et internationale. Gestion complète de la conception à la livraison."},
    en:{title:'Property Management',desc:"Administration and enhancement of your real estate assets with local and international expertise."},
    es:{title:'Gestión Inmobiliaria',desc:"Administración y valorización de sus bienes inmuebles con experiencia local e internacional."},
    de:{title:'Immobilienverwaltung',desc:"Verwaltung und Aufwertung Ihrer Immobilien mit lokaler und internationaler Expertise."},
    zh:{title:'房产管理',desc:"以本地和国际专业知识管理和提升您的房地产资产。从设计到交付的全程管理。"},
  },
  { icon:'layers',
    fr:{title:'Développement de Projets',desc:"De la conception à la réalisation, nous structurons vos projets immobiliers, d'infrastructure et agricoles avec rigueur et vision stratégique."},
    en:{title:'Project Development',desc:"From design to completion, we structure your real estate, infrastructure and agricultural projects."},
    es:{title:'Desarrollo de Proyectos',desc:"De la concepción a la realización, estructuramos sus proyectos con rigor y visión estratégica."},
    de:{title:'Projektentwicklung',desc:"Von der Planung bis zur Umsetzung strukturieren wir Ihre Projekte mit Sorgfalt."},
    zh:{title:'项目开发',desc:"从设计到实施，我们以严谨性和战略眼光构建您的房地产、基础设施和农业项目。"},
  },
  { icon:'chart',
    fr:{title:'Structuration Financière',desc:"Montages financiers adaptés aux projets privés, publics ou public-privé. Accès à nos partenaires bancaires mondiaux."},
    en:{title:'Financial Structuring',desc:"Financial arrangements for private, public or public-private projects. Access to our global banking partners."},
    es:{title:'Estructuración Financiera',desc:"Montajes financieros para proyectos privados, públicos o público-privados."},
    de:{title:'Finanzstrukturierung',desc:"Finanzarrangements für private oder öffentliche Projekte."},
    zh:{title:'金融结构',desc:"为私人、公共或公私合营项目量身定制的金融安排。获取我们全球银行合作伙伴的支持。"},
  },
  { icon:'road',
    fr:{title:'Infrastructure Publique',desc:"Conception, financement et réalisation de routes, ponts, ports et infrastructures urbaines à travers le continent africain."},
    en:{title:'Public Infrastructure',desc:"Design, financing and construction of roads, bridges, ports and urban infrastructure."},
    es:{title:'Infraestructura Pública',desc:"Diseño, financiación y realización de carreteras, puentes y puertos."},
    de:{title:'Öffentliche Infrastruktur',desc:"Planung, Finanzierung und Bau von Straßen, Brücken und Häfen."},
    zh:{title:'公共基础设施',desc:"在非洲大陆设计、融资和建造道路、桥梁、港口和城市基础设施。"},
  },
  { icon:'leaf',
    fr:{title:'Agriculture & Technologie',desc:"Mise en place de systèmes agricoles modernes et automatisés. Valorisation des terres africaines avec des technologies de pointe."},
    en:{title:'Agriculture & Technology',desc:"Setting up modern automated agricultural systems with cutting-edge technologies."},
    es:{title:'Agricultura y Tecnología',desc:"Implementación de sistemas agrícolas modernos y automatizados."},
    de:{title:'Landwirtschaft & Technologie',desc:"Einrichtung moderner automatisierter Agrarsysteme."},
    zh:{title:'农业与技术',desc:"建立现代化自动化农业系统，用尖端技术开发非洲土地。"},
  },
  { icon:'zap',
    fr:{title:'Énergie Renouvelable',desc:"Développement de projets solaires, éoliens et hydrogène adaptés aux besoins énergétiques croissants du continent africain."},
    en:{title:'Renewable Energy',desc:"Solar, wind and hydrogen projects for Africa's growing energy needs."},
    es:{title:'Energía Renovable',desc:"Proyectos solares, eólicos e hidrógeno para las necesidades energéticas de África."},
    de:{title:'Erneuerbare Energien',desc:"Solar-, Wind- und Wasserstoffprojekte für Afrikas Energiebedarf."},
    zh:{title:'可再生能源',desc:"开发太阳能、风能和氢能项目，满足非洲大陆不断增长的能源需求。"},
  },
];

export const VILLA_TYPES = [
  { id:'f3', color:'#f59e0b', surface:'225 m²', bati:'83 m²',
    img:'/Images/yaye-dia/villa-f3-facade.jpg', planImg:'/Images/yaye-dia/villa-f3-plan.jpg',
    fr:{name:'Villa F3 Économique',standing:'Économique'}, en:{name:'F3 Economy Villa',standing:'Economy'},
    es:{name:'Villa F3 Económica',standing:'Económica'}, de:{name:'F3 Economy Villa',standing:'Economy'},
    zh:{name:'F3经济型别墅',standing:'经济型'},
    rooms:[
      {fr:'Chambre enfant',en:'Child bedroom',es:'Habitación infantil',de:'Kinderzimmer',zh:'儿童卧室',val:'12,50 m²'},
      {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',zh:'主卧室',val:'15,65 m²'},
      {fr:'Cuisine ouverte',en:'Open kitchen',es:'Cocina abierta',de:'Offene Küche',zh:'开放式厨房',val:'15,21 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',zh:'客厅',val:'20,92 m²'},
    ],
    features:{
      fr:['Architecture Open Space élégant','Jardin tropical aménagé','Parfait pour famille de 3-4 personnes'],
      en:['Elegant open-space architecture','Landscaped tropical garden','Perfect for family of 3-4'],
      es:['Arquitectura Open Space elegante','Jardín tropical amenizado','Perfecto para familia de 3-4'],
      de:['Elegante Open-Space-Architektur','Tropengarten','Perfekt für Familie'],
      zh:['优雅的开放式建筑','热带花园','适合3-4人家庭'],
    },
  },
  { id:'f4pp', color:'#34d399', surface:'225 m²', bati:'106 m²',
    img:'/Images/yaye-dia/villa-f4pp-facade.jpg', planImg:'/Images/yaye-dia/villa-f4pp-plan.jpg',
    fr:{name:'Villa F4 Plein Pied',standing:'Moyen Standing'}, en:{name:'F4 Single-Story Villa',standing:'Mid-Range'},
    es:{name:'Villa F4 Planta Baja',standing:'Rango Medio'}, de:{name:'F4 Einstöckige Villa',standing:'Mittelklasse'},
    zh:{name:'F4平层别墅',standing:'中档'},
    rooms:[
      {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',zh:'主卧室',val:'15,65 m²'},
      {fr:'Chambre enfant',en:'Child bedroom',es:'Habitación infantil',de:'Kinderzimmer',zh:'儿童卧室',val:'12,29 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',zh:'客厅',val:'20,92 m²'},
      {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',zh:'厨房',val:'15,21 m²'},
    ],
    features:{
      fr:['Salon double hauteur spectaculaire','3 suites avec salles de bain privées','Façade contemporaine'],
      en:['Spectacular double-height living room','3 suites with private bathrooms','Contemporary facade'],
      es:['Espectacular salón de doble altura','3 suites con baños privados','Fachada contemporánea'],
      de:['Spektakuläres Wohnzimmer','3 Suiten mit privaten Bädern','Zeitgenössische Fassade'],
      zh:['壮观的双层挑高客厅','3间带私人浴室的套房','现代风格外立面'],
    },
  },
  { id:'f4duplex', color:'#6366f1', surface:'225 m²', bati:'232 m²',
    img:'/Images/yaye-dia/villa-f4duplex.jpg', planImg:'/Images/yaye-dia/villa-f4duplex-plan.jpg',
    fr:{name:'Villa F4 Duplex',standing:'Haut Standing'}, en:{name:'F4 Duplex Villa',standing:'High-End'},
    es:{name:'Villa F4 Dúplex',standing:'Alto Standing'}, de:{name:'F4 Duplex Villa',standing:'Hochwertig'},
    zh:{name:'F4复式别墅',standing:'高档'},
    rooms:[
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',zh:'客厅',val:'58,80 m²'},
      {fr:'Terrasse',en:'Terrace',es:'Terraza',de:'Terrasse',zh:'露台',val:'40 m²'},
      {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',zh:'主卧室',val:'15,96 m²'},
      {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',zh:'厨房',val:'13,98 m²'},
    ],
    features:{
      fr:['Grandes baies vitrées sur 2 niveaux','Terrasse 40 m² vue panoramique','Salon 58,80 m²'],
      en:['Large windows on 2 levels','40 m² panoramic terrace','58.80 m² living room'],
      es:['Grandes ventanales en 2 niveles','Terraza 40 m² panorámica','Salón 58,80 m²'],
      de:['Große Fenster auf 2 Ebenen','40 m² Panoramaterrasse','Wohnzimmer 58,80 m²'],
      zh:['两层大落地窗','40平方米全景露台','58.80平方米客厅'],
    },
  },
  { id:'f5', color:'#f472b6', surface:'225 m²', bati:'340 m²',
    img:'/Images/yaye-dia/villa-f5.jpg', planImg:'/Images/yaye-dia/villa-f5-plan.jpg',
    fr:{name:'Villa F5',standing:'Très Haut Standing'}, en:{name:'F5 Premium Villa',standing:'Premium'},
    es:{name:'Villa F5 Premium',standing:'Premium'}, de:{name:'F5 Premium Villa',standing:'Premium'},
    zh:{name:'F5豪华别墅',standing:'顶级豪华'},
    rooms:[
      {fr:'Master Room',en:'Master Room',es:'Master Room',de:'Master Room',zh:'主人套房',val:'20 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',zh:'客厅',val:'58,80 m²'},
      {fr:'Terrasse principale',en:'Main terrace',es:'Terraza principal',de:'Hauptterrasse',zh:'主露台',val:'66,52 m²'},
      {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',zh:'厨房',val:'13,98 m²'},
    ],
    features:{
      fr:['Marbre Calacatta revêtement intégral','Terrasse 66,52 m² BBQ & cuisine africaine','Couleur personnalisée'],
      en:['Calacatta marble full coating','66.52 m² terrace BBQ & African kitchen','Personalised colour'],
      es:['Revestimiento mármol Calacatta','Terraza 66,52 m² BBQ y cocina africana','Color personalizado'],
      de:['Calacatta-Marmor Vollverkleidung','66,52 m² Terrasse mit Grill','Persönliche Farbwahl'],
      zh:['卡拉卡塔大理石全覆盖','66.52平方米露台BBQ和非洲厨房','个性化颜色选择'],
    },
  },
];

export const YAYE_SLIDES = [
  { img:'/Images/yaye-dia/villa-f5.jpg',
    fr:{tag:"L'Art de vivre Moderne",title:'Villa F5 — Très Haut Standing',sub:'340 m² bâtis — Mercedes G-Wagon'},
    en:{tag:'The Art of Modern Living',title:'F5 Villa — Premium',sub:'340 m² built — Yaye Dia City'},
    es:{tag:'El Arte de Vivir Moderno',title:'Villa F5 — Premium',sub:'340 m² construidos'},
    de:{tag:'Die Kunst des modernen Lebens',title:'F5 Villa — Premium',sub:'340 m² gebaut'},
    zh:{tag:'现代生活艺术',title:'F5豪华别墅',sub:'340平方米建筑 — Yaye Dia城'},
  },
  { img:'/Images/yaye-dia/villa-f4duplex-nuit.jpg',
    fr:{tag:'Nuit Étoilée',title:'Villas F4 Duplex illuminées',sub:'Haut Standing — sous les étoiles'},
    en:{tag:'Starry Night',title:'Illuminated F4 Duplex Villas',sub:'High-End — under the stars'},
    es:{tag:'Noche Estrellada',title:'Villas F4 Dúplex iluminadas',sub:'Alto Standing'},
    de:{tag:'Sternennacht',title:'Beleuchtete F4 Duplex Villen',sub:'Hochwertig'},
    zh:{tag:'星空夜晚',title:'F4复式别墅夜景',sub:'高档 — 星空下的住宅'},
  },
  { img:'/Images/yaye-dia/cite-vue-aerienne.jpg',
    fr:{tag:'Vue Aérienne',title:'300 Villas — Vue Complète',sub:'Région de Thiès — Sénégal'},
    en:{tag:'Aerial View',title:'300 Villas — Complete View',sub:'Thiès Region — Senegal'},
    es:{tag:'Vista Aérea',title:'300 Villas — Vista Completa',sub:'Región de Thiès — Senegal'},
    de:{tag:'Luftaufnahme',title:'300 Villen — Vollständige Ansicht',sub:'Thiès Region — Senegal'},
    zh:{tag:'鸟瞰图',title:'300栋别墅 — 全景',sub:'塞内加尔蒂耶斯地区'},
  },
  { img:'/Images/yaye-dia/salon-duplex.jpg',
    fr:{tag:'Intérieur Luxueux',title:'Salon Duplex — Marbre & Bois',sub:'Finitions haut de gamme'},
    en:{tag:'Luxury Interior',title:'Duplex Living Room — Marble & Wood',sub:'High-end finishes'},
    es:{tag:'Interior Lujoso',title:'Salón Dúplex — Mármol y Madera',sub:'Acabados de lujo'},
    de:{tag:'Luxuriöses Interieur',title:'Duplex Wohnzimmer — Marmor & Holz',sub:'Hochwertige Oberflächen'},
    zh:{tag:'豪华内饰',title:'复式客厅 — 大理石与木材',sub:'高端精装修'},
  },
];

export const PARTNERS_WORLD = [
  { code:'TR', fr:{country:'Turquie',focus:"Immobilier, infrastructure & construction. Plus de 50 ans d'expérience."},en:{country:'Turkey',focus:'Real estate, infrastructure & construction. Over 50 years of experience.'},es:{country:'Turquía',focus:'Inmobiliaria, infraestructura y construcción.'},de:{country:'Türkei',focus:'Immobilien, Infrastruktur & Bau.'},zh:{country:'土耳其',focus:'房地产、基础设施和建筑。超过50年的经验。'} },
  { code:'CN', fr:{country:'Chine',focus:'Projets routiers, mines, infrastructure majeure. Capacité de financement exceptionnelle.'},en:{country:'China',focus:'Road projects, mining, major infrastructure. Exceptional financing capacity.'},es:{country:'China',focus:'Proyectos viales, minería, infraestructura mayor.'},de:{country:'China',focus:'Straßenprojekte, Bergbau, Hauptinfrastruktur.'},zh:{country:'中国',focus:'道路项目、矿业、重大基础设施。卓越的融资能力。'} },
  { code:'RU', fr:{country:'Russie',focus:"Énergies renouvelables, projets solaires et éoliens. Technologies de pointe pour l'Afrique."},en:{country:'Russia',focus:'Renewable energies, solar and wind projects for Africa.'},es:{country:'Rusia',focus:'Energías renovables, proyectos solares y eólicos.'},de:{country:'Russland',focus:'Erneuerbare Energien, Solar- und Windprojekte.'},zh:{country:'俄罗斯',focus:'可再生能源、太阳能和风能项目。非洲尖端技术。'} },
  { code:'US', fr:{country:'États-Unis',focus:"Ports autonomes, ouvrages d'art et génie civil. Innovation et excellence technologique."},en:{country:'United States',focus:'Autonomous ports, engineering structures and civil engineering.'},es:{country:'Estados Unidos',focus:'Puertos autónomos, obras de ingeniería y obra civil.'},de:{country:'Vereinigte Staaten',focus:'Autonome Häfen, Ingenieurbauwerke und Tiefbau.'},zh:{country:'美国',focus:'自主港口、工程结构和土木工程。创新与技术卓越。'} },
  { code:'MY', fr:{country:'Malaisie',focus:"Agriculture moderne, projets d'État et transfert de technologie. Expertise reconnue mondialement."},en:{country:'Malaysia',focus:'Modern agriculture, state projects and technology transfer.'},es:{country:'Malasia',focus:'Agricultura moderna, proyectos estatales y transferencia tecnológica.'},de:{country:'Malaysia',focus:'Moderne Landwirtschaft, Staatsprojekte und Technologietransfer.'},zh:{country:'马来西亚',focus:'现代农业、国家项目和技术转让。享誉全球的专业知识。'} },
  { code:'GB', fr:{country:'Royaume-Uni',focus:"Levée de fonds, banques d'investissement et structuration financière internationale."},en:{country:'United Kingdom',focus:'Fundraising, investment banks and international financial structuring.'},es:{country:'Reino Unido',focus:'Captación de fondos, bancos de inversión y estructuración financiera.'},de:{country:'Vereinigtes Königreich',focus:'Kapitalbeschaffung, Investmentbanken und Finanzstrukturierung.'},zh:{country:'英国',focus:'筹资、投资银行和国际金融结构。全球金融中心。'} },
  { code:'IN', fr:{country:'Inde',focus:"Transport & Logistique — Flotte de poids lourds, transport intermodal et solutions logistiques pour l'Afrique et l'Asie."},en:{country:'India',focus:'Transport & Logistics — Heavy truck fleet, intermodal transport and logistics solutions for Africa and Asia.'},es:{country:'India',focus:'Transporte y Logística — Flota de camiones pesados, transporte intermodal y soluciones logísticas.'},de:{country:'Indien',focus:'Transport & Logistik — Schwerlastflotte, intermodaler Transport und Logistiklösungen.'},zh:{country:'印度',focus:'运输与物流 — 重型卡车车队、多式联运和非亚洲物流解决方案。'} },
];

export const AFRICA_PARTNERS = ['Sénégal',"Côte d'Ivoire",'Nigeria','Gabon','Ghana','Cameroun','Mali','Burkina Faso','Guinée','Togo','Bénin'];

export const OPERATIONS = [
  {country:"Côte d'Ivoire",fr:'Port lagunaire de Dabou',en:'Dabou lagoon port',es:'Puerto lagunar de Dabou',de:'Lagunenhafen Dabou',zh:'达布湖港',value:'$1,7 Mrd',type:'BOT'},
  {country:'Nigeria',fr:'Autoroute Abuja–Lagos 467 km',en:'Abuja–Lagos 467 km Highway',es:'Autopista Abuja–Lagos 467 km',de:'Autobahn Abuja–Lagos 467 km',zh:'阿布贾-拉各斯467公里高速公路',value:'$5,7 Mrd',type:'BOT'},
  {country:"Côte d'Ivoire",fr:'Programme immobilier Eden',en:'Eden real estate programme',es:'Programa inmobiliario Eden',de:'Immobilienprogramm Eden',zh:'伊甸园房地产计划',value:'$700M',type:'Public/Privé'},
  {country:'Gabon',fr:'Centre de réinsertion sociale',en:'Social reintegration centre',es:'Centro de reinserción social',de:'Reintegrationszentrum',zh:'社会再融入中心',value:'$70M',type:'État'},
  {country:"Côte d'Ivoire",fr:'Projets privés résidentiels',en:'Private residential projects',es:'Proyectos privados residenciales',de:'Private Wohnprojekte',zh:'私人住宅项目',value:'$20M',type:'Privé'},
];

export const INVEST_CAPACITY = [
  {range:'$50M — $6 Mrd',fr:"Projets d'État",en:'State Projects',es:'Proyectos de Estado',de:'Staatliche Projekte',zh:'国家项目'},
  {range:'$30M — $450M',fr:'Projets Public/Privé',en:'Public/Private',es:'Público/Privado',de:'Öffentlich/Privat',zh:'公私合营项目'},
  {range:'$3M — $20M',fr:'Projets Privés',en:'Private Projects',es:'Proyectos Privados',de:'Private Projekte',zh:'私人项目'},
];

export const COMMITMENTS = [
  {icon:'target',fr:{title:'Excellence & Qualité',desc:"Chaque projet GNAH est réalisé selon les plus hauts standards de qualité."},en:{title:'Excellence & Quality',desc:"Every GNAH project is completed to the highest quality standards."},es:{title:'Excelencia y Calidad',desc:"Cada proyecto de GNAH se realiza según los más altos estándares."},de:{title:'Exzellenz & Qualität',desc:"Jedes GNAH-Projekt wird nach höchsten Qualitätsstandards realisiert."},zh:{title:'卓越与品质',desc:"每个GNAH项目都按照最高质量标准完成。"}},
  {icon:'eco',fr:{title:'Développement Durable',desc:"GNAH intègre des pratiques éco-responsables dans tous ses projets."},en:{title:'Sustainable Development',desc:"GNAH integrates eco-responsible practices across all projects."},es:{title:'Desarrollo Sostenible',desc:"GNAH integra prácticas eco-responsables en todos sus proyectos."},de:{title:'Nachhaltige Entwicklung',desc:"GNAH integriert öko-verantwortliche Praktiken in alle Projekte."},zh:{title:'可持续发展',desc:"GNAH在所有项目中融入生态责任实践。"}},
  {icon:'community',fr:{title:'Impact Communautaire',desc:"Nos projets créent de l'emploi local et contribuent au cadre de vie africain."},en:{title:'Community Impact',desc:"Our projects create local employment and improve African living conditions."},es:{title:'Impacto Comunitario',desc:"Nuestros proyectos crean empleo local y mejoran las condiciones de vida."},de:{title:'Gemeinschaftliche Wirkung',desc:"Unsere Projekte schaffen lokale Arbeitsplätze."},zh:{title:'社区影响',desc:"我们的项目创造本地就业，改善非洲人民的生活条件。"}},
  {icon:'star',fr:{title:'Transparence & Confiance',desc:"GNAH construit des relations durables basées sur la transparence et l'intégrité."},en:{title:'Transparency & Trust',desc:"GNAH builds lasting relationships based on transparency and integrity."},es:{title:'Transparencia y Confianza',desc:"GNAH construye relaciones duraderas basadas en la transparencia."},de:{title:'Transparenz & Vertrauen',desc:"GNAH baut dauerhafte Beziehungen auf Basis von Transparenz auf."},zh:{title:'透明度与信任',desc:"GNAH建立基于透明度和诚信的持久关系。"}},
];

export const AFRICA_OPPS = {
  fr:"L'Afrique représente 23% de la surface planète, 24,3% des terres agricoles mondiales, 90% des réserves mondiales de platine et 30% des ressources solaires mondiales.",
  en:"Africa represents 23% of Earth's surface, 24.3% of global agricultural land, 90% of world platinum reserves and 30% of global solar resources.",
  es:"África representa el 23% de la superficie terrestre, el 24,3% de las tierras agrícolas mundiales, el 90% de las reservas de platino y el 30% de los recursos solares.",
  de:"Afrika repräsentiert 23% der Erdoberfläche, 24,3% der weltweiten Agrarfläche, 90% der Platinreserven und 30% der Solarressourcen.",
  zh:"非洲占地球表面积的23%，全球农业用地的24.3%，全球铂储量的90%，以及全球太阳能资源的30%。",
};

export const COMPANY_INTRO = {
  fr:"G.N.A.H est présent sur le marché depuis 2015 en tant que société spécialisée dans le développement et la structuration de projets, l'infrastructure publique, l'agriculture, la construction et l'immobilier.",
  en:"G.N.A.H has been operating since 2015 as a company specialising in project development, public infrastructure, agriculture, construction and real estate.",
  es:"G.N.A.H opera desde 2015 como empresa especializada en desarrollo de proyectos, infraestructura pública, agricultura, construcción e inmobiliaria.",
  de:"G.N.A.H ist seit 2015 auf dem Markt tätig als Unternehmen für Projektentwicklung, Infrastruktur, Landwirtschaft, Bau und Immobilien.",
  zh:"G.N.A.H自2015年以来一直作为专注于项目开发、公共基础设施、农业、建筑和房地产的公司运营。",
};
export const CONSORTIUM = {
  fr:"Composée d'une équipe de spécialistes, techniciens, ingénieurs et architectes, GNAH dispose de l'expertise nécessaire pour atteindre avec succès les objectifs définis.",
  en:"Made up of specialists, technicians, engineers and architects, GNAH has the expertise to successfully achieve defined objectives.",
  es:"Compuesta por especialistas, técnicos, ingenieros y arquitectos, GNAH tiene la experiencia para lograr los objetivos definidos.",
  de:"Bestehend aus Spezialisten, Technikern, Ingenieuren und Architekten hat GNAH die Expertise die definierten Ziele zu erreichen.",
  zh:"GNAH由专家、技术人员、工程师和建筑师组成，拥有成功实现既定目标所需的专业知识。",
};
export const STRATEGY = {
  fr:"GNAH dispose de stratégies et de plans bien définis pour atteindre chacun de ses objectifs.",
  en:"GNAH has well-defined strategies and plans to achieve each of its objectives.",
  es:"GNAH dispone de estrategias y planes bien definidos para alcanzar cada uno de sus objetivos.",
  de:"GNAH hat klar definierte Strategien und Pläne zur Erreichung jedes seiner Ziele.",
  zh:"GNAH拥有明确的战略和计划来实现每一个目标。",
};

export const OBJECTIVES = [
  {img:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=85',fr:{title:'Infrastructure Routière',desc:"Autoroute Abuja-Lagos 467km ($5,7 Mrd)"},en:{title:'Road Infrastructure',desc:"Abuja-Lagos 467km highway ($5.7B)"},es:{title:'Infraestructura Vial',desc:"Autopista Abuja-Lagos 467km"},de:{title:'Straßeninfrastruktur',desc:"Abuja-Lagos 467km Autobahn"},zh:{title:'公路基础设施',desc:"阿布贾-拉各斯467公里高速公路 (57亿美元)"}},
  {img:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=85',fr:{title:'Développement Immobilier',desc:"300+ villas Yaye Dia, Programme Eden ($700M)"},en:{title:'Real Estate Development',desc:"300+ Yaye Dia villas, Eden Programme ($700M)"},es:{title:'Desarrollo Inmobiliario',desc:"300+ villas Yaye Dia, Programa Eden ($700M)"},de:{title:'Immobilienentwicklung',desc:"300+ Yaye Dia Villen, Eden-Programm ($700M)"},zh:{title:'房地产开发',desc:"300多栋Yaye Dia别墅，伊甸园计划 (7亿美元)"}},
  {img:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=85',fr:{title:'Agriculture Technologique',desc:"Systèmes agricoles automatisés pour l'Afrique"},en:{title:'Technological Agriculture',desc:"Automated agricultural systems for Africa"},es:{title:'Agricultura Tecnológica',desc:"Sistemas agrícolas automatizados para África"},de:{title:'Technologische Landwirtschaft',desc:"Automatisierte Agrarsysteme für Afrika"},zh:{title:'技术农业',desc:"非洲自动化农业系统"}},
  {img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=85',fr:{title:'Ports & Transport Maritime',desc:"Port lagunaire Dabou ($1,7 Mrd BOT)"},en:{title:'Ports & Maritime Transport',desc:"Dabou lagoon port ($1.7B BOT)"},es:{title:'Puertos y Transporte Marítimo',desc:"Puerto lagunar Dabou ($1,7 Mrd BOT)"},de:{title:'Häfen & Seetransport',desc:"Lagunenhafen Dabou ($1,7 Mrd BOT)"},zh:{title:'港口与海上运输',desc:"达布湖港 (17亿美元 BOT)"}},
  {img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=85',fr:{title:'Énergie Renouvelable',desc:"30% des ressources solaires mondiales en Afrique"},en:{title:'Renewable Energy',desc:"30% of global solar resources in Africa"},es:{title:'Energía Renovable',desc:"30% de los recursos solares mundiales en África"},de:{title:'Erneuerbare Energien',desc:"30% der weltweiten Solarressourcen in Afrika"},zh:{title:'可再生能源',desc:"非洲拥有全球30%的太阳能资源"}},
  {img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85',fr:{title:'Industries & Mines',desc:"Exploitation minière responsable pour l'Afrique"},en:{title:'Industry & Mining',desc:"Responsible mining for tomorrow's Africa"},es:{title:'Industria y Minería',desc:"Minería responsable para el África del mañana"},de:{title:'Industrie & Bergbau',desc:"Verantwortungsvoller Bergbau für Afrika"},zh:{title:'工业与矿业',desc:"为非洲未来负责任地开发矿业"}},
];

export const AMENITIES = [
  {icon:'sport',fr:{t:'Complexe Sportif Moderne',d:'Football, basketball, handball.'},en:{t:'Modern Sports Complex',d:'Football, basketball, handball.'},es:{t:'Complejo Deportivo',d:'Fútbol, baloncesto, balonmano.'},de:{t:'Sportkomplex',d:'Fußball, Basketball, Handball.'},zh:{t:'现代体育综合体',d:'足球、篮球、手球。'}},
  {icon:'kids',fr:{t:'Espace Jeux Enfants',d:'Aire de jeux sécurisée.'},en:{t:'Children's Play Area',d:'Secure play area.'},es:{t:'Zona de Juegos',d:'Área de juegos segura.'},de:{t:'Kinderspielbereich',d:'Sicherer Spielbereich.'},zh:{t:'儿童游乐区',d:'安全游乐区。'}},
  {icon:'mosque',fr:{t:'Mosquée',d:'Lieu de culte au cœur de la cité.'},en:{t:'Mosque',d:'Place of worship.'},es:{t:'Mezquita',d:'Lugar de culto.'},de:{t:'Moschee',d:'Gebetsstätte.'},zh:{t:'清真寺',d:'社区礼拜场所。'}},
  {icon:'mall',fr:{t:'Centre Commercial',d:'Commerces et services essentiels.'},en:{t:'Shopping Centre',d:'Shops and essential services.'},es:{t:'Centro Comercial',d:'Tiendas y servicios esenciales.'},de:{t:'Einkaufszentrum',d:'Geschäfte und Dienstleistungen.'},zh:{t:'购物中心',d:'商店和基本服务。'}},
  {icon:'health',fr:{t:'District Sanitaire',d:'Centre de santé moderne.'},en:{t:'Health District',d:'Modern health centre.'},es:{t:'Distrito Sanitario',d:'Centro de salud moderno.'},de:{t:'Gesundheitsbezirk',d:'Modernes Gesundheitszentrum.'},zh:{t:'医疗区',d:'现代医疗中心。'}},
];

export const COMPANIES = [
  {
    id: 1, active: true,
    name: 'Terratransport',
    logo: '/Images/entreprises/logo-terratransport.png',
    sector: { fr:'Transport & Logistique', en:'Transport & Logistics', es:'Transporte y Logística', de:'Transport & Logistik', zh:'运输与物流' },
    country: 'Sénégal',
    website: 'https://www.terratransport.com',
    desc: {
      fr: "Terratransport est spécialisée dans la commercialisation de poids lourds et la gestion de flottes de camions. Solutions de transport intermodal et logistique pour l'Afrique et l'Asie.",
      en: "Terratransport specialises in heavy truck commercialisation and fleet management. Intermodal transport and logistics solutions for Africa and Asia.",
      es: "Terratransport está especializada en la comercialización de camiones pesados y la gestión de flotas. Soluciones de transporte intermodal para África y Asia.",
      de: "Terratransport ist auf die Vermarktung von Schwerlastfahrzeugen und Flottenmanagement spezialisiert. Intermodale Transport- und Logistiklösungen für Afrika und Asien.",
      zh: "Terratransport专门从事重型卡车销售和车队管理。为非洲和亚洲提供多式联运和物流解决方案。",
    },
  },
];

export const DEFAULT_ADMIN_CONTENT = {
  projects: [
    {id:1,active:true,category:'Immobilier',img:'/Images/yaye-dia/cite-vue-aerienne.jpg',title:{fr:'Résidence Yaye Dia',en:'Yaye Dia Residence',zh:'Yaye Dia住宅'},desc:{fr:'300 villas haut standing en Région de Thiès, Sénégal.',en:'300 high-end villas in Thiès Region, Senegal.',zh:'塞内加尔蒂耶斯地区300栋高档别墅。'},waMsg:{fr:'Bonjour, je suis intéressé(e) par la Résidence Yaye Dia.',en:'Hello, I am interested in the Yaye Dia Residence.'}},
    {id:2,active:true,category:'Infrastructure',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=85',title:{fr:'Port Lagunaire de Dabou',en:'Dabou Lagoon Port',zh:'达布湖港'},desc:{fr:"Port lagunaire en Côte d'Ivoire — $1,7 milliard — BOT.",en:"Lagoon port in Ivory Coast — $1.7 billion — BOT.",zh:"科特迪瓦湖港 — 17亿美元 — BOT合同。"},waMsg:{fr:"Bonjour, je suis intéressé(e) par le Port de Dabou.",en:"Hello, I am interested in the Dabou Port."}},
    {id:3,active:true,category:'Infrastructure',img:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=85',title:{fr:'Autoroute Abuja–Lagos',en:'Abuja–Lagos Highway',zh:'阿布贾-拉各斯高速公路'},desc:{fr:"Autoroute au Nigeria — $5,7 milliards — BOT — 467 km.",en:"Highway in Nigeria — $5.7 billion — BOT — 467 km.",zh:"尼日利亚高速公路 — 57亿美元 — BOT合同 — 467公里。"},waMsg:{fr:"Bonjour, je m'intéresse à l'autoroute Abuja-Lagos.",en:"Hello, I am interested in the Abuja-Lagos highway."}},
  ],
};
