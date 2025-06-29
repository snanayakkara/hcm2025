import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Heart3DProps {
  scrollY: number;
}

const HeartGeometry: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += 0.01;
      
      // Additional rotation based on scroll
      const scrollRotation = scrollY * 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + scrollRotation * 0.5;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={0.8}>
      <MeshDistortMaterial
        color="#f43f5e"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
};

const Heart3D: React.FC<Heart3DProps> = ({ scrollY }) => {
  return (
    <div className="w-10 h-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <HeartGeometry scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Heart3D;