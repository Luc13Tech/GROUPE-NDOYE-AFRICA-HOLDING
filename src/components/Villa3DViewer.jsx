import React, { useState, useRef, useEffect } from 'react';

export default function Villa3DViewer({ villa, isMob }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startRot, setStartRot] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef(null);
  const color = villa.color || '#c9a84c';

  // Auto-rotation
  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.3
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoRotate]);

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
    setRotation({
      x: startRot.x + deltaY * 0.5,
      y: startRot.y + deltaX * 0.5
    });
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
    setRotation({
      x: startRot.x + deltaY * 0.5,
      y: startRot.y + deltaX * 0.5
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setAutoRotate(true);
    }, 3000);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
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
        perspective: '1000px',
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
      {/* Conteneur 3D avec rotation */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
        transformStyle: 'preserve-3d'
      }}>
        {/* Villa en 3D CSS */}
        <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '200px', height: '280px' }}>
          
          {/* Corps principal */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '140px',
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            borderRadius: '2px 2px 8px 8px',
            boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* Fenêtres */}
            <div style={{ position: 'absolute', top: '20px', left: '12px', width: '30px', height: '35px', background: 'rgba(135,206,235,0.4)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: '2px' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.3)' }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '12px', width: '30px', height: '35px', background: 'rgba(135,206,235,0.4)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: '2px' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.3)' }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '25px', height: '30px', background: 'rgba(135,206,235,0.4)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: '2px' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.3)' }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(201,168,76,0.3)' }} />
            </div>
            {/* Porte */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '28px', height: '40px', background: '#5a3a1a', border: '2px solid rgba(201,168,76,0.4)', borderBottom: 'none', borderRadius: '2px 2px 0 0' }}>
              <div style={{ position: 'absolute', right: '4px', top: '50%', width: '4px', height: '4px', borderRadius: '50%', background: '#e8c96a' }} />
            </div>
            {/* Balcon */}
            <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '3px', background: '#c9a84c', borderRadius: '1px' }} />
          </div>
          
          {/* Toit */}
          <div style={{
            position: 'absolute',
            bottom: '140px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '95px solid transparent',
            borderRight: '95px solid transparent',
            borderBottom: '60px solid #8b6914',
            filter: 'drop-shadow(0 -4px 8px rgba(0,0,0,0.2))'
          }} />

          {/* Lumières dorées */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        </div>
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
        🖱 Glisser pour tourner
      </div>

      {/* Effet de brillance */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
    </div>
  );
                         }
