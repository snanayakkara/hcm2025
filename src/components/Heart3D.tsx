import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Use public path for GLB file
const heartModelUrl = '/heartmodel.glb';

interface Heart3DProps {
  scrollY: number;
}

const HeartModel: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(heartModelUrl);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((mat) => {
          (mat as THREE.MeshStandardMaterial).color = new THREE.Color('#14b8a6');
        });
      }
    });
  }, [gltf.scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      const scrollRotation = scrollY * 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + scrollRotation * 0.5;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return <primitive ref={groupRef} object={gltf.scene} scale={0.8} />;
};

const Heart3D: React.FC<Heart3DProps> = ({ scrollY }) => {
  return (
    <div className="w-10 h-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <Suspense fallback={null}>
          <HeartModel scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Heart3D;