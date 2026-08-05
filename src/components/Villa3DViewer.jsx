import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour les murs de la villa
function VillaWalls({ color, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Corps principal - Base rectangulaire */}
      <mesh 
        position={[0, 0.5, 0]}
        onPointerOver={() => { setHovered(true); onHover(true); }}
        onPointerOut={() => { setHovered(false); onHover(false); }}
      >
        <boxGeometry args={[3, 1.2, 2.5]} />
        <meshStandardMaterial 
          color={hovered ? '#e8c96a' : '#c9a84c'}
          metalness={0.3}
          roughness={0.4}
          emissive={hovered ? '#e8c96a' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Toit */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[2.2, 0.8, 4]} />
        <meshStandardMaterial color="#8b6914" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Fenêtres */}
      <Window position={[-0.8, 0.6, 1.26]} />
      <Window position={[0.8, 0.6, 1.26]} />
      <Window position={[0, 0.6, 1.26]} size={0.4} />
      
      {/* Fenêtres latérales */}
      <Window position={[-1.26, 0.6, -0.5]} rotation={[0, Math.PI/2, 0]} />
      <Window position={[1.26, 0.6, 0.5]} rotation={[0, -Math.PI/2, 0]} />

      {/* Porte */}
      <Door position={[0, 0.3, -1.26]} />

      {/* Balcon */}
      <mesh position={[0, 0.9, -1.1]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[-0.6, 0.9, -1.1]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.05, 0.3, 0.4]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.6, 0.9, -1.1]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.05, 0.3, 0.4]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Window({ position, size = 0.35, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cadre de la fenêtre */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[size, size, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#4a90d9" emissiveIntensity={0.2} />
      </mesh>
      {/* Vitre */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[size * 0.85, size * 0.85, 0.01]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.6}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Croix */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[size * 0.85, 0.02, 0.01]} />
        <meshStandardMaterial color="#c9a84c" />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.02, size * 0.85, 0.01]} />
        <meshStandardMaterial color="#c9a84c" />
      </mesh>
    </group>
  );
}

function Door({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#5a3a1a" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Poignée */}
      <mesh position={[0.15, 0.3, 0.03]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#e8c96a" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Composant principal du viewer 3D
export default function Villa3DViewer({ villa, isMob, waUrl, tl }) {
  const [hovered, setHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  const color = villa.color || '#c9a84c';

  return (
    <div style={{ 
      width: '100%', 
      height: isMob ? '400px' : '550px', 
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'var(--navy)',
      border: '1px solid rgba(201,168,76,0.15)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
    }}>
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#e8c96a" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />
        
        <VillaWalls 
          color={color} 
          onHover={setHovered} 
        />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          minDistance={2}
          maxDistance={10}
          rotateSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
        />
        
        <Environment preset="sunset" />
      </Canvas>
      
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
          onClick={() => {
            if (controlsRef.current) {
              controlsRef.current.reset();
            }
          }}
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
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '12px 18px',
          background: 'rgba(5,8,16,0.85)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '8px',
          color: 'var(--cream)',
          fontSize: '.7rem',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
           Villa Haut Standing
        </div>
      )}
    </div>
  );
}
