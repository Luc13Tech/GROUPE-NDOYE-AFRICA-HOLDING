// ══════════════════════════════════════════════════════════════
//  GROUPE NDOYE AFRICA HOLDING — Site Data
//  Source : Document 1 (Résidence Yaye Dia) + Document 2 (GNAH)
// ══════════════════════════════════════════════════════════════

export const SITE = {
  name:        'Groupe Ndoye Africa Holding',
  short:       'G.N.A.H',
  phone:       '+221 77 939 84 84',
  whatsapp:    '221779398484',
  email:       'Contact@groupendoyeafrica.com',
  address_fr:  'Cité Baobab, Sénégal',
  address_en:  'Cité Baobab, Senegal',
  address_es:  'Cité Baobab, Senegal',
  address_de:  'Cité Baobab, Senegal',
  adminPass:   'admin123',
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
  },
};

export const NAV = [
  { id:'home',          path:'/',               fr:'Accueil',       en:'Home',         es:'Inicio',       de:'Startseite' },
  { id:'services',      path:'/services',       fr:'Services',      en:'Services',     es:'Servicios',    de:'Leistungen' },
  { id:'projets',       path:'/projets',        fr:'Projets',       en:'Projects',     es:'Proyectos',    de:'Projekte' },
  { id:'engagements',   path:'/engagements',    fr:'Engagements',   en:'Commitments',  es:'Compromisos',  de:'Verpflichtungen' },
  { id:'partenaires',   path:'/partenaires',    fr:'Partenaires',   en:'Partners',     es:'Socios',       de:'Partner' },
  { id:'investisseurs', path:'/investisseurs',  fr:'Investisseurs', en:'Investors',    es:'Inversores',   de:'Investoren' },
  { id:'collaboration', path:'/collaboration',  fr:'Collaboration', en:'Collaboration',es:'Colaboración', de:'Zusammenarbeit' },
  { id:'about',         path:'/a-propos',       fr:'À Propos',      en:'About',        es:'Acerca de',    de:'Über uns' },
  { id:'contact',       path:'/contact',        fr:'Contact',       en:'Contact',      es:'Contacto',     de:'Kontakt' },
];

export const TAGLINE = {
  fr: "Bâtir l'Afrique de demain",
  en: "Building tomorrow's Africa",
  es: "Construyendo el África del mañana",
  de: "Das Afrika von morgen bauen",
};
export const SUBTITLE = {
  fr: "L'immobilier au vrai sens du mot",
  en: "Real estate in the truest sense",
  es: "Bienes raíces en el verdadero sentido",
  de: "Immobilien im wahrsten Sinne",
};

export const STATS = [
  { val:'10+', fr:"Années d'expérience",        en:'Years of experience',        es:'Años de experiencia',          de:'Jahre Erfahrung' },
  { val:'7',   fr:'Partenaires mondiaux',        en:'Global partners',            es:'Socios mundiales',             de:'Weltweite Partner' },
  { val:'300', fr:'Villas Yaye Dia',             en:'Yaye Dia Villas',            es:'Villas Yaye Dia',              de:'Yaye Dia Villen' },
  { val:'11',  fr:'Pays africains partenaires',  en:'African partner countries',  es:'Países socios africanos',      de:'Afrikanische Partnerländer' },
];

export const SERVICES = [
  { icon:'building', fr:{title:'Gestion Immobilière',desc:"Administration et valorisation de vos biens immobiliers avec une expertise locale et internationale. Gestion complète de la conception à la livraison."},en:{title:'Property Management',desc:"Administration and enhancement of your real estate assets with unmatched local and international expertise. Complete management from design to delivery."},es:{title:'Gestión Inmobiliaria',desc:"Administración y valorización de sus bienes inmuebles con experiencia local e internacional. Gestión completa desde el diseño hasta la entrega."},de:{title:'Immobilienverwaltung',desc:"Verwaltung und Aufwertung Ihrer Immobilien mit unübertroffener Expertise. Vollständige Verwaltung von der Planung bis zur Übergabe."} },
  { icon:'layers',   fr:{title:'Développement de Projets',desc:"De la conception à la réalisation, nous structurons vos projets immobiliers, d'infrastructure et agricoles avec rigueur et vision stratégique."},en:{title:'Project Development',desc:"From design to completion, we structure your real estate, infrastructure and agricultural projects with rigour and strategic vision."},es:{title:'Desarrollo de Proyectos',desc:"De la concepción a la realización, estructuramos sus proyectos inmobiliarios, de infraestructura y agrícolas con rigor y visión estratégica."},de:{title:'Projektentwicklung',desc:"Von der Planung bis zur Umsetzung strukturieren wir Ihre Projekte mit Sorgfalt und strategischer Vision."} },
  { icon:'chart',    fr:{title:'Structuration Financière',desc:"Montages financiers adaptés aux projets privés, publics ou public-privé. Accès à nos partenaires bancaires mondiaux pour financer vos ambitions africaines."},en:{title:'Financial Structuring',desc:"Financial arrangements tailored to private, public or public-private projects. Access to our global banking partners to finance your African ambitions."},es:{title:'Estructuración Financiera',desc:"Montajes financieros adaptados a proyectos privados, públicos o público-privados. Acceso a nuestros socios bancarios mundiales."},de:{title:'Finanzstrukturierung',desc:"Finanzarrangements für private, öffentliche oder öffentlich-private Projekte. Zugang zu unseren globalen Bankpartnern."} },
  { icon:'road',     fr:{title:'Infrastructure Publique',desc:"Conception, financement et réalisation de routes, ponts, ports, ouvrages d'art et infrastructures urbaines à travers le continent africain."},en:{title:'Public Infrastructure',desc:"Design, financing and construction of roads, bridges, ports, engineering structures and urban infrastructure across the African continent."},es:{title:'Infraestructura Pública',desc:"Diseño, financiación y realización de carreteras, puentes, puertos y obras de ingeniería en todo el continente africano."},de:{title:'Öffentliche Infrastruktur',desc:"Planung, Finanzierung und Bau von Straßen, Brücken, Häfen und städtischer Infrastruktur auf dem afrikanischen Kontinent."} },
  { icon:'leaf',     fr:{title:'Agriculture & Technologie',desc:"Mise en place de systèmes agricoles modernes et automatisés. Valorisation des terres africaines avec des technologies de pointe pour une production optimale."},en:{title:'Agriculture & Technology',desc:"Setting up modern automated agricultural systems. Enhancing African lands with cutting-edge technologies for optimal production."},es:{title:'Agricultura y Tecnología',desc:"Implementación de sistemas agrícolas modernos y automatizados. Valorización de las tierras africanas con tecnologías punteras."},de:{title:'Landwirtschaft & Technologie',desc:"Einrichtung moderner automatisierter Agrarsysteme. Aufwertung afrikanischer Böden mit Spitzentechnologien."} },
  { icon:'zap',      fr:{title:'Énergie Renouvelable',desc:"Développement de projets solaires, éoliens et hydrogène adaptés aux besoins énergétiques croissants du continent africain. Solutions durables et rentables."},en:{title:'Renewable Energy',desc:"Development of solar, wind and hydrogen projects tailored to the growing energy needs of the African continent. Sustainable and profitable solutions."},es:{title:'Energía Renovable',desc:"Desarrollo de proyectos solares, eólicos e hidrógeno adaptados a las crecientes necesidades energéticas del continente africano."},de:{title:'Erneuerbare Energien',desc:"Entwicklung von Solar-, Wind- und Wasserstoffprojekten für den wachsenden Energiebedarf des afrikanischen Kontinents."} },
];

