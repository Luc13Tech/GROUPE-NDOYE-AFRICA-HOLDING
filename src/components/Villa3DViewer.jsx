import React, { useState, useRef, useEffect } from 'react';

export default function Villa3DViewer({ villa, isMob }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startRot, setStartRot] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);
  const [viewMode, setViewMode] = useState('exterior'); // 'exterior' | 'interior'
  const containerRef = useRef(null);
  const color = villa.color || '#c9a84c';

  // Pour chaque type de villa, on définit les 6 faces (extérieur) + intérieur
  const villaData = {
    F4: {
      name: 'Villa F4 Duplex',
      exterior: [
        { 
          label: 'Façade avant', 
          url: /public/Images/yaye-dia/villa-f4duplex.jpg ,
          desc: 'Entrée principale avec jardin'
        },
        { 
          label: 'Côté droit', 
          url: /public/Images/yaye-dia/villa-f4duplex-nuit.jpg ,
          desc: 'Vue latérale avec piscine'
        },
        { 
          label: 'Côté gauche', 
          url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
          desc: 'Terrasse et jardin paysager'
        },
        { 
          label: 'Façade arrière', 
          url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
          desc: 'Arrière-cour avec vue sur la nature'
        },
        { 
          label: 'Vue du dessus', 
          url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
          desc: 'Vue aérienne de la propriété'
        },
        { 
          label: 'Vue de nuit', 
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
          desc: 'Illumination nocturne'
        }
      ],
      interior: [
        { 
          label: 'Salon', 
          url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
          desc: 'Salon spacieux avec vue sur jardin'
        },
        { 
          label: 'Cuisine', 
          url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
          desc: 'Cuisine moderne équipée'
        },
        { 
          label: 'Chambre', 
          url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
          desc: 'Chambre principale avec suite'
        },
        { 
          label: 'Salle de bain', 
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
          desc: 'Salle de bain luxueuse'
        },
        { 
          label: 'Terrasse', 
          url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
          desc: 'Terrasse avec vue panoramique'
        },
        { 
          label: 'Piscine', 
          url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
          desc: 'Piscine à débordement'
        }
      ]
    },
    F5: {
      name: 'Villa F5 Prestige',
      exterior: [
        { 
          label: 'Façade avant', 
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
          desc: 'Entrée majestueuse'
        },
        { 
          label: 'Côté droit', 
          url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
          desc: 'Jardin et piscine'
        },
        { 
          label: 'Côté gauche', 
          url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
          desc: 'Terrasse couverte'
        },
        { 
          label: 'Façade arrière', 
          url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
          desc: 'Vue sur le parc'
        },
        { 
          label: 'Vue du dessus', 
          url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
          desc: 'Vue aérienne'
        },
        { 
          label: 'Vue de nuit', 
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
          desc: 'Éclairage d\'ambiance'
        }
      ],
      interior: [
        { 
          label: 'Salon', 
          url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
          desc: 'Salon double hauteur'
        },
        { 
          label: 'Cuisine', 
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
          desc: 'Cuisine américaine'
        },
        { 
          label: 'Chambre', 
          url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
          desc: 'Suite parentale'
        },
        { 
          label: 'Salle de bain', 
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
          desc: 'Spa intégré'
        },
        { 
          label: 'Terrasse', 
          url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
          desc: 'Terrasse panoramique'
        },
        { 
          label: 'Piscine', 
          url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
          desc: 'Piscine chauffée'
        }
      ]
    },
    F6: {
      name: 'Villa F6 Luxe',
      exterior: [
        { 
          label: 'Façade avant', 
          url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
          desc: 'Entrée principale'
        },
        { 
          label: 'Côté droit', 
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
          desc: 'Jardin luxuriant'
        },
        { 
          label: 'Côté gauche', 
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
          desc: 'Cour intérieure'
        },
        { 
          label: 'Façade arrière', 
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
          desc: 'Vue sur jardin'
        },
        { 
          label: 'Vue du dessus', 
          url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
          desc: 'Vue satellite'
        },
        { 
          label: 'Vue de nuit', 
          url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
          desc: 'Illumination'
        }
      ],
      interior: [
        { 
          label: 'Salon', 
          url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
          desc: 'Salon contemporain'
        },
        { 
          label: 'Cuisine', 
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
          desc: 'Cuisine design'
        },
        { 
          label: 'Chambre', 
          url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
          desc: 'Chambre luxueuse'
        },
        { 
          label: 'Salle de bain', 
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
          desc: 'Salle de bain moderne'
        },
        { 
          label: 'Terrasse', 
          url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
          desc: 'Terrasse lounge'
        },
        { 
          label: 'Piscine', 
          url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
          desc: 'Piscine à débordement'
        }
      ]
    }
  };

  // Données par défaut si le type n'existe pas
  const defaultData = {
    exterior: Array(6).fill(null).map((_, i) => ({
      label: `Vue ${i + 1}`,
      url: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80`,
      desc: `Vue ${i + 1} de la villa`
    })),
    interior: Array(6).fill(null).map((_, i) => ({
      label: `Intérieur ${i + 1}`,
      url: `https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80`,
      desc: `Intérieur ${i + 1}`
    }))
  };

  const data = villaData[villa.id] || defaultData;
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
      {/* Mode actuel */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: 8,
        background: 'rgba(5,8,16,0.7)',
        padding: '4px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(201,168,76,0.15)'
      }}>
        <button
          onClick={() => setViewMode('exterior')}
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
          onClick={() => setViewMode('interior')}
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
              [0, 0, 150], // avant
              [0, 90, 150], // droite
              [0, -90, 150], // gauche
              [0, 180, 150], // arrière
              [90, 0, 150], // dessus
              [-90, 0, 150] // dessous
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
                  boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3), 0 0 30px rgba(201,168,76,0.05)',
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
                  background: 'linear-gradient(to top, rgba(5,8,16,0.85), transparent)',
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
        {currentData.map((face, i) => (
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
