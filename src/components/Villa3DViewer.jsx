import React, { useState, useRef, useEffect } from 'react';

export default function Villa3DViewer({ villa, isMob }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startRot, setStartRot] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);
  const [viewMode, setViewMode] = useState('exterior');
  const containerRef = useRef(null);
  const color = villa.color || '#c9a84c';

  // Structure des images par type de villa (chemins depuis /public)
  const villaImages = {
    F4: {
      exterior: [
        { 
          label: 'Façade avant', 
          url: '/Images/yaye-dia/villa-f4duplex.jpg',
          desc: 'Villa F4 Duplex - Vue principale'
        },
        { 
          label: 'Façade de nuit', 
          url: '/Images/yaye-dia/villa-f4duplex-nuit.jpg',
          desc: 'Villa F4 Duplex - Illumination nocturne'
        },
        { 
          label: 'Plein pied', 
          url: '/Images/yaye-dia/villa-f4-plein-pied.jpg',
          desc: 'Villa F4 - Vue plein pied'
        },
        { 
          label: 'Façade PP', 
          url: '/Images/yaye-dia/villa-f4pp-facade.jpg',
          desc: 'Villa F4 - Façade principale'
        },
        { 
          label: 'Vue générale', 
          url: '/Images/yaye-dia/villa-f4pp.jpg',
          desc: 'Villa F4 - Vue d\'ensemble'
        },
        { 
          label: 'Plan 3D', 
          url: '/Images/yaye-dia/villa-f4pp-plan2.jpg',
          desc: 'Villa F4 - Plan d\'architecture'
        }
      ],
      interior: [
        { 
          label: 'Salon', 
          url: '/Images/yaye-dia/salon-f4.jpg',
          desc: 'Salon spacieux et lumineux'
        },
        { 
          label: 'Salon intérieur', 
          url: '/Images/yaye-dia/salon-f4-interieur.jpg',
          desc: 'Intérieur salon de luxe'
        },
        { 
          label: 'Plan F4', 
          url: '/Images/yaye-dia/villa-f4pp-plan3.jpg',
          desc: 'Plan d\'architecture détaillé'
        },
        { 
          label: 'Cuisine', 
          url: '/Images/yaye-dia/cuisine-luxe.jpg',
          desc: 'Cuisine moderne équipée'
        },
        { 
          label: 'Design intérieur', 
          url: '/Images/yaye-dia/design.jpg',
          desc: 'Design d\'intérieur contemporain'
        },
        { 
          label: 'Vision', 
          url: '/Images/yaye-dia/vision.jpg',
          desc: 'Vision architecturale'
        }
      ]
    },
    F5: {
      exterior: [
        { 
          label: 'Façade avant', 
          url: '/Images/yaye-dia/villa-f5-facade3.jpg',
          desc: 'Villa F5 - Façade principale'
        },
        { 
          label: 'Terrasse', 
          url: '/Images/yaye-dia/villa-f5-terrasse.jpg',
          desc: 'Terrasse panoramique'
        },
        { 
          label: 'Plan terrasse', 
          url: '/Images/yaye-dia/villa-f5-terrasse-plan.jpg',
          desc: 'Plan de la terrasse'
        },
        { 
          label: 'Vue aérienne', 
          url: '/Images/yaye-dia/villa-f5-plan-aerien.jpg',
          desc: 'Vue aérienne de la villa'
        },
        { 
          label: 'Architecture', 
          url: '/Images/yaye-dia/architecture.jpg',
          desc: 'Architecture moderne'
        },
        { 
          label: 'Modèle 3D', 
          url: '/Images/yaye-dia/architecture-model-villa.jpg',
          desc: 'Modèle 3D de la villa'
        }
      ],
      interior: [
        { 
          label: 'Salon', 
          url: '/Images/yaye-dia/design.jpg',
          desc: 'Salon design'
        },
        { 
          label: 'Cuisine', 
          url: '/Images/yaye-dia/cuisine-luxe.jpg',
          desc: 'Cuisine haut de gamme'
        },
        { 
          label: 'Salle de bain', 
          url: '/Images/yaye-dia/cadre-vie.jpg',
          desc: 'Salle de bain luxueuse'
        },
        { 
          label: 'Intérieur', 
          url: '/Images/yaye-dia/salon-f4-interieur.jpg',
          desc: 'Intérieur contemporain'
        },
        { 
          label: 'Vision', 
          url: '/Images/yaye-dia/vision.jpg',
          desc: 'Vision architecturale'
        },
        { 
          label: 'Plan', 
          url: '/Images/yaye-dia/villa-f5-terrasse-plan.jpg',
          desc: 'Plan d\'architecture'
        }
      ]
    },
    F6: {
      exterior: [
        { 
          label: 'Vue aérienne', 
          url: '/Images/yaye-dia/cite-vue-aerienne.jpg',
          desc: 'Vue aérienne de la cité'
        },
        { 
          label: 'Voirie', 
          url: '/Images/yaye-dia/cite-voirie.jpg',
          desc: 'Aménagement de la voirie'
        },
        { 
          label: 'Commodités', 
          url: '/Images/yaye-dia/cite-commodites-vue.jpg',
          desc: 'Commodités à proximité'
        },
        { 
          label: 'Modèle 3D', 
          url: '/Images/yaye-dia/cite-yaye-dia-3D.jpg',
          desc: 'Modèle 3D de la cité'
        },
        { 
          label: 'Architecture', 
          url: '/Images/yaye-dia/architecture-model-villa.jpg',
          desc: 'Architecture de la cité'
        },
        { 
          label: 'Immeuble jour', 
          url: '/Images/yaye-dia/immeuble-jour.jpg',
          desc: 'Immeuble en journée'
        }
      ],
      interior: [
        { 
          label: 'Éclairage', 
          url: '/Images/yaye-dia/eclairage.jpg',
          desc: 'Éclairage d\'ambiance'
        },
        { 
          label: 'Gestion déchet', 
          url: '/Images/yaye-dia/gestion-dechet.jpg',
          desc: 'Gestion des déchets'
        },
        { 
          label: 'Philosophie', 
          url: '/Images/yaye-dia/philosophie.jpg',
          desc: 'Philosophie architecturale'
        },
        { 
          label: 'Lotissement', 
          url: '/Images/yaye-dia/lotissement.jpg',
          desc: 'Plan de lotissement'
        },
        { 
          label: 'Plan 3D', 
          url: '/Images/yaye-dia/plan-3D.jpg',
          desc: 'Plan 3D de la cité'
        },
        { 
          label: 'Vue de nuit', 
          url: '/Images/yaye-dia/immeuble-nuit.jpg',
          desc: 'Immeuble illuminé de nuit'
        }
      ]
    }
  };

  // Images par défaut si le type n'existe pas
  const defaultData = {
    exterior: [
      { label: 'Façade', url: '/Images/yaye-dia/villa-f4duplex.jpg', desc: 'Villa de luxe' },
      { label: 'Architecture', url: '/Images/yaye-dia/architecture.jpg', desc: 'Architecture moderne' },
      { label: 'Design', url: '/Images/yaye-dia/design.jpg', desc: 'Design contemporain' },
      { label: 'Vision', url: '/Images/yaye-dia/vision.jpg', desc: 'Vision architecturale' },
      { label: 'Plan 3D', url: '/Images/yaye-dia/plan-3D.jpg', desc: 'Plan 3D' },
      { label: 'Modèle', url: '/Images/yaye-dia/architecture-model-villa.jpg', desc: 'Modèle 3D' }
    ],
    interior: [
      { label: 'Salon', url: '/Images/yaye-dia/salon-f4.jpg', desc: 'Salon de luxe' },
      { label: 'Cuisine', url: '/Images/yaye-dia/cuisine-luxe.jpg', desc: 'Cuisine équipée' },
      { label: 'Intérieur', url: '/Images/yaye-dia/salon-f4-interieur.jpg', desc: 'Intérieur raffiné' },
      { label: 'Design', url: '/Images/yaye-dia/design.jpg', desc: 'Design intérieur' },
      { label: 'Vision', url: '/Images/yaye-dia/vision.jpg', desc: 'Vision d\'intérieur' },
      { label: 'Plan', url: '/Images/yaye-dia/plan-3D.jpg', desc: 'Plan intérieur' }
    ]
  };

  const data = villaImages[villa.id] || defaultData;
  const currentData = viewMode === 'exterior' ? data.exterior : data.interior;
  const totalFaces = currentData.length;

  // Auto-rotation
  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentFace(prev => (prev + 1) % totalFaces);
        setRotation(prev => ({
          ...prev,
          y: prev.y + 60
        }));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [autoRotate, totalFaces]);

  // Gestion du drag souris
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartRot({ x: rotation.x, y: rotation.y });
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    const newY = startRot.y + deltaX * 0.5;
    const newX = startRot.x + deltaY * 0.5;
    setRotation({ x: Math.max(-30, Math.min(30, newX)), y: newY });
    
    const faceIndex = Math.round((newY % 360) / 60);
    setCurrentFace(((faceIndex % totalFaces) + totalFaces) % totalFaces);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setAutoRotate(true);
    }, 3000);
  };

  // Gestion tactile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setStartRot({ x: rotation.x, y: rotation.y });
    setAutoRotate(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    const newY = startRot.y + deltaX * 0.5;
    const newX = startRot.x + deltaY * 0.5;
    setRotation({ x: Math.max(-30, Math.min(30, newX)), y: newY });
    
    const faceIndex = Math.round((newY % 360) / 60);
    setCurrentFace(((faceIndex % totalFaces) + totalFaces) % totalFaces);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setAutoRotate(true);
    }, 3000);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setCurrentFace(0);
    setAutoRotate(true);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'exterior' ? 'interior' : 'exterior');
    setCurrentFace(0);
    setRotation({ x: 0, y: 0 });
    setAutoRotate(true);
  };

  const goToFace = (index) => {
    setCurrentFace(index);
    setRotation({ x: 0, y: index * 60 });
    setAutoRotate(false);
    setTimeout(() => setAutoRotate(true), 3000);
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: isMob ? '400px' : '550px', 
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--navy)',
        border: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mode actuel - Extérieur/Intérieur */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: 8,
        background: 'rgba(5,8,16,0.8)',
        padding: '4px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(201,168,76,0.15)'
      }}>
        <button
          onClick={() => {
            setViewMode('exterior');
            setCurrentFace(0);
            setRotation({ x: 0, y: 0 });
            setAutoRotate(true);
          }}
          style={{
            padding: '6px 14px',
            background: viewMode === 'exterior' ? 'rgba(201,168,76,0.25)' : 'transparent',
            border: viewMode === 'exterior' ? '1px solid rgba(201,168,76,0.3)' : 'none',
            borderRadius: '6px',
            color: viewMode === 'exterior' ? 'var(--gold)' : 'rgba(200,195,186,0.5)',
            fontFamily: 'var(--f-display)',
            fontSize: '.5rem',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all .3s'
          }}
        >
          🏠 Extérieur
        </button>
        <button
          onClick={() => {
            setViewMode('interior');
            setCurrentFace(0);
            setRotation({ x: 0, y: 0 });
            setAutoRotate(true);
          }}
          style={{
            padding: '6px 14px',
            background: viewMode === 'interior' ? 'rgba(201,168,76,0.25)' : 'transparent',
            border: viewMode === 'interior' ? '1px solid rgba(201,168,76,0.3)' : 'none',
            borderRadius: '6px',
            color: viewMode === 'interior' ? 'var(--gold)' : 'rgba(200,195,186,0.5)',
            fontFamily: 'var(--f-display)',
            fontSize: '.5rem',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all .3s'
          }}
        >
          🪑 Intérieur
        </button>
      </div>

      {/* Conteneur 3D avec perspective */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}>
        
        <div style={{
          width: '300px',
          height: '300px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          
          {/* 6 faces du cube */}
          {currentData.map((face, index) => {
            const rotations = [
              [0, 0, 150],
              [0, 90, 150],
              [0, -90, 150],
              [0, 180, 150],
              [90, 0, 150],
              [-90, 0, 150]
            ];
            const [rx, ry, tz] = rotations[index] || [0, 0, 150];
            
            return (
              <div
                key={index}
                onClick={() => goToFace(index)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${face.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  boxShadow: 'inset 0 0 50px rgba(0,0,0,0.4), 0 0 30px rgba(201,168,76,0.05)',
                  transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`,
                  border: currentFace === index ? '2px solid var(--gold)' : '2px solid rgba(201,168,76,0.1)',
                  transition: 'border 0.4s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                  cursor: 'pointer',
                  opacity: 1
                }}
              >
                {/* Overlay avec label */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '10px 14px',
                  background: 'linear-gradient(to top, rgba(5,8,16,0.9), transparent)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--f-display)',
                  fontSize: '.6rem',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  borderRadius: '0 0 6px 6px'
                }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--gold)' }}>{face.label}</div>
                  <div style={{ fontSize: '.5rem', opacity: 0.6, fontStyle: 'italic' }}>{face.desc}</div>
                </div>

                {/* Indicateur de face active */}
                {currentFace === index && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 15px rgba(201,168,76,0.6)'
                  }} />
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Navigation par miniatures */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        zIndex: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '90%'
      }}>
        {currentData.map((_, i) => (
          <button
            key={i}
            onClick={() => goToFace(i)}
            style={{
              width: i === currentFace ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === currentFace ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: i === currentFace ? '0 0 12px rgba(201,168,76,0.4)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Contrôles */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        zIndex: 10
      }}>
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            padding: '8px 16px',
            background: autoRotate ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: 'var(--cream)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'var(--f-display)',
            fontSize: '.5rem',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            transition: 'all .3s'
          }}
        >
          {autoRotate ? '⏸ Pause' : '▶ Rotation'}
        </button>
        <button 
          onClick={resetView}
          style={{
            padding: '8px 16px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--cream)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'var(--f-display)',
            fontSize: '.5rem',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            transition: 'all .3s'
          }}
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Info-bulle */}
      <div style={{
        position: 'absolute',
        top: 70,
        left: 16,
        padding: '6px 12px',
        background: 'rgba(5,8,16,0.7)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '6px',
        color: 'rgba(201,168,76,0.6)',
        fontSize: '.5rem',
        fontFamily: 'var(--f-display)',
        letterSpacing: '.08em',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        🖱 {isMob ? 'Toucher' : 'Glisser'} pour explorer
      </div>

      {/* Compteur */}
      <div style={{
        position: 'absolute',
        top: 70,
        right: 16,
        padding: '4px 12px',
        background: 'rgba(5,8,16,0.7)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '6px',
        color: 'var(--gold)',
        fontSize: '.5rem',
        fontFamily: 'var(--f-display)',
        letterSpacing: '.05em',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        {currentFace + 1} / {totalFaces}
      </div>

      {/* Effet de brillance */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
    </div>
  );
          }