export const VILLA_TYPES = [
  { id:'f3', color:'#f59e0b', surface:'225 m²', bati:'83 m²',
    img:'/Images/yaye-dia/villa-f3-facade.jpg', planImg:'/Images/yaye-dia/villa-f3-plan.jpg',
    fr:{name:'Villa F3 Économique',standing:'Économique'}, en:{name:'F3 Economy Villa',standing:'Economy'}, es:{name:'Villa F3 Económica',standing:'Económica'}, de:{name:'F3 Economy Villa',standing:'Economy'},
    rooms:[
      {fr:'Chambre enfant',en:'Child bedroom',es:'Habitación infantil',de:'Kinderzimmer',val:'12,50 m²'},
      {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',val:'15,65 m²'},
      {fr:'Cuisine ouverte',en:'Open kitchen',es:'Cocina abierta',de:'Offene Küche',val:'15,21 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',val:'20,92 m²'},
      {fr:'SDB parents',en:'Parents bathroom',es:'Baño padres',de:'Elternbad',val:'3 m²'},
      {fr:'SDB enfant',en:'Child bathroom',es:'Baño infantil',de:'Kinderbad',val:'2,35 m²'},
      {fr:'Toilette visiteur',en:'Guest toilet',es:'Aseo visitas',de:'Gäste-WC',val:'2 m²'},
    ],
    features:{fr:['Architecture Open Space élégant','Circulation fluide et fonctionnelle','Jardin tropical aménagé','Parfait pour famille de 3-4 personnes'],en:['Elegant open-space architecture','Smooth functional circulation','Landscaped tropical garden','Perfect for family of 3-4'],es:['Arquitectura Open Space elegante','Circulación fluida y funcional','Jardín tropical amenizado','Perfecto para familia de 3-4'],de:['Elegante Open-Space-Architektur','Fließende Zirkulation','Tropengarten','Perfekt für eine Familie']},
  },
  { id:'f4pp', color:'#34d399', surface:'225 m²', bati:'106 m²',
    img:'/Images/yaye-dia/villa-f4pp-facade.jpg', planImg:'/Images/yaye-dia/villa-f4pp-plan.jpg',
    fr:{name:'Villa F4 Plein Pied',standing:'Moyen Standing'}, en:{name:'F4 Single-Story Villa',standing:'Mid-Range'}, es:{name:'Villa F4 Planta Baja',standing:'Rango Medio'}, de:{name:'F4 Einstöckige Villa',standing:'Mittelklasse'},
    rooms:[
      {fr:'Chambre enfant',en:'Child bedroom',es:'Habitación infantil',de:'Kinderzimmer',val:'12,29 m²'},
      {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',val:'15,65 m²'},
      {fr:'Chambre ami',en:'Guest room',es:'Habitación invitados',de:'Gästezimmer',val:'8,27 m²'},
      {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',val:'15,21 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',val:'20,92 m²'},
      {fr:'SDB parents',en:'Parents bathroom',es:'Baño padres',de:'Elternbad',val:'3 m²'},
      {fr:'SDB enfant',en:'Child bathroom',es:'Baño infantil',de:'Kinderbad',val:'2,35 m²'},
      {fr:'SDB ami',en:'Guest bathroom',es:'Baño invitados',de:'Gästebad',val:'2 m²'},
      {fr:'Toilette visiteur',en:'Guest toilet',es:'Aseo visitas',de:'Gäste-WC',val:'2 m²'},
    ],
    features:{fr:['Salon double hauteur spectaculaire','Open Space réduisant consommation énergétique','3 suites avec salles de bain privées','Façade contemporaine avec claustra bois'],en:['Spectacular double-height living room','Open space reducing energy consumption','3 suites with private bathrooms','Contemporary facade with wooden screens'],es:['Espectacular salón de doble altura','3 suites con baños privados','Fachada contemporánea con celosías'],de:['Spektakuläres Wohnzimmer','3 Suiten mit privaten Bädern','Zeitgenössische Fassade']},
  },
  { id:'f4duplex', color:'#6366f1', surface:'225 m²', bati:'232 m²',
    img:'/Images/yaye-dia/villa-f4duplex.jpg', planImg:'/Images/yaye-dia/villa-f4duplex-plan.jpg',
    fr:{name:'Villa F4 Duplex',standing:'Haut Standing'}, en:{name:'F4 Duplex Villa',standing:'High-End'}, es:{name:'Villa F4 Dúplex',standing:'Alto Standing'}, de:{name:'F4 Duplex Villa',standing:'Hochwertig'},
    floors:[
      {level:'RDC',rooms:[
        {fr:'Chambre ami',en:'Guest room',es:'Habitación invitados',de:'Gästezimmer',val:'18,24 m²'},
        {fr:'SDB ami',en:'Guest bathroom',es:'Baño invitados',de:'Gästebad',val:'2,85 m²'},
        {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',val:'13,98 m²'},
        {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',val:'58,80 m²'},
        {fr:'Toilette visiteur',en:'Guest toilet',es:'Aseo visitas',de:'Gäste-WC',val:'2 m²'},
      ]},
      {level:'Étage',rooms:[
        {fr:'Chambre enfant',en:'Child bedroom',es:'Habitación infantil',de:'Kinderzimmer',val:'18,24 m²'},
        {fr:'SDB enfant',en:'Child bathroom',es:'Baño infantil',de:'Kinderbad',val:'2,85 m²'},
        {fr:'Chambre parentale',en:'Master bedroom',es:'Dormitorio principal',de:'Elternzimmer',val:'15,96 m²'},
        {fr:'SDB parents',en:'Parents bathroom',es:'Baño padres',de:'Elternbad',val:'4 m²'},
        {fr:'Terrasse',en:'Terrace',es:'Terraza',de:'Terrasse',val:'40 m²'},
      ]},
    ],
    features:{fr:['Grandes baies vitrées sur 2 niveaux','Terrasse 40 m² vue panoramique','Salon 58,80 m² spectaculaire','Escalier design garde-corps verre'],en:['Large windows on 2 levels','40 m² panoramic terrace','Spectacular 58.80 m² living room','Designer glass staircase'],es:['Grandes ventanales en 2 niveles','Terraza 40 m² panorámica','Salón espectacular 58,80 m²'],de:['Große Fenster auf 2 Ebenen','40 m² Panoramaterrasse','Spektakuläres Wohnzimmer']},
  },
  { id:'f5', color:'#f472b6', surface:'225 m²', bati:'340 m²',
    img:'/Images/yaye-dia/villa-f5.jpg', planImg:'/Images/yaye-dia/villa-f5-plan.jpg',
    fr:{name:'Villa F5',standing:'Très Haut Standing'}, en:{name:'F5 Premium Villa',standing:'Premium'}, es:{name:'Villa F5 Premium',standing:'Premium'}, de:{name:'F5 Premium Villa',standing:'Premium'},
    rooms:[
      {fr:'Master Room',en:'Master Room',es:'Master Room',de:'Master Room',val:'20 m²'},
      {fr:'Dressing',en:'Dressing room',es:'Vestidor',de:'Ankleidezimmer',val:'4 m²'},
      {fr:'SDB Master',en:'Master bathroom',es:'Baño Master',de:'Master Bad',val:'4,20 m²'},
      {fr:'Chambre ami',en:'Guest room',es:'Habitación invitados',de:'Gästezimmer',val:'18,24 m²'},
      {fr:'2× Chambres enfant',en:'2× Child bedrooms',es:'2× Habitaciones infantiles',de:'2× Kinderzimmer',val:'18,24 m² × 2'},
      {fr:'Cuisine',en:'Kitchen',es:'Cocina',de:'Küche',val:'13,98 m²'},
      {fr:'Salon',en:'Living room',es:'Salón',de:'Wohnzimmer',val:'58,80 m²'},
      {fr:'Terrasse principale',en:'Main terrace',es:'Terraza principal',de:'Hauptterrasse',val:'66,52 m²'},
      {fr:'Terrasse secondaire',en:'Secondary terrace',es:'Terraza secundaria',de:'Nebenterrasse',val:'13,98 m²'},
    ],
    features:{fr:['Marbre Calacatta revêtement intégral','Terrasse 66,52 m² BBQ & cuisine africaine','Master Room dressing prestige','Bois massif, pierre naturelle','Couleur personnalisée au choix du client'],en:['Calacatta marble full coating','66.52 m² terrace BBQ & African kitchen','Prestige Master Room with dressing','Solid wood, natural stone','Personalised colour client choice'],es:['Revestimiento mármol Calacatta','Terraza 66,52 m² BBQ y cocina africana','Master Room con vestidor','Madera maciza, piedra natural'],de:['Calacatta-Marmor Vollverkleidung','66,52 m² Terrasse mit Grill','Prestige-Master-Room','Massivholz, Naturstein']},
  },
];

export const YAYE_SLIDES = [
  { img:'/Images/yaye-dia/villa-f5-terrasse.jpg', fr:{tag:"L'Art de vivre Moderne",title:'Villa F5 — Très Haut Standing',sub:'340 m² bâtis — Mercedes G-Wagon — Cité Yaye Dia'}, en:{tag:'The Art of Modern Living',title:'F5 Villa — Premium',sub:'340 m² built — Yaye Dia City'}, es:{tag:'El Arte de Vivir Moderno',title:'Villa F5 — Premium',sub:'340 m² construidos — Ciudad Yaye Dia'}, de:{tag:'Die Kunst des modernen Lebens',title:'F5 Villa — Premium',sub:'340 m² gebaut — Yaye Dia Stadt'} },
  { img:'/Images/yaye-dia/villa-f4duplex-nuit.jpg', fr:{tag:'Nuit Étoilée',title:'Villas F4 Duplex illuminées',sub:'Haut Standing — Cité Yaye Dia sous les étoiles'}, en:{tag:'Starry Night',title:'Illuminated F4 Duplex Villas',sub:'High-End — Yaye Dia City under the stars'}, es:{tag:'Noche Estrellada',title:'Villas F4 Dúplex iluminadas',sub:'Alto Standing — Ciudad Yaye Dia'}, de:{tag:'Sternennacht',title:'Beleuchtete F4 Duplex Villen',sub:'Hochwertig — Yaye Dia Stadt'} },
  { img:'/Images/yaye-dia/cite-vue-aerienne.jpg', fr:{tag:'Vue Aérienne',title:'300 Villas — Vue Complète',sub:'Région de Thiès — Sénégal — Cité Yaye Dia'}, en:{tag:'Aerial View',title:'300 Villas — Complete View',sub:'Thiès Region — Senegal — Yaye Dia City'}, es:{tag:'Vista Aérea',title:'300 Villas — Vista Completa',sub:'Región de Thiès — Senegal'}, de:{tag:'Luftaufnahme',title:'300 Villen — Vollständige Ansicht',sub:'Thiès Region — Senegal'} },
  { img:'/Images/yaye-dia/villa-f4pp-facade.jpg', fr:{tag:'Moyen Standing',title:'Villa F4 Plein Pied',sub:'106 m² bâtis — Façade moderne — Range Rover rouge'}, en:{tag:'Mid-Range',title:'F4 Single-Story Villa',sub:'106 m² built — Modern facade'}, es:{tag:'Rango Medio',title:'Villa F4 Planta Baja',sub:'106 m² construidos — Fachada moderna'}, de:{tag:'Mittelklasse',title:'F4 Einstöckige Villa',sub:'106 m² gebaut — Moderne Fassade'} },
  { img:'/Images/yaye-dia/salon-f4-interieur.jpg', fr:{tag:'Intérieur Luxueux',title:'Salon Duplex — Marbre & Bois',sub:'Escalier design, verdure & finitions haut de gamme'}, en:{tag:'Luxury Interior',title:'Duplex Living Room — Marble & Wood',sub:'Designer staircase, greenery & high-end finishes'}, es:{tag:'Interior Lujoso',title:'Salón Dúplex — Mármol y Madera',sub:'Escalera de diseño y acabados de lujo'}, de:{tag:'Luxuriöses Interieur',title:'Duplex Wohnzimmer — Marmor & Holz',sub:'Designertreppe & hochwertige Oberflächen'} },
  { img:'/Images/yaye-dia/villa-f5-terrasse.jpg', fr:{tag:'Terrasse Panoramique',title:'Villa F5 — Terrasse 66,52 m²',sub:'Barbecue, salon extérieur & cuisine africaine'}, en:{tag:'Panoramic Terrace',title:'F5 Villa — 66.52 m² Terrace',sub:'BBQ, outdoor lounge & African kitchen'}, es:{tag:'Terraza Panorámica',title:'Villa F5 — Terraza 66,52 m²',sub:'Barbacoa, sala exterior y cocina africana'}, de:{tag:'Panoramaterrasse',title:'F5 Villa — 66,52 m² Terrasse',sub:'Grill, Außenwohnbereich & afrikanische Küche'} },
];

export const AMENITIES = [
  {icon:'sport',fr:{t:'Complexe Sportif Moderne',d:"Équipements sportifs de pointe pour le bien-être des résidents. Football, basketball, handball."},en:{t:'Modern Sports Complex',d:"State-of-the-art sports facilities. Football, basketball, handball."},es:{t:'Complejo Deportivo Moderno',d:"Instalaciones deportivas de última generación. Fútbol, baloncesto, balonmano."},de:{t:'Moderner Sportkomplex',d:"Hochmoderne Sportanlagen. Fußball, Basketball, Handball."}},
  {icon:'field',fr:{t:'Terrain Omnisports',d:"Terrain polyvalent pour football, basketball et handball. Un espace professionnel au cœur de la cité."},en:{t:'Multi-Purpose Sports Field',d:"Versatile field for football, basketball and handball."},es:{t:'Campo Polideportivo',d:"Campo versátil para fútbol, baloncesto y balonmano."},de:{t:'Mehrzweckspielfeld',d:"Vielseitiges Spielfeld für Fußball, Basketball und Handball."}},
  {icon:'kids',fr:{t:'Espace Jeux Enfants',d:"Aire de jeux sécurisée pour les enfants. Un environnement sûr où ils peuvent s'épanouir librement."},en:{t:"Children's Play Area",d:"Secure and equipped play area for children."},es:{t:'Zona de Juegos Infantiles',d:"Área de juegos segura y equipada para los niños."},de:{t:'Kinderspielbereich',d:"Sicherer und ausgestatteter Spielbereich für Kinder."}},
  {icon:'mosque',fr:{t:'Mosquée',d:"Lieu de culte au cœur de la cité. Espace de prière digne et accueillant pour tous les résidents."},en:{t:'Mosque',d:"Place of worship at the heart of the city."},es:{t:'Mezquita',d:"Lugar de culto en el corazón de la ciudad."},de:{t:'Moschee',d:"Gebetsstätte im Herzen der Stadt."}},
  {icon:'mall',fr:{t:'Centre Commercial',d:"Shopping de proximité avec commerces, épiceries et services essentiels pour les résidents."},en:{t:'Shopping Centre',d:"Nearby shopping with shops, groceries and essential services."},es:{t:'Centro Comercial',d:"Compras de proximidad con tiendas y servicios esenciales."},de:{t:'Einkaufszentrum',d:"Nahversorgung mit Geschäften und wesentlichen Dienstleistungen."}},
  {icon:'health',fr:{t:'District Sanitaire',d:"Centre de santé moderne pour les soins courants et urgences. La santé des résidents est une priorité."},en:{t:'Health District',d:"Modern health centre for routine care and emergencies."},es:{t:'Distrito Sanitario',d:"Centro de salud moderno para atención habitual y urgencias."},de:{t:'Gesundheitsbezirk',d:"Modernes Gesundheitszentrum für Routineversorgung und Notfälle."}},
];

export const LOTISSEMENT = {
  fr:{title:'Lotissement Sur Mesure',desc:"La Cité Yaye Dia est conçue selon les standards modernes d'urbanisme. Chaque élément est pensé pour offrir confort, sécurité et durabilité aux 300 familles.",items:[{t:'Éclairage Solaire',d:'Lampadaires solaires performants pour la sécurité 24h/24 et la durabilité environnementale.'},{t:'Réseau Assainissement',d:"Réseau complet tout-à-l'égout conforme aux normes internationales d'hygiène."},{t:'Gestion des Déchets',d:'Station de recyclage dédiée et collecte organisée pour une cité propre.'},{t:'Voirie Intelligente',d:'Routes larges et parfaitement tracées facilitant la circulation et le développement.'}]},
  en:{title:'Tailored Development',desc:"Yaye Dia City is designed to modern urban planning standards. Every element is designed for comfort, safety and durability for 300 families.",items:[{t:'Solar Lighting',d:'High-performance solar street lights for 24/7 security and environmental sustainability.'},{t:'Sewerage Network',d:'Complete sewerage network compliant with international hygiene standards.'},{t:'Waste Management',d:'Dedicated recycling station and organised collection for a clean city.'},{t:'Smart Roads',d:'Wide and perfectly laid roads facilitating circulation and development.'}]},
  es:{title:'Urbanización a Medida',desc:"La Ciudad Yaye Dia está diseñada según los estándares modernos de planificación urbana.",items:[{t:'Alumbrado Solar',d:'Farolas solares de alto rendimiento para seguridad 24/7.'},{t:'Red de Saneamiento',d:'Red completa de alcantarillado conforme a normas internacionales.'},{t:'Gestión de Residuos',d:'Estación de reciclaje dedicada y recogida organizada.'},{t:'Vías Inteligentes',d:'Calles amplias y perfectamente trazadas.'}]},
  de:{title:'Maßgeschneiderte Erschließung',desc:"Die Yaye Dia Stadt ist nach modernen Stadtplanungsstandards gestaltet.",items:[{t:'Solarbeleuchtung',d:'Solarstraßenlaternen für 24/7-Sicherheit.'},{t:'Kanalnetz',d:'Vollständiges Abwassernetz gemäß internationalen Hygienestandards.'},{t:'Abfallwirtschaft',d:'Dedizierte Recyclingstation und organisierte Sammlung.'},{t:'Intelligente Straßen',d:'Breite und perfekt angelegte Straßen.'}]},
};

export const ARCH_PHILOSOPHY = {
  fr:{title:'Architecture Tropicale Contemporaine',intro:"L'esthétique au service de la fonctionnalité",desc:"Nos villas sont conçues selon une philosophie architecturale tropicale contemporaine alliant esthétique, confort et durabilité. L'espace de vie ouvert augmente la perception de surface jusqu'à +20% visuellement.",subtitle:'Nos 3 Piliers Architecturaux',items:["Optimisation fonctionnelle — chaque m² est pensé et utilisé","Fluidité des circulations — passages naturels et intuitifs","Valorisation de la lumière naturelle — grandes baies vitrées"]},
  en:{title:'Contemporary Tropical Architecture',intro:"Aesthetics in service of functionality",desc:"Our villas follow a contemporary tropical architectural philosophy combining aesthetics, comfort and durability. The open living space increases surface perception by up to +20% visually.",subtitle:'Our 3 Architectural Pillars',items:["Functional optimisation — every m² is thought out","Fluid circulation — natural and intuitive passages","Enhancement of natural light — large bay windows"]},
  es:{title:'Arquitectura Tropical Contemporánea',intro:"La estética al servicio de la funcionalidad",desc:"Nuestras villas siguen una filosofía arquitectónica tropical contemporánea que combina estética, confort y durabilidad.",subtitle:'Nuestros 3 Pilares Arquitectónicos',items:["Optimización funcional — cada m² está pensado","Fluidez de circulaciones — pasos naturales e intuitivos","Valorización de la luz natural — grandes ventanales"]},
  de:{title:'Zeitgenössische Tropische Architektur',intro:"Ästhetik im Dienst der Funktionalität",desc:"Unsere Villen folgen einer zeitgenössischen tropischen Architekturphilosophie, die Ästhetik, Komfort und Langlebigkeit verbindet.",subtitle:'Unsere 3 Architektonischen Säulen',items:["Funktionale Optimierung — jeder m² ist durchdacht","Fließende Zirkulation — natürliche Wege","Aufwertung des natürlichen Lichts — große Glasfronten"]},
};

export const MATERIALS = {
  fr:{title:'Matériaux Nobles & Durables',desc:"Chaque villa est construite avec des matériaux haut de gamme : bois massif, pierre naturelle et marbre Calacatta pour les villas F5. La qualité est non négociable chez GNAH.",marble:"Revêtement intégral en marbre Calacatta — veines dorées, brillance naturelle. Symbole de luxe et prestige absolu.",color:"Le client a une liberté totale sur le choix de la couleur. Première recommandation : vert émeraude modulable. Le client est Roi."},
  en:{title:'Noble & Durable Materials',desc:"Each villa is built with high-end materials: solid wood, natural stone and Calacatta marble for F5 villas. Quality is non-negotiable at GNAH.",marble:"Full Calacatta marble coating — golden veins, natural shine. Symbol of absolute luxury and prestige.",color:"The client has total freedom in colour choice. First recommendation: adjustable emerald green. The client is King."},
  es:{title:'Materiales Nobles y Duraderos',desc:"Cada villa está construida con materiales de alta gama: madera maciza, piedra natural y mármol Calacatta para las villas F5.",marble:"Revestimiento integral de mármol Calacatta — vetas doradas, brillo natural.",color:"El cliente tiene libertad total en la elección del color. Primera recomendación: verde esmeralda modulable."},
  de:{title:'Edle & Dauerhafte Materialien',desc:"Jede Villa wird mit hochwertigen Materialien gebaut: Massivholz, Naturstein und Calacatta-Marmor für F5-Villen.",marble:"Vollständige Calacatta-Marmor Verkleidung — goldene Adern, natürlicher Glanz.",color:"Der Kunde hat völlige Freiheit bei der Farbwahl. Erste Empfehlung: anpassbares Smaragdgrün."},
};

export const PARTNERS_WORLD = [
  {code:'TR',fr:{country:'Turquie',focus:"Immobilier, infrastructure & construction. Plus de 50 ans d'expérience. Partenaires commerciaux de confiance."},en:{country:'Turkey',focus:'Real estate, infrastructure & construction. Over 50 years of experience. Trusted commercial partners.'},es:{country:'Turquía',focus:'Inmobiliaria, infraestructura y construcción. Más de 50 años de experiencia.'},de:{country:'Türkei',focus:'Immobilien, Infrastruktur & Bau. Über 50 Jahre Erfahrung.'}},
  {code:'CN',fr:{country:'Chine',focus:'Projets routiers, mines, infrastructure majeure. Capacité de financement et réalisation exceptionnelle.'},en:{country:'China',focus:'Road projects, mining, major infrastructure. Exceptional financing and delivery capacity.'},es:{country:'China',focus:'Proyectos viales, minería, infraestructura mayor.'},de:{country:'China',focus:'Straßenprojekte, Bergbau, Hauptinfrastruktur.'}},
  {code:'RU',fr:{country:'Russie',focus:'Énergies renouvelables, projets solaires et éoliens. Technologies de pointe pour l\'Afrique.'},en:{country:'Russia',focus:'Renewable energies, solar and wind projects. Cutting-edge technologies for Africa.'},es:{country:'Rusia',focus:'Energías renovables, proyectos solares y eólicos.'},de:{country:'Russland',focus:'Erneuerbare Energien, Solar- und Windprojekte.'}},
  {code:'US',fr:{country:'États-Unis',focus:"Ports autonomes, ouvrages d'art et génie civil. Innovation et excellence technologique."},en:{country:'United States',focus:'Autonomous ports, engineering structures and civil engineering. American innovation.'},es:{country:'Estados Unidos',focus:'Puertos autónomos, obras de ingeniería y obra civil.'},de:{country:'Vereinigte Staaten',focus:'Autonome Häfen, Ingenieurbauwerke und Tiefbau.'}},
  {code:'MY',fr:{country:'Malaisie',focus:"Agriculture moderne, projets d'État et transfert de technologie agricole. Expertise reconnue mondialement."},en:{country:'Malaysia',focus:'Modern agriculture, state projects and agricultural technology transfer.'},es:{country:'Malasia',focus:'Agricultura moderna, proyectos estatales y transferencia tecnológica.'},de:{country:'Malaysia',focus:'Moderne Landwirtschaft, Staatsprojekte und Technologietransfer.'}},
    {code:'IN',fr:{country:'Inde',focus:"Transport & Logistique — Flotte de poids lourds, transport intermodal et solutions logistiques pour l'Afrique et l'Asie."},en:{country:'India',focus:'Transport & Logistics — Heavy truck fleet, intermodal transport and logistics solutions for Africa and Asia.'},es:{country:'India',focus:'Transporte y Logística — Flota de camiones pesados, transporte intermodal y soluciones logísticas para África y Asia.'},de:{country:'Indien',focus:'Transport & Logistik — Schwerlastflotte, intermodaler Transport und Logistiklösungen für Afrika und Asien.'}},
  {code:'GB',fr:{country:'Royaume-Uni',focus:"Levée de fonds, banques d'investissement et structuration financière internationale. Centre financier mondial."},en:{country:'United Kingdom',focus:'Fundraising, investment banks and international financial structuring.'},es:{country:'Reino Unido',focus:'Captación de fondos, bancos de inversión y estructuración financiera.'},de:{country:'Vereinigtes Königreich',focus:'Kapitalbeschaffung, Investmentbanken und internationale Finanzstrukturierung.'}},
];

export const AFRICA_PARTNERS = ['Sénégal',"Côte d'Ivoire",'Nigeria','Gabon','Ghana','Cameroun','Mali','Burkina Faso','Guinée','Togo','Bénin'];

export const OPERATIONS = [
  {country:"Côte d'Ivoire",fr:'Port lagunaire de Dabou',en:'Dabou lagoon port',es:'Puerto lagunar de Dabou',de:'Lagunenhafen Dabou',value:'$1,7 Mrd',type:'BOT'},
  {country:'Nigeria',fr:'Autoroute Abuja–Lagos 467 km',en:'Abuja–Lagos 467 km Highway',es:'Autopista Abuja–Lagos 467 km',de:'Autobahn Abuja–Lagos 467 km',value:'$5,7 Mrd',type:'BOT'},
  {country:"Côte d'Ivoire",fr:'Programme immobilier Eden',en:'Eden real estate programme',es:'Programa inmobiliario Eden',de:'Immobilienprogramm Eden',value:'$700M',type:'Public/Privé'},
  {country:'Gabon',fr:'Centre de réinsertion sociale',en:'Social reintegration centre',es:'Centro de reinserción social',de:'Reintegrationszentrum',value:'$70M',type:'État'},
  {country:"Côte d'Ivoire",fr:'Projets privés résidentiels',en:'Private residential projects',es:'Proyectos privados residenciales',de:'Private Wohnprojekte',value:'$20M',type:'Privé'},
];

export const INVEST_CAPACITY = [
  {range:'$50M — $6 Mrd',fr:"Projets d'État",en:'State Projects',es:'Proyectos de Estado',de:'Staatliche Projekte'},
  {range:'$30M — $450M',fr:'Projets Public/Privé',en:'Public/Private',es:'Público/Privado',de:'Öffentlich/Privat'},
  {range:'$3M — $20M',fr:'Projets Privés',en:'Private Projects',es:'Proyectos Privados',de:'Private Projekte'},
];

export const COMMITMENTS = [
  {icon:'target',fr:{title:'Excellence & Qualité',desc:"Chaque projet GNAH est réalisé selon les plus hauts standards de qualité. Nous livrons des réalisations durables, esthétiques et fonctionnelles qui dépassent les attentes."},en:{title:'Excellence & Quality',desc:"Every GNAH project is completed to the highest quality standards. We deliver lasting, aesthetic and functional achievements that exceed expectations."},es:{title:'Excelencia y Calidad',desc:"Cada proyecto de GNAH se realiza según los más altos estándares de calidad."},de:{title:'Exzellenz & Qualität',desc:"Jedes GNAH-Projekt wird nach höchsten Qualitätsstandards realisiert."}},
  {icon:'eco',fr:{title:'Développement Durable',desc:"GNAH intègre des pratiques éco-responsables dans tous ses projets : éclairage solaire, gestion optimisée des déchets, matériaux durables et architecture respectueuse de l'environnement."},en:{title:'Sustainable Development',desc:"GNAH integrates eco-responsible practices across all projects: solar lighting, optimised waste management, sustainable materials and environmentally friendly architecture."},es:{title:'Desarrollo Sostenible',desc:"GNAH integra prácticas eco-responsables en todos sus proyectos."},de:{title:'Nachhaltige Entwicklung',desc:"GNAH integriert öko-verantwortliche Praktiken in alle seine Projekte."}},
  {icon:'community',fr:{title:'Impact Communautaire',desc:"Nos projets créent de l'emploi local, développent les compétences et contribuent à l'amélioration du cadre de vie des populations africaines. L'Afrique est au cœur de notre mission."},en:{title:'Community Impact',desc:"Our projects create local employment, develop skills and contribute to improving the living conditions of African populations."},es:{title:'Impacto Comunitario',desc:"Nuestros proyectos crean empleo local y mejoran las condiciones de vida de las poblaciones africanas."},de:{title:'Gemeinschaftliche Wirkung',desc:"Unsere Projekte schaffen lokale Arbeitsplätze und verbessern die Lebensbedingungen."}},
  {icon:'star',fr:{title:'Transparence & Confiance',desc:"GNAH construit des relations durables basées sur la transparence, l'intégrité et la confiance mutuelle avec tous ses partenaires, investisseurs et clients."},en:{title:'Transparency & Trust',desc:"GNAH builds lasting relationships based on transparency, integrity and mutual trust with all partners, investors and clients."},es:{title:'Transparencia y Confianza',desc:"GNAH construye relaciones duraderas basadas en la transparencia, la integridad y la confianza mutua."},de:{title:'Transparenz & Vertrauen',desc:"GNAH baut dauerhafte Beziehungen auf Basis von Transparenz, Integrität und gegenseitigem Vertrauen auf."}},
];

export const AFRICA_OPPS = {
  fr:"L'Afrique représente 23% de la surface planète, 24,3% des terres agricoles mondiales, 90% des réserves mondiales de platine et 30% des ressources solaires mondiales. L'Afrique est à la fois le futur grenier et la future usine du monde. C'est pourquoi Groupe Ndoye Africa Holding investit massivement sur ce continent exceptionnel.",
  en:"Africa represents 23% of Earth's surface, 24.3% of global agricultural land, 90% of world platinum reserves and 30% of global solar resources. Africa is both the future granary and factory of the world. This is why Groupe Ndoye Africa Holding invests massively on this exceptional continent.",
  es:"África representa el 23% de la superficie terrestre, el 24,3% de las tierras agrícolas mundiales, el 90% de las reservas de platino y el 30% de los recursos solares mundiales.",
  de:"Afrika repräsentiert 23% der Erdoberfläche, 24,3% der weltweiten Agrarfläche, 90% der Platinreserven und 30% der globalen Solarressourcen.",
};

export const COMPANY_INTRO = {
  fr:"G.N.A.H est présent sur le marché depuis 2015 en tant que société spécialisée dans le développement et la structuration de projets, l'infrastructure publique, l'agriculture, la construction et l'immobilier. En collaboration avec de grands groupes internationaux dans une synergie optimale.",
  en:"G.N.A.H has been operating on the market since 2015 as a company specialising in project development and structuring, public infrastructure, agriculture, construction and real estate. In collaboration with major international groups in optimal synergy.",
  es:"G.N.A.H opera en el mercado desde 2015 como empresa especializada en desarrollo y estructuración de proyectos, infraestructura pública, agricultura, construcción e inmobiliaria.",
  de:"G.N.A.H ist seit 2015 auf dem Markt tätig als Unternehmen, das sich auf Projektentwicklung, öffentliche Infrastruktur, Landwirtschaft, Bau und Immobilien spezialisiert hat.",
};
export const CONSORTIUM = {
  fr:"Composée d'une équipe de spécialistes, techniciens, ingénieurs et architectes, GNAH dispose de l'expertise nécessaire pour atteindre avec succès les objectifs définis. Notre réseau international couvre 6 pays partenaires et 11 nations africaines.",
  en:"Made up of a team of specialists, technicians, engineers and architects, GNAH has the expertise to successfully achieve defined objectives. Our international network covers 6 partner countries and 11 African nations.",
  es:"Compuesta por un equipo de especialistas, técnicos, ingenieros y arquitectos, GNAH tiene la experiencia para lograr con éxito los objetivos definidos.",
  de:"Bestehend aus einem Team von Spezialisten, Technikern, Ingenieuren und Architekten hat GNAH die Expertise, die definierten Ziele erfolgreich zu erreichen.",
};
export const STRATEGY = {
  fr:"GNAH dispose de stratégies et de plans bien définis pour atteindre chacun de ses objectifs. Si le propriétaire du projet ne dispose pas d'un modèle économique complet, nous faisons appel à des cabinets d'études experts pour mettre en place le programme.",
  en:"GNAH has well-defined strategies and plans to achieve each of its objectives. If the project owner does not have a complete business model, we call on expert study firms to set up the programme.",
  es:"GNAH dispone de estrategias y planes bien definidos para alcanzar cada uno de sus objetivos.",
  de:"GNAH hat klar definierte Strategien und Pläne zur Erreichung jedes seiner Ziele.",
};

export const OBJECTIVES = [
  {img:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=85',fr:{title:'Infrastructure Routière',desc:"Autoroute Abuja-Lagos 467km ($5,7 Mrd) et autres routes à travers l'Afrique"},en:{title:'Road Infrastructure',desc:"Abuja-Lagos 467km highway ($5.7B) and other roads across Africa"},es:{title:'Infraestructura Vial',desc:"Autopista Abuja-Lagos 467km y otras carreteras"},de:{title:'Straßeninfrastruktur',desc:"Abuja-Lagos 467km Autobahn und andere Straßen"}},
  {img:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=85',fr:{title:'Développement Immobilier',desc:"300+ villas Yaye Dia, Programme Eden ($700M) et projets résidentiels privés ($20M)"},en:{title:'Real Estate Development',desc:"300+ Yaye Dia villas, Eden Programme ($700M) and private residential projects"},es:{title:'Desarrollo Inmobiliario',desc:"300+ villas Yaye Dia, Programa Eden ($700M) y proyectos residenciales privados"},de:{title:'Immobilienentwicklung',desc:"300+ Yaye Dia Villen, Eden-Programm ($700M) und private Wohnprojekte"}},
  {img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85',fr:{title:'Industries & Mines',desc:"Exploitation minière responsable et développement industriel pour l'Afrique de demain"},en:{title:'Industry & Mining',desc:"Responsible mining and industrial development for tomorrow's Africa"},es:{title:'Industria y Minería',desc:"Minería responsable y desarrollo industrial para el África del mañana"},de:{title:'Industrie & Bergbau',desc:"Verantwortungsvoller Bergbau und industrielle Entwicklung"}},
  {img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=85',fr:{title:'Ports & Transport Maritime',desc:"Port lagunaire Dabou ($1,7 Mrd BOT) et infrastructures portuaires modernes"},en:{title:'Ports & Maritime Transport',desc:"Dabou lagoon port ($1.7B BOT) and modern port infrastructure"},es:{title:'Puertos y Transporte Marítimo',desc:"Puerto lagunar Dabou ($1,7 Mrd BOT) e infraestructuras portuarias"},de:{title:'Häfen & Seetransport',desc:"Lagunenhafen Dabou ($1,7 Mrd BOT) und moderne Hafeninfrastruktur"}},
  {img:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=85',fr:{title:'Agriculture Technologique',desc:"Systèmes agricoles automatisés pour valoriser les 24,3% de terres agricoles africaines"},en:{title:'Technological Agriculture',desc:"Automated agricultural systems to enhance Africa's 24.3% of global agricultural land"},es:{title:'Agricultura Tecnológica',desc:"Sistemas agrícolas automatizados para valorizar las tierras africanas"},de:{title:'Technologische Landwirtschaft',desc:"Automatisierte Agrarsysteme zur Aufwertung afrikanischer Ackerflächen"}},
  {img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=85',fr:{title:'Énergie Renouvelable',desc:"30% des ressources solaires mondiales en Afrique. Projets solaires, éoliens et hydrogène"},en:{title:'Renewable Energy',desc:"30% of global solar resources in Africa. Solar, wind and hydrogen projects"},es:{title:'Energía Renovable',desc:"30% de los recursos solares mundiales en África. Proyectos solares y eólicos"},de:{title:'Erneuerbare Energien',desc:"30% der weltweiten Solarressourcen in Afrika. Solar-, Wind- und Wasserstoffprojekte"}},
];


export const COMPANIES = [
  {
    id: 1,
    active: true,
    name: 'Terratransport',
    logo: '/Images/entreprises/logo-terratransport.png',
    sector: { fr:'Transport & Logistique', en:'Transport & Logistics', es:'Transporte y Logística', de:'Transport & Logistik' },
    country: 'Sénégal',
    website: 'https://www.terratransport.com',
    desc: {
      fr: "Terratransport est spécialisée dans la commercialisation de poids lourds et la gestion de flottes de camions. Nous proposons des solutions de transport intermodal et logistique adaptées aux besoins de l'Afrique et de l'Asie. Notre expertise couvre le transport de marchandises, la maintenance de flotte et les solutions logistiques intégrées.",
      en: "Terratransport specialises in heavy truck commercialisation and fleet management. We offer intermodal transport and logistics solutions adapted to the needs of Africa and Asia. Our expertise covers freight transport, fleet maintenance and integrated logistics solutions.",
      es: "Terratransport está especializada en la comercialización de camiones pesados y la gestión de flotas. Ofrecemos soluciones de transporte intermodal y logística adaptadas a las necesidades de África y Asia.",
      de: "Terratransport ist auf die Vermarktung von Schwerlastfahrzeugen und Flottenmanagement spezialisiert. Wir bieten intermodale Transport- und Logistiklösungen für Afrika und Asien an.",
    },
  },
];

export const DEFAULT_ADMIN_CONTENT = {
  projects:[
    {id:1,active:true,category:'Immobilier',img:'/Images/yaye-dia/cite-vue-aerienne.jpg',title:{fr:'Résidence Yaye Dia',en:'Yaye Dia Residence'},desc:{fr:'300 villas haut standing en Région de Thiès, Sénégal. 4 types : F3, F4PP, F4 Duplex et F5.',en:'300 high-end villas in Thiès Region, Senegal. 4 types: F3, F4PP, F4 Duplex and F5.'},waMsg:{fr:'Bonjour, je suis intéressé(e) par la Résidence Yaye Dia.',en:'Hello, I am interested in the Yaye Dia Residence.'}},
    {id:2,active:true,category:'Infrastructure',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=85',title:{fr:'Port Lagunaire de Dabou',en:'Dabou Lagoon Port'},desc:{fr:"Port lagunaire en Côte d'Ivoire — $1,7 milliard — Contrat BOT.",en:"Lagoon port in Ivory Coast — $1.7 billion — BOT contract."},waMsg:{fr:"Bonjour, je suis intéressé(e) par le Port de Dabou.",en:"Hello, I am interested in the Dabou Port."}},
    {id:3,active:true,category:'Infrastructure',img:'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=85',title:{fr:'Autoroute Abuja–Lagos 467 km',en:'Abuja–Lagos Highway'},desc:{fr:"Autoroute au Nigeria — $5,7 milliards — Contrat BOT — 467 km.",en:"Highway in Nigeria — $5.7 billion — BOT contract — 467 km."},waMsg:{fr:"Bonjour, je m'intéresse à l'autoroute Abuja-Lagos.",en:"Hello, I am interested in the Abuja-Lagos highway."}},
  ],
};
