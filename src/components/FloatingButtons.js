import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { SITE } from '../data/siteData';

// Knowledge base
const KB = {
  fr: {
    greet: ["Bonjour ! Je suis l'assistant intelligent de Groupe Ndoye Africa Holding. Je peux vous informer sur notre entreprise, la Résidence Yaye Dia, nos services, partenariats ou opportunités d'investissement en Afrique. Comment puis-je vous aider ?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) est une société présente depuis 2015, spécialisée dans le développement et la structuration de projets, l'infrastructure publique, l'agriculture, la construction et l'immobilier. Siège social : Cité Baobab, Sénégal. Nous avons plus de 10 ans d'expérience, 6 partenaires mondiaux (Turquie, Chine, Russie, USA, Malaisie, Royaume-Uni) et opérons dans 11 pays africains.",
    history: "G.N.A.H existe depuis 2015. En 10 ans, nous avons bâti un réseau de partenaires dans 6 pays et développé des projets majeurs dans 11 pays africains : Sénégal, Côte d'Ivoire, Nigeria, Gabon, Ghana et plus. En 2025, nous célébrons 10 ans d'excellence.",
    yayedia: "La Résidence Yaye Dia est notre projet phare : 300 villas haut standing en Région de Thiès, Sénégal. Chaque villa est sur un terrain de 225 m². Nous proposons 4 types de villas : F3 Économique (surface bâtie 83 m²), F4 Plein Pied Moyen Standing (106 m²), F4 Duplex Haut Standing (232 m²), et F5 Très Haut Standing (340 m²). La cité intègre complexe sportif, terrain omnisports, espace enfants, mosquée, centre commercial et district sanitaire.",
    f3: "La Villa F3 Économique : terrain 225 m², surface bâtie 83 m². Composition : chambre enfant (12,50 m²), chambre parentale (15,65 m²), cuisine ouverte (15,21 m²), salon (20,92 m²), SDB parents (3 m²), SDB enfant (2,35 m²), toilette visiteur (2 m²). Architecture Open Space élégant, circulation fluide.",
    f4pp: "La Villa F4 Plein Pied Moyen Standing : terrain 225 m², surface bâtie 106 m². Composition : chambre enfant (12,29 m²), chambre parentale (15,65 m²), chambre ami (8,27 m²), cuisine (15,21 m²), salon double hauteur (20,92 m²), SDB parents, SDB enfant, SDB ami, toilette visiteur. Open Space élégant, réduction consommation énergétique.",
    f4duplex: "La Villa F4 Duplex Haut Standing : terrain 225 m², surface bâtie 232 m², sur 2 niveaux. RDC : chambre ami (18,24 m²), SDB ami (2,85 m²), cuisine (13,98 m²), salon (58,80 m²), toilette visiteur (2 m²). Étage : chambre enfant (18,24 m²), SDB enfant (2,85 m²), chambre parentale (15,96 m²), SDB parents (4 m²), terrasse (40 m²). Grandes baies vitrées, luminosité optimale.",
    f5: "La Villa F5 Très Haut Standing : terrain 225 m², surface bâtie 340 m². RDC : chambre ami (18,24 m²), cuisine (13,98 m²), salon (58,80 m²), SDB parents + Dressing (4,20 m² + 4 m²). Étage/Terrasse : Master Room (20 m²), 2 chambres enfants, SDB, terrasse principale (66,52 m²) avec barbecue et cuisine africaine, terrasse secondaire (13,98 m²). Marbre Calacatta, matériaux nobles, choix de couleur unique pour le client.",
    architecture: "Notre philosophie architecturale repose sur 3 piliers : Optimisation fonctionnelle, Fluidité des circulations, Valorisation de la lumière naturelle. Architecture Tropicale Contemporaine. Un espace de vie ouvert augmente la perception de surface jusqu'à +20% visuellement. Matériaux nobles : bois massif, pierre naturelle, marbre Calacatta, grandes baies vitrées.",
    amenities: "La Cité Yaye Dia propose : complexe sportif moderne, terrain omnisports (football, basketball, handball), espace jeux enfants sécurisé, mosquée, centre commercial de proximité, district sanitaire. Éclairage 100% solaire, réseau d'assainissement complet (tout-à-l'égout), gestion professionnelle des déchets avec station de recyclage.",
    lotissement: "Le lotissement Yaye Dia : parcelles de 225 m², voirie intelligente (routes larges et parfaitement tracées), éclairage solaire performant (sécurité 24h/24), réseau d'assainissement intégré, gestion des déchets structurée. Ce n'est pas seulement un ensemble de parcelles, c'est un projet urbain structuré.",
    services: "Nos 6 services principaux : 1) Gestion Immobilière — administration complète de vos biens. 2) Développement de Projets — de la conception à la réalisation. 3) Structuration Financière — montages adaptés privés/publics. 4) Infrastructure Publique — routes, ponts, ports. 5) Agriculture & Technologie — systèmes automatisés. 6) Énergie Renouvelable — solaire, éolien, hydrogène.",
    partners: "Nos partenaires mondiaux : Turquie (immobilier, infrastructure, 50+ ans expérience, partenaires commerciaux), Chine (routes, mines, infrastructure), Russie (énergies renouvelables), USA (ports autonomes, ouvrages d'art), Malaisie (agriculture, projets d'État), Royaume-Uni (levée de fonds, banques d'investissement). Partenaires africains dans 11 pays.",
    invest: "Capacité d'investissement de nos partenaires : Projets d'État de $50M à $6 milliards, Projets Public/Privé de $30M à $450M, Projets Privés de $3M à $20M. Opérations en cours : Port lagunaire Dabou (Côte d'Ivoire, $1,7 Mrd, BOT), Autoroute Abuja-Lagos 467km (Nigeria, $5,7 Mrd, BOT), Programme Eden (Côte d'Ivoire, $700M), Centre réinsertion (Gabon, $70M), Projets privés (Côte d'Ivoire, $20M).",
    africa: "L'Afrique représente 23% de la surface planète, 24,3% terres agricoles mondiales, 90% réserves mondiales platine, 30% ressources solaires mondiales. L'Afrique est à la fois le futur grenier et la future usine du monde. C'est pourquoi GNAH investit massivement sur ce continent exceptionnel.",
    price: "Pour les prix détaillés de la Résidence Yaye Dia, contactez-nous sur WhatsApp au +221 77 939 84 84. Notre équipe vous enverra une offre personnalisée selon le type de villa (F3, F4 Plein Pied, F4 Duplex ou F5 Haut Standing).",
    reservation: "Pour réserver votre villa : rendez-vous dans la section 'Projets' du site et remplissez le formulaire de réservation. Votre demande sera transmise directement via WhatsApp. Vous pouvez aussi nous appeler au +221 77 939 84 84.",
    contact: "Contactez-nous sur WhatsApp : +221 77 939 84 84. Email : groupendoyeafricaholding@gmail.com. Bureau : Cité Baobab, Sénégal. Notre équipe vous répond rapidement.",
    immo: "L'immobilier est un investissement sûr et rentable à long terme. Au Sénégal, le marché immobilier connaît une forte croissance. La Résidence Yaye Dia offre des villas haut standing sur 225 m² avec toutes les commodités d'une ville moderne — un investissement idéal pour votre famille et votre avenir.",
    offsite: "Cette question semble dépasser le cadre de nos activités immobilières et de développement. Je vous invite à nous contacter directement sur WhatsApp au +221 77 939 84 84. Notre équipe sera ravie de vous orienter.",
    thanks: "Merci pour votre confiance ! Chez Groupe Ndoye Africa Holding, nous mettons tout en œuvre pour vous offrir un service exceptionnel. N'hésitez pas si vous avez d'autres questions.",
  },
  en: {
    greet: ["Hello! I am the intelligent assistant of Groupe Ndoye Africa Holding. I can inform you about our company, the Yaye Dia Residence, our services, partnerships or investment opportunities in Africa. How can I help you?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) is a company present since 2015, specialising in project development and structuring, public infrastructure, agriculture, construction and real estate. Head office: Cité Baobab, Senegal. We have over 10 years of experience, 7 global partners and operate in 11 African countries.",
    yayedia: "The Yaye Dia Residence is our flagship project: 300 high-end villas in the Thiès Region, Senegal. Each villa is on a 225 m² plot. We offer 4 villa types: F3 Economy (83 m² built), F4 Single-Story Mid-Range (106 m²), F4 Duplex High-End (232 m²), and F5 Premium (340 m²).",
    f3: "F3 Economy Villa: 225 m² plot, 83 m² built. Features: child bedroom (12.50 m²), master bedroom (15.65 m²), open kitchen (15.21 m²), living room (20.92 m²). Elegant open-space architecture, landscaped tropical garden.",
    f4pp: "F4 Single-Story Mid-Range Villa: 225 m² plot, 106 m² built. Spectacular double-height living room, 3 suites with private bathrooms, contemporary facade with wooden screens.",
    f4duplex: "F4 Duplex High-End Villa: 225 m² plot, 232 m² built. Ground floor: guest room, kitchen, 58.80 m² living room. Upper floor: bedrooms, 40 m² panoramic terrace.",
    f5: "F5 Premium Villa: 225 m² plot, 340 m² built. Full Calacatta marble coating, 66.52 m² terrace with BBQ and African kitchen, prestige Master Room with dressing room.",
    services: "Our services include: 1) Property Management — from design to delivery. 2) Project Development — real estate, infrastructure, agriculture. 3) Financial Structuring — access to global banks. 4) Public Infrastructure — roads, bridges, ports. 5) Agriculture & Technology — modern automated systems. 6) Renewable Energy — solar, wind, hydrogen.",
    partners: "We have 7 global partners: Turkey (real estate & construction), China (road projects & mines), Russia (renewable energy), USA (ports & civil engineering), Malaysia (modern agriculture), UK (investment banks), India (transport & logistics).",
    invest: "GNAH can handle investments from $3M to $6 billion. We structure private projects ($3M-$20M), public-private partnerships ($30M-$450M), and state projects ($50M-$6B). Contact us to discuss your project.",
    africa: "Africa represents 23% of Earth's surface, 24.3% of global agricultural land, 90% of world platinum reserves and 30% of global solar resources. GNAH invests massively on this exceptional continent.",
    contact: "Contact us: Phone/WhatsApp: +221 77 939 84 84 | Email: groupendoyeafricaholding@gmail.com | Address: Cité Baobab, Senegal | Website: groupendoyeafrica.com",
    thanks: "Thank you for your interest in Groupe Ndoye Africa Holding! Do not hesitate to contact us via WhatsApp for a quick response. Our team is available 7 days a week.",
    price: "For pricing information on the Yaye Dia villas, please contact us directly via WhatsApp at +221 77 939 84 84. Our advisors will respond quickly with a personalised offer.",
    reservation: "To reserve a villa in the Yaye Dia Residence, contact us via WhatsApp at +221 77 939 84 84. We will guide you through the reservation process step by step.",
    architecture: "Our villas follow a contemporary tropical architectural philosophy. Open-space design increases perceived surface area by +20%. Three architectural pillars: functional optimisation, fluid circulation, and enhancement of natural light.",
    amenities: "The Yaye Dia City includes: modern sports complex (football, basketball, handball), children's play area, mosque, shopping centre, health district, and smart road infrastructure with solar lighting.",
    lotissement: "The Yaye Dia development features: solar lighting for 24/7 security, a complete sewerage network, a dedicated recycling station, and wide smart roads facilitating access.",
    immo: "Real estate in Africa represents an exceptional opportunity. GNAH develops the Yaye Dia Residence with 300 premium villas in Senegal, and manages programmes like Eden ($700M in Ivory Coast).",
    offsite: "GNAH operates several major projects: Dabou lagoon port ($1.7B, Ivory Coast), Abuja-Lagos highway ($5.7B, Nigeria), Eden housing programme ($700M), and social reintegration centre ($70M, Gabon).",
  },
  de: {
    greet: ["Hallo! Ich bin der intelligente Assistent von Groupe Ndoye Africa Holding. Ich kann Sie über unser Unternehmen, die Yaye Dia Residenz, unsere Dienstleistungen, Partnerschaften oder Investitionsmöglichkeiten in Afrika informieren. Wie kann ich Ihnen helfen?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) ist seit 2015 auf dem Markt tätig und spezialisiert auf Projektentwicklung, öffentliche Infrastruktur, Landwirtschaft, Bau und Immobilien. Hauptsitz: Cité Baobab, Senegal. Über 10 Jahre Erfahrung, 7 globale Partner, 11 afrikanische Länder.",
    yayedia: "Die Yaye Dia Residenz ist unser Flaggschiffprojekt: 300 hochwertige Villen in der Region Thiès, Senegal. Jede Villa liegt auf einem 225 m² Grundstück. Wir bieten 4 Villa-Typen an: F3 Economy (83 m²), F4 Einstöckig Mittelklasse (106 m²), F4 Duplex Hochwertig (232 m²) und F5 Premium (340 m²).",
    f3: "F3 Economy Villa: 225 m² Grundstück, 83 m² gebaut. Merkmale: Kinderzimmer (12,50 m²), Elternzimmer (15,65 m²), offene Küche (15,21 m²), Wohnzimmer (20,92 m²). Elegante Open-Space-Architektur.",
    f4pp: "F4 Einstöckige Mittelklasse Villa: 225 m² Grundstück, 106 m² gebaut. Spektakuläres Wohnzimmer mit doppelter Höhe, 3 Suiten mit privaten Bädern, zeitgenössische Fassade.",
    f4duplex: "F4 Duplex Hochwertige Villa: 225 m² Grundstück, 232 m² gebaut. Erdgeschoss: Gästezimmer, Küche, 58,80 m² Wohnzimmer. Obergeschoss: Schlafzimmer, 40 m² Panoramaterrasse.",
    f5: "F5 Premium Villa: 225 m² Grundstück, 340 m² gebaut. Vollständige Calacatta-Marmor Verkleidung, 66,52 m² Terrasse mit Grill und afrikanischer Küche, Prestige-Master-Room.",
    services: "Unsere Dienstleistungen: 1) Immobilienverwaltung. 2) Projektentwicklung. 3) Finanzstrukturierung. 4) Öffentliche Infrastruktur. 5) Landwirtschaft & Technologie. 6) Erneuerbare Energien.",
    partners: "Wir haben 7 globale Partner: Türkei, China, Russland, USA, Malaysia, Vereinigtes Königreich und Indien (Transport & Logistik).",
    invest: "GNAH kann Investitionen von 3 Mio. bis 6 Mrd. USD verwalten. Kontaktieren Sie uns, um Ihr Projekt zu besprechen.",
    africa: "Afrika repräsentiert 23% der Erdoberfläche, 24,3% der weltweiten Agrarfläche, 90% der Platinreserven und 30% der Solarressourcen.",
    contact: "Kontakt: Telefon/WhatsApp: +221 77 939 84 84 | E-Mail: groupendoyeafricaholding@gmail.com | Adresse: Cité Baobab, Senegal",
    thanks: "Vielen Dank für Ihr Interesse an Groupe Ndoye Africa Holding! Zögern Sie nicht, uns über WhatsApp zu kontaktieren. Unser Team ist 7 Tage die Woche erreichbar.",
    price: "Für Preisinformationen zu den Yaye Dia Villen kontaktieren Sie uns bitte direkt über WhatsApp: +221 77 939 84 84.",
    reservation: "Um eine Villa in der Yaye Dia Residenz zu reservieren, kontaktieren Sie uns über WhatsApp: +221 77 939 84 84.",
    architecture: "Unsere Villen folgen einer zeitgenössischen tropischen Architekturphilosophie. Open-Space-Design erhöht die wahrgenommene Fläche um +20%.",
    amenities: "Die Yaye Dia Stadt umfasst: Sportkomplex, Kinderspielbereich, Moschee, Einkaufszentrum und Gesundheitszentrum.",
    lotissement: "Die Yaye Dia Erschließung umfasst: Solarbeleuchtung, Abwassernetz, Recyclingstation und intelligente Straßen.",
    immo: "GNAH entwickelt die Yaye Dia Residenz mit 300 Premium-Villen in Senegal und verwaltet Programme wie Eden (700 Mio. USD auf der Elfenbeinküste).",
    offsite: "GNAH betreibt wichtige Projekte: Lagunenhafen Dabou (1,7 Mrd. USD), Autobahn Abuja-Lagos (5,7 Mrd. USD) und weiteres.",
  },
  zh: {
    greet: ["您好！我是Groupe Ndoye Africa Holding的智能助手。我可以为您介绍我们的公司、Yaye Dia住宅、我们的服务、合作伙伴关系或在非洲的投资机会。请问有什么可以帮到您？"],
    company: "Groupe Ndoye Africa Holding（G.N.A.H）自2015年以来一直活跃于市场，专注于项目开发与结构化、公共基础设施、农业、建筑和房地产。总部：塞内加尔巴奥巴布城。超过10年经验，7个全球合作伙伴，在11个非洲国家运营。",
    yayedia: "Yaye Dia住宅是我们的旗舰项目：在塞内加尔蒂耶斯地区建造300栋高档别墅。每栋别墅占地225平方米。我们提供4种别墅类型：F3经济型（83平米）、F4平层中档（106平米）、F4复式高档（232平米）和F5豪华型（340平米）。",
    f3: "F3经济型别墅：占地225平米，建筑面积83平米。配置：儿童卧室（12.50平米）、主卧室（15.65平米）、开放式厨房（15.21平米）、客厅（20.92平米）。优雅的开放式建筑，热带花园。",
    f4pp: "F4平层中档别墅：占地225平米，建筑面积106平米。壮观的双层挑高客厅，3间带私人浴室的套房，现代风格外立面。",
    f4duplex: "F4复式高档别墅：占地225平米，建筑面积232平米。一楼：客房、厨房、58.80平米客厅。二楼：卧室、40平米全景露台。",
    f5: "F5豪华别墅：占地225平米，建筑面积340平米。卡拉卡塔大理石全覆盖，66.52平米露台含BBQ和非洲厨房，带更衣室的豪华主套房。",
    services: "我们的服务包括：1) 房产管理；2) 项目开发；3) 金融结构；4) 公共基础设施；5) 农业与技术；6) 可再生能源。",
    partners: "我们拥有7个全球合作伙伴：土耳其（房地产与建筑）、中国（道路项目与矿业）、俄罗斯（可再生能源）、美国（港口与土木工程）、马来西亚（现代农业）、英国（投资银行）、印度（运输与物流）。",
    invest: "GNAH可处理300万至60亿美元的投资。我们承接私人项目（300万-2000万美元）、公私合营项目（3000万-4.5亿美元）和国家项目（5000万-60亿美元）。",
    africa: "非洲占地球表面积的23%，全球农业用地的24.3%，全球铂储量的90%，以及全球太阳能资源的30%。GNAH在这片卓越的大陆上大力投资。",
    contact: "联系我们：电话/WhatsApp：+221 77 939 84 84 | 邮箱：groupendoyeafricaholding@gmail.com | 地址：塞内加尔巴奥巴布城",
    thanks: "感谢您对Groupe Ndoye Africa Holding的关注！欢迎随时通过WhatsApp联系我们，我们每周7天都为您服务。",
    price: "如需了解Yaye Dia别墅的价格信息，请直接通过WhatsApp联系我们：+221 77 939 84 84，我们的顾问将为您提供个性化报价。",
    reservation: "如需预订Yaye Dia住宅的别墅，请通过WhatsApp联系我们：+221 77 939 84 84，我们将逐步指导您完成预订流程。",
    architecture: "我们的别墅遵循当代热带建筑理念。开放式设计在视觉上增加了+20%的空间感知。三大建筑支柱：功能优化、流畅动线和自然光利用。",
    amenities: "Yaye Dia城包含：现代体育综合体（足球、篮球、手球）、儿童游乐区、清真寺、购物中心和医疗区。",
    lotissement: "Yaye Dia开发区配备：24/7太阳能照明、完整排污网络、专用回收站和智能宽阔道路。",
    immo: "GNAH在塞内加尔开发Yaye Dia住宅（300栋豪华别墅），并管理伊甸园计划等项目（科特迪瓦，7亿美元）。",
    offsite: "GNAH运营多个重大项目：达布湖港（17亿美元，科特迪瓦）、阿布贾-拉各斯高速公路（57亿美元，尼日利亚）、伊甸园住房计划（7亿美元）等。",
  },
  es: {
    greet: ["¡Hola! Soy el asistente inteligente de Groupe Ndoye Africa Holding. Puedo informarle sobre nuestra empresa, la Residencia Yaye Dia, nuestros servicios, asociaciones u oportunidades de inversión en África. ¿Cómo puedo ayudarle?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) está presente en el mercado desde 2015, especializada en desarrollo y estructuración de proyectos, infraestructura pública, agricultura, construcción e inmobiliaria. Sede: Cité Baobab, Senegal. Más de 10 años de experiencia, 7 socios mundiales, 11 países africanos.",
    yayedia: "La Residencia Yaye Dia es nuestro proyecto insignia: 300 villas de alto standing en la Región de Thiès, Senegal. Cada villa está en una parcela de 225 m². Ofrecemos 4 tipos de villas: F3 Económica (83 m²), F4 Planta Baja Rango Medio (106 m²), F4 Dúplex Alto Standing (232 m²) y F5 Premium (340 m²).",
    f3: "Villa F3 Económica: parcela 225 m², superficie construida 83 m². Habitación infantil (12,50 m²), dormitorio principal (15,65 m²), cocina abierta (15,21 m²), salón (20,92 m²).",
    f4pp: "Villa F4 Planta Baja Rango Medio: parcela 225 m², 106 m² construidos. Espectacular salón de doble altura, 3 suites con baños privados, fachada contemporánea.",
    f4duplex: "Villa F4 Dúplex Alto Standing: parcela 225 m², 232 m² construidos. Planta baja: habitación invitados, cocina, salón 58,80 m². Planta alta: dormitorios, terraza 40 m² panorámica.",
    f5: "Villa F5 Premium: parcela 225 m², 340 m² construidos. Revestimiento integral de mármol Calacatta, terraza 66,52 m² con BBQ y cocina africana, Master Room de prestigio.",
    services: "Nuestros servicios: 1) Gestión Inmobiliaria. 2) Desarrollo de Proyectos. 3) Estructuración Financiera. 4) Infraestructura Pública. 5) Agricultura y Tecnología. 6) Energía Renovable.",
    partners: "Tenemos 7 socios mundiales: Turquía, China, Rusia, EE.UU., Malasia, Reino Unido e India (transporte y logística).",
    invest: "GNAH puede gestionar inversiones de 3 millones a 6.000 millones USD. Contáctenos para hablar de su proyecto.",
    africa: "África representa el 23% de la superficie terrestre, el 24,3% de las tierras agrícolas, el 90% de las reservas de platino y el 30% de los recursos solares mundiales.",
    contact: "Contáctenos: Teléfono/WhatsApp: +221 77 939 84 84 | Email: groupendoyeafricaholding@gmail.com | Dirección: Cité Baobab, Senegal",
    thanks: "¡Gracias por su interés en Groupe Ndoye Africa Holding! No dude en contactarnos por WhatsApp. Nuestro equipo está disponible los 7 días de la semana.",
    price: "Para información sobre precios de las villas Yaye Dia, contáctenos directamente por WhatsApp: +221 77 939 84 84.",
    reservation: "Para reservar una villa en la Residencia Yaye Dia, contáctenos por WhatsApp: +221 77 939 84 84.",
    architecture: "Nuestras villas siguen una filosofía arquitectónica tropical contemporánea. El diseño Open Space aumenta la superficie percibida en +20%.",
    amenities: "La Ciudad Yaye Dia incluye: complejo deportivo, zona de juegos infantiles, mezquita, centro comercial y distrito sanitario.",
    lotissement: "La urbanización Yaye Dia dispone de: alumbrado solar, red de alcantarillado, estación de reciclaje y vías inteligentes.",
    immo: "GNAH desarrolla la Residencia Yaye Dia con 300 villas premium en Senegal, y gestiona programas como Eden (700M USD en Costa de Marfil).",
    offsite: "GNAH opera varios proyectos importantes: Puerto lagunar Dabou (1.700M USD), Autopista Abuja-Lagos (5.700M USD) y otros.",
  },
  en: {
    greet: ["Hello! I am the intelligent assistant of Groupe Ndoye Africa Holding. I can inform you about our company, Yaye Dia Residence, our services, partnerships or investment opportunities in Africa. How can I help you?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) has been operating since 2015, specialising in project development and structuring, public infrastructure, agriculture, construction and real estate. Headquarters: Cité Baobab, Senegal. Over 10 years of experience, 6 global partners (Turkey, China, Russia, USA, Malaysia, UK) and operations in 11 African countries.",
    history: "G.N.A.H has existed since 2015. In 10 years, we built a network of partners in 6 countries and developed major projects in 11 African countries. In 2025, we celebrate 10 years of excellence.",
    yayedia: "Yaye Dia Residence is our flagship project: 300 high-end villas in Thiès Region, Senegal. Each villa sits on a 225 m² plot. We offer 4 villa types: F3 Economy (83 m² built), F4 Single-Story Mid-Range (106 m²), F4 Duplex High-End (232 m²), and F5 Premium (340 m²). The city includes sports complex, multi-purpose field, children's area, mosque, shopping centre and health district.",
    f3: "F3 Economy Villa: 225 m² plot, 83 m² built. Layout: child bedroom (12.50 m²), master bedroom (15.65 m²), open kitchen (15.21 m²), living room (20.92 m²), parents bathroom (3 m²), child bathroom (2.35 m²), guest toilet (2 m²). Elegant open-space architecture.",
    f4pp: "F4 Single-Story Mid-Range Villa: 225 m² plot, 106 m² built. Layout: child bedroom (12.29 m²), master bedroom (15.65 m²), guest room (8.27 m²), kitchen (15.21 m²), double-height living room (20.92 m²), parents/child/guest bathrooms, guest toilet.",
    f4duplex: "F4 Duplex High-End Villa: 225 m² plot, 232 m² built over 2 levels. Ground floor: guest room (18.24 m²), kitchen (13.98 m²), living room (58.80 m²), guest toilet. Upper floor: child bedroom (18.24 m²), master bedroom (15.96 m²), terrace (40 m²). Large bay windows.",
    f5: "F5 Premium Villa: 225 m² plot, 340 m² built. Master Room (20 m²) with dressing room (4 m²) and bathroom (4.20 m²), Calacatta marble, kitchen (13.98 m²), living room (58.80 m²), main terrace (66.52 m²) with barbecue and African kitchen, secondary terrace (13.98 m²). Premium materials, unique colour choice for the client.",
    architecture: "Our architectural philosophy rests on 3 pillars: Functional optimisation, Fluid circulation, Enhancement of natural light. Contemporary Tropical Architecture. An open living space increases surface perception by up to +20% visually. Noble materials: solid wood, natural stone, Calacatta marble, large bay windows.",
    amenities: "Yaye Dia City offers: modern sports complex, multi-purpose sports field (football, basketball, handball), secure children's play area, mosque, nearby shopping centre, health district. 100% solar lighting, complete sewerage network, professional waste management with recycling station.",
    lotissement: "Yaye Dia development: 225 m² plots, intelligent road network (wide, perfectly laid), high-performance solar lighting (24/7 security), integrated sanitation, structured waste management. Not just plots — a structured urban project.",
    services: "Our 6 main services: 1) Property Management. 2) Project Development. 3) Financial Structuring. 4) Public Infrastructure (roads, bridges, ports). 5) Agriculture & Technology. 6) Renewable Energy (solar, wind, hydrogen).",
    partners: "Global partners: Turkey (real estate, infrastructure, 50+ years), China (roads, mining), Russia (renewable energy), USA (autonomous ports), Malaysia (agriculture, state projects), UK (fundraising, investment banks). African partners in 11 countries.",
    invest: "Investment capacity: State Projects $50M-$6B, Public/Private $30M-$450M, Private $3M-$20M. Current operations: Dabou lagoon port ($1.7B), Abuja-Lagos highway 467km ($5.7B), Eden programme ($700M), Gabon social centre ($70M).",
    africa: "Africa represents 23% of Earth's surface, 24.3% of agricultural land, 90% of world platinum reserves, 30% of global solar resources. Africa is the future factory and granary of the world.",
    price: "For detailed pricing on Yaye Dia Residence, contact us on WhatsApp at +221 77 939 84 84. Our team will send you a personalised offer.",
    reservation: "To book your villa: go to the 'Projects' section and fill in the booking form. Your request will be sent directly via WhatsApp. You can also call +221 77 939 84 84.",
    contact: "Contact us on WhatsApp: +221 77 939 84 84. Email: groupendoyeafricaholding@gmail.com. Office: Cité Baobab, Senegal.",
    immo: "Real estate is a safe, long-term investment. In Senegal, the market is growing strongly. Yaye Dia Residence offers high-end villas on 225 m² plots with all modern city amenities.",
    offsite: "This question seems outside our real estate and development activities. Please contact us on WhatsApp at +221 77 939 84 84 and our team will be happy to assist.",
    thanks: "Thank you for your trust! At Groupe Ndoye Africa Holding, we do everything to offer you exceptional service.",
  },
  es: {
    greet: ["¡Hola! Soy el asistente inteligente de Groupe Ndoye Africa Holding. Puedo informarle sobre nuestra empresa, la Residencia Yaye Dia, servicios, asociaciones u oportunidades de inversión en África. ¿Cómo puedo ayudarle?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) opera desde 2015, especializada en desarrollo y estructuración de proyectos, infraestructura pública, agricultura, construcción e inmobiliaria. Sede: Cité Baobab, Senegal. Más de 10 años de experiencia, 6 socios mundiales.",
    history: "G.N.A.H existe desde 2015. En 10 años hemos construido una red en 6 países y desarrollado proyectos en 11 países africanos. En 2025 celebramos 10 años de excelencia.",
    yayedia: "La Residencia Yaye Dia: 300 villas de alto standing en la Región de Thiès, Senegal. Cada villa en parcela de 225 m². 4 tipos: F3 Económica (83 m²), F4 Planta Baja (106 m²), F4 Dúplex (232 m²), F5 Premium (340 m²). Complejo deportivo, campo polideportivo, zona infantil, mezquita, centro comercial y distrito sanitario.",
    f3: "Villa F3 Económica: 225 m² parcela, 83 m² construidos. Habitación infantil (12,50 m²), dormitorio principal (15,65 m²), cocina abierta (15,21 m²), salón (20,92 m²), baños y aseo visitas.",
    f4pp: "Villa F4 Planta Baja: 225 m² parcela, 106 m² construidos. Habitación infantil, dormitorio principal, habitación invitados, cocina, salón de doble altura, baños completos.",
    f4duplex: "Villa F4 Dúplex: 225 m² parcela, 232 m² en 2 niveles. PB: habitación invitados (18,24 m²), cocina (13,98 m²), salón (58,80 m²). Piso: habitación infantil, dormitorio principal, terraza (40 m²).",
    f5: "Villa F5 Premium: 225 m² parcela, 340 m² construidos. Master Room (20 m²) con vestidor (4 m²) y baño (4,20 m²), mármol Calacatta, salón (58,80 m²), terraza principal (66,52 m²) con barbacoa y cocina africana.",
    architecture: "Filosofía arquitectónica: Optimización funcional, Fluidez de circulaciones, Valorización de la luz natural. Arquitectura Tropical Contemporánea. Materiales nobles: madera maciza, piedra natural, mármol Calacatta.",
    amenities: "Ciudad Yaye Dia: complejo deportivo, campo polideportivo, zona infantil, mezquita, centro comercial, distrito sanitario. Alumbrado 100% solar, red de saneamiento completa.",
    lotissement: "Urbanización Yaye Dia: parcelas 225 m², vías amplias, alumbrado solar 24/7, saneamiento integrado, gestión de residuos. Un proyecto urbano estructurado.",
    services: "6 servicios: Gestión inmobiliaria, Desarrollo de proyectos, Estructuración financiera, Infraestructura pública, Agricultura y Tecnología, Energía renovable.",
    partners: "Socios mundiales: Turquía, China, Rusia, EE.UU., Malasia, Reino Unido. Presencia en 11 países africanos.",
    invest: "Capacidad inversión: Proyectos Estado $50M-$6B, Público/Privado $30M-$450M, Privado $3M-$20M.",
    africa: "África: 23% superficie terrestre, 24,3% tierras agrícolas, 90% reservas platino, 30% recursos solares mundiales.",
    price: "Para precios detallados, contáctenos en WhatsApp: +221 77 939 84 84.",
    reservation: "Para reservar, vaya a 'Proyectos' y complete el formulario. También puede llamar al +221 77 939 84 84.",
    contact: "WhatsApp: +221 77 939 84 84. Email: groupendoyeafricaholding@gmail.com. Oficina: Cité Baobab, Senegal.",
    immo: "El mercado inmobiliario en Senegal está en pleno auge. La Residencia Yaye Dia ofrece villas de alto standing en 225 m² con todas las comodidades modernas.",
    offsite: "Esta pregunta parece estar fuera de nuestras actividades. Contáctenos en WhatsApp: +221 77 939 84 84.",
    thanks: "¡Gracias por su confianza! En Groupe Ndoye Africa Holding hacemos todo para ofrecerle un servicio excepcional.",
  },
  de: {
    greet: ["Hallo! Ich bin der intelligente Assistent der Groupe Ndoye Africa Holding. Ich kann Ihnen Informationen über unser Unternehmen, die Yaye Dia Residenz, Dienstleistungen, Partnerschaften oder Investitionsmöglichkeiten in Afrika geben. Wie kann ich Ihnen helfen?"],
    company: "Groupe Ndoye Africa Holding (G.N.A.H) ist seit 2015 auf Projektentwicklung, Infrastruktur, Landwirtschaft, Bau und Immobilien spezialisiert. Hauptsitz: Cité Baobab, Senegal. Über 10 Jahre Erfahrung, 6 weltweite Partner.",
    history: "G.N.A.H existiert seit 2015. In 10 Jahren haben wir ein Netzwerk in 6 Ländern aufgebaut und Projekte in 11 afrikanischen Ländern entwickelt. 2025 feiern wir 10 Jahre Exzellenz.",
    yayedia: "Die Yaye Dia Residenz: 300 hochwertige Villen in der Thiès-Region, Senegal. Jede Villa auf einem 225 m² Grundstück. 4 Typen: F3 Economy (83 m²), F4 einstöckig (106 m²), F4 Duplex (232 m²), F5 Premium (340 m²). Sportkomplex, Spielfeld, Kinderspielbereich, Moschee, Einkaufszentrum und Gesundheitsbezirk.",
    f3: "F3 Economy Villa: 225 m² Grundstück, 83 m² Wohnfläche. Kinderzimmer (12,50 m²), Elternzimmer (15,65 m²), offene Küche (15,21 m²), Wohnzimmer (20,92 m²), Elternbad (3 m²), Kinderbad (2,35 m²), Gäste-WC (2 m²).",
    f4pp: "F4 Einstöckige Villa: 225 m² Grundstück, 106 m² Wohnfläche. Kinderzimmer, Elternzimmer, Gästezimmer, Küche, Wohnzimmer mit doppelter Höhe, vollständige Bäder.",
    f4duplex: "F4 Duplex Villa: 225 m² Grundstück, 232 m² auf 2 Ebenen. EG: Gästezimmer (18,24 m²), Küche (13,98 m²), Wohnzimmer (58,80 m²). OG: Kinderzimmer, Elternzimmer, Terrasse (40 m²).",
    f5: "F5 Premium Villa: 225 m² Grundstück, 340 m² Wohnfläche. Master Room (20 m²) mit Ankleidezimmer (4 m²) und Bad (4,20 m²), Calacatta-Marmor, Wohnzimmer (58,80 m²), Hauptterrasse (66,52 m²) mit Grill und afrikanischer Küche.",
    architecture: "Architektonische Philosophie: Funktionale Optimierung, Fließende Zirkulation, Natürliches Licht. Zeitgenössische tropische Architektur. Edle Materialien: Massivholz, Naturstein, Calacatta-Marmor.",
    amenities: "Yaye Dia Stadt: Sportkomplex, Mehrzweckspielfeld, Kinderspielbereich, Moschee, Einkaufszentrum, Gesundheitsbezirk. 100% Solarbeleuchtung, vollständige Kanalisation.",
    lotissement: "Yaye Dia Erschließung: 225 m² Grundstücke, breite Straßen, 24/7 Solarbeleuchtung, integrierte Kanalisation. Ein strukturiertes Stadtprojekt.",
    services: "6 Leistungen: Immobilienverwaltung, Projektentwicklung, Finanzstrukturierung, Öffentliche Infrastruktur, Landwirtschaft & Technologie, Erneuerbare Energien.",
    partners: "Weltweite Partner: Türkei, China, Russland, USA, Malaysia, Vereinigtes Königreich. Tätig in 11 afrikanischen Ländern.",
    invest: "Investitionskapazität: Staatliche Projekte $50M-$6Mrd, Öffentlich-Privat $30M-$450M, Privat $3M-$20M.",
    africa: "Afrika: 23% der Erdoberfläche, 24,3% der Agrarfläche, 90% der Platinreserven, 30% der weltweiten Solarressourcen.",
    price: "Für detaillierte Preise kontaktieren Sie uns per WhatsApp: +221 77 939 84 84.",
    reservation: "Um zu buchen, gehen Sie zu 'Projekte' und füllen Sie das Formular aus. Sie können uns auch unter +221 77 939 84 84 erreichen.",
    contact: "WhatsApp: +221 77 939 84 84. E-Mail: groupendoyeafricaholding@gmail.com. Büro: Cité Baobab, Senegal.",
    immo: "Immobilien sind eine sichere langfristige Investition. In Senegal wächst der Markt stark. Yaye Dia Residenz bietet hochwertige Villen auf 225 m² Grundstücken.",
    offsite: "Diese Frage liegt außerhalb unserer Aktivitäten. Bitte kontaktieren Sie uns per WhatsApp: +221 77 939 84 84.",
    thanks: "Danke für Ihr Vertrauen! Bei Groupe Ndoye Africa Holding tun wir alles für einen außergewöhnlichen Service.",
  },
};

function getReply(msg, lang) {
  const m = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const kb = KB[lang] || KB.fr;
  const has = (...w) => w.some(x => m.includes(x));

  if (has('bonjour','salut','hello','hi','hola','guten','hallo','bonsoir','coucou','yo','bonne journee')) return kb.greet[0];
  if (has('merci','thank','gracias','danke','super','parfait','excellent','bravo','bien joue')) return kb.thanks;
  if (has('gnah','entreprise','company','empresa','unternehmen','qui etes','presentez','about','acerca','qui sommes','histoire','2015','fondee','creee','experience','ans')) return kb.company + '\n\n' + kb.history;
  if (has('yaye dia','residence','residencia','residenz','300 villa','programme immobilier','cite yaye') && !has('f3','f4','f5','duplex','plein pied')) return kb.yayedia;
  if (has('f3','economique','economy','economica','economy villa','type f3')) return kb.f3;
  if (has('duplex','f4 dup','villa duplex')) return kb.f4duplex;
  if (has('f4','plein pied','single story','planta baja','einstockig','moyen standing','mid range','f4 plein')) return kb.f4pp;
  if (has('f5','haut standing','premium','tres haut','very high','muy alto','master room','master','dressing','calacatta')) return kb.f5;
  if (has('architecture','architectu','philosophie','open space','plan','surface','bati','conception')) return kb.architecture;
  if (has('materiau','material','bois','marbre','calacatta','couleur','color','finition','noble','luxe','interieur')) return kb.architecture;
  if (has('commodite','amenite','amenity','comodidad','sport','mosquee','mosque','commercial','sante','enfant','enfants','piscine','loisir')) return kb.amenities;
  if (has('lotissement','parcelle','plot','voirie','eclairage','solaire','assainissement','dechet','waste','route')) return kb.lotissement;
  if (has('service','prestation','gestion','infrastructure','energie','renouvelable','agriculture','agri')) return kb.services;
  if (has('partenaire','partner','socio','turquie','turkey','chine','china','russie','russia','usa','malaisie','royaume','uk','mondial','international')) return kb.partners;
  if (has('invest','investir','capital','financement','budget','montant','milliard','million','projet','operation','dabou','abuja','eden','gabon')) return kb.invest;
  if (has('afrique','africa','continent','platine','solaire','ressource','potentiel','grenier')) return kb.africa;
  if (has('prix','tarif','price','cout','combien','how much','cuanto','preis','payer','cout')) return kb.price;
  if (has('reserver','reserv','book','reservar','buchen','acheter','buy','comprar','kaufen','commande')) return kb.reservation;
  if (has('contact','contacter','joindre','telephone','email','adresse','bureau','whatsapp','numero','appeler')) return kb.contact;
  if (has('immobilier','real estate','bienes raices','immobilien','maison','appartement','logement','terrain','achat','vente','location','loyer')) return kb.immo;
  return kb.offsite;
}

const RobotSVG = ({ size=24, color='currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="22" width="5" height="10" rx="2.5" fill={color} opacity=".7"/>
    <rect x="38" y="22" width="5" height="10" rx="2.5" fill={color} opacity=".7"/>
    <rect x="10" y="14" width="28" height="22" rx="5" fill="none" stroke={color} strokeWidth="2.2"/>
    <line x1="24" y1="14" x2="24" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="5.5" r="2.5" fill={color}/>
    <circle cx="18" cy="23" r="3.5" fill={color}/>
    <circle cx="30" cy="23" r="3.5" fill={color}/>
    <circle cx="19.2" cy="22" r="1.2" fill="white"/>
    <circle cx="31.2" cy="22" r="1.2" fill="white"/>
    <path d="M17 31.5 Q24 36 31 31.5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="17" y="36" width="14" height="8" rx="3" fill="none" stroke={color} strokeWidth="2.2"/>
    <circle cx="21" cy="40" r="1.3" fill={color} opacity=".6"/>
    <circle cx="24" cy="40" r="1.3" fill={color} opacity=".6"/>
    <circle cx="27" cy="40" r="1.3" fill={color} opacity=".6"/>
    <line x1="17" y1="44" x2="15" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="31" y1="44" x2="33" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WASvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function FloatingButtons() {
  const { lang } = useLang();
  const [open, setOpen]   = useState(false);
  const [msgs, setMsgs]   = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const kb = KB[lang] || KB.fr;
    setMsgs([{ from:'bot', text: kb.greet[0] }]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [msgs, typing]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMsgs(p => [...p, { from:'user', text:txt }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(txt, lang);
      setTyping(false);
      setMsgs(p => [...p, { from:'bot', text:reply }]);
    }, 700 + Math.random()*500);
  };

  const quickQ = {
    fr: ['Résidence Yaye Dia','Nos services','Investir','Contact'],
    en: ['Yaye Dia Residence','Our services','Invest','Contact'],
    es: ['Residencia Yaye Dia','Nuestros servicios','Invertir','Contacto'],
    de: ['Yaye Dia Residenz','Unsere Dienste','Investieren','Kontakt'],
  };

  const sendQuick = (q) => {
    setMsgs(p => [...p, { from:'user', text:q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { from:'bot', text: getReply(q, lang) }]);
    }, 600);
  };

  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(typeof SITE.waMsg === 'object' ? (SITE.waMsg[lang]||SITE.waMsg.fr) : SITE.waMsg)}`;
  const ph = { fr:'Posez votre question...', en:'Ask your question...', es:'Haga su pregunta...', de:'Ihre Frage...' };
  const titles = { fr:'Assistant GNAH', en:'GNAH Assistant', es:'Asistente GNAH', de:'GNAH-Assistent' };
  const online = { fr:'En ligne', en:'Online', es:'En línea', de:'Online' };

  return (
    <>
      {open && (
        <div className="ai-chat">
          <div className="ai-header">
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ color:'var(--navy)' }}><RobotSVG size={28} color="var(--navy)"/></div>
              <div>
                <div className="ai-header-title">{titles[lang]||titles.fr}</div>
                <div style={{ fontSize:'.54rem', color:'rgba(5,8,16,.55)', fontFamily:'var(--f-body)', marginTop:1 }}>
                  <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#16a34a', marginRight:4, verticalAlign:'middle' }}/>
                  {online[lang]||online.fr}
                </div>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)} aria-label="Fermer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="ai-msgs">
            {msgs.map((m,i) => (
              <div key={i} className={`ai-msg ${m.from}`} style={{ whiteSpace:'pre-line' }}>{m.text}</div>
            ))}
            {typing && (
              <div className="ai-msg bot" style={{ display:'flex', gap:4, padding:'10px 14px' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width:7, height:7, background:'var(--gold)', borderRadius:'50%', display:'inline-block', animation:`dotB .9s ${i*.18}s ease-in-out infinite` }}/>
                ))}
              </div>
            )}
            <div ref={endRef}/>
          </div>

          <div className="ai-input-row">
            <input className="ai-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder={ph[lang]||ph.fr} disabled={typing}/>
            <button className="ai-send" onClick={send} disabled={typing||!input.trim()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>

          <div style={{ padding:'7px 12px', borderTop:'var(--border-gold)', display:'flex', gap:5, flexWrap:'wrap' }}>
            {(quickQ[lang]||quickQ.fr).map((q,i) => (
              <button key={i} onClick={() => sendQuick(q)}
                style={{ padding:'4px 9px', background:'rgba(201,168,76,.1)', border:'1px solid rgba(201,168,76,.22)', color:'var(--gold)', fontFamily:'var(--f-display)', fontSize:'.54rem', letterSpacing:'.07em', cursor:'pointer', transition:'background .2s', borderRadius:2 }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(201,168,76,.2)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(201,168,76,.1)'}
              >{q}</button>
            ))}
          </div>
        </div>
      )}

      <div className="float-ai">
        <button className="float-btn float-btn-ai" onClick={() => setOpen(o=>!o)} title={titles[lang]||titles.fr}>
          <RobotSVG size={26} color="var(--gold)"/>
        </button>
      </div>

      <div className="float-wa">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="float-btn float-btn-wa" title="WhatsApp">
          <WASvg/>
        </a>
      </div>

      <style>{`@keyframes dotB{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </>
  );
}
