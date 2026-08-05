import React, { useState, useRef, useEffect } from 'react';

export default function Villa3DViewer({ villa, isMob }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startRot, setStartRot] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);
  const containerRef = useRef(null);
  const color = villa.color || '#c9a84c';

  // Images réelles de villas par type
  const villaImages = {
    F4: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    F5: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    F6: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    ],
  };

  // Images par défaut si le type n'existe pas
  const defaultImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  ];

  const images = villaImages[villa.id] || defaultImages;
  const totalFaces = images.length;

  // Auto-rotation avec changement de face
  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentFace(prev => (prev + 1) % totalFaces);
        setRotation(prev => ({
          ...prev,
          y: prev.y + 60
        }));
      }, 3000);
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
    
    // Mettre à jour la face en fonction de la rotation
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
        
        {/* Cube rotatif avec les images */}
        <div style={{
          width: '300px',
          height: '300px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          
          {/* Face avant */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Façade avant
            </div>
          </div>

          {/* Face arrière */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[3]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'rotateY(180deg) translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Façade arrière
            </div>
          </div>

          {/* Face droite */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[1]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'rotateY(90deg) translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Côté droit
            </div>
          </div>

          {/* Face gauche */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[2]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'rotateY(-90deg) translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Côté gauche
            </div>
          </div>

          {/* Face supérieure */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[4]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'rotateX(90deg) translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Vue du dessus
            </div>
          </div>

          {/* Face inférieure */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[5] || images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
            transform: 'rotateX(-90deg) translateZ(150px)',
            border: '2px solid rgba(201,168,76,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(5,8,16,0.8), transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--f-display)',
              fontSize: '.7rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase'
            }}>
              🏠 Vue du dessous
            </div>
          </div>

        </div>
      </div>

      {/* Indicateur de face actuelle */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        zIndex: 10
      }}>
        {images.map((_, i) => (
          <div key={i} style={{
            width: i === currentFace ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: i === currentFace ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
            transition: 'all 0.4s ease'
          }} />
        ))}
      </div>

      {/* Contrôles UI */}
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
        top: 16,
        left: 16,
        padding: '8px 14px',
        background: 'rgba(5,8,16,0.8)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '6px',
        color: 'rgba(201,168,76,0.7)',
        fontSize: '.6rem',
        fontFamily: 'var(--f-display)',
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        🖱 Glisser pour explorer
      </div>

      {/* Indicateur de face sur l'image */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        padding: '6px 12px',
        background: 'rgba(5,8,16,0.7)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '4px',
        color: 'var(--gold)',
        fontSize: '.55rem',
        fontFamily: 'var(--f-display)',
        letterSpacing: '.05em',
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
