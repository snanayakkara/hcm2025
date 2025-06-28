import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  Heart, 
  Activity,
  Volume2,
  VolumeX,
  Settings,
  Eye,
  EyeOff,
  Download,
  Upload
} from 'lucide-react';

interface Heart3DProps {
  className?: string;
  modelUrl?: string; // URL to external heart model
}

interface HeartPart {
  name: string;
  description: string;
  mesh?: THREE.Mesh | THREE.Group;
  originalMaterial?: THREE.Material | THREE.Material[];
  highlightMaterial?: THREE.Material;
}

const Heart3D: React.FC<Heart3DProps> = ({ 
  className = '', 
  modelUrl = null // Can be set to load external models
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const heartGroupRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>();
  const clockRef = useRef<THREE.Clock>();
  const mixerRef = useRef<THREE.AnimationMixer>();

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showBloodFlow, setShowBloodFlow] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [cameraDistance, setCameraDistance] = useState(8);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Heart parts data
  const heartParts = useRef<Map<string, HeartPart>>(new Map());
  const bloodParticles = useRef<THREE.Points>();
  const loadedModel = useRef<THREE.Group>();

  /**
   * Initialize Three.js scene with proper configuration
   */
  const initializeScene = useCallback(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf8fafc);
      sceneRef.current = scene;

      // Camera setup with perspective projection
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, cameraDistance);
      cameraRef.current = camera;

      // Renderer setup with antialiasing and proper pixel ratio
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;

      // Lighting setup
      setupLighting(scene);

      // Initialize raycaster for mouse interaction
      raycasterRef.current = new THREE.Raycaster();
      
      // Initialize clock for animations
      clockRef.current = new THREE.Clock();

      // Mount renderer
      mountRef.current.appendChild(renderer.domElement);

      // Load heart model or create procedural one
      if (modelUrl) {
        loadExternalModel(scene, modelUrl);
      } else {
        createProceduralHeart(scene);
      }

      // Setup event listeners
      setupEventListeners();

    } catch (err) {
      console.error('Failed to initialize 3D scene:', err);
      setError('Failed to initialize 3D visualization. Please check WebGL support.');
      setIsLoading(false);
    }
  }, [cameraDistance, modelUrl]);

  /**
   * Setup comprehensive lighting for realistic rendering
   */
  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Fill light from the opposite side
    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
    fillLight.position.set(-10, -10, -5);
    scene.add(fillLight);

    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0xff6b6b, 0.2);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    // Point light for additional warmth
    const pointLight = new THREE.PointLight(0xffa500, 0.5, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
  };

  /**
   * Load external 3D model (GLTF, GLB, OBJ, etc.)
   */
  const loadExternalModel = async (scene: THREE.Scene, url: string) => {
    try {
      // Dynamic import of GLTFLoader to avoid bundle size issues
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
      
      const loader = new GLTFLoader();
      
      // Setup DRACO compression support
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(dracoLoader);

      // Load the model with progress tracking
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          loadedModel.current = model;

          // Scale and position the model appropriately
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          // Scale to fit in view
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3 / maxDim;
          model.scale.setScalar(scale);
          
          // Center the model
          model.position.sub(center.multiplyScalar(scale));

          // Setup materials and shadows
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Enhance materials for better rendering
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                      mat.envMapIntensity = 0.5;
                      mat.roughness = 0.4;
                      mat.metalness = 0.1;
                    }
                  });
                } else if (child.material instanceof THREE.MeshStandardMaterial) {
                  child.material.envMapIntensity = 0.5;
                  child.material.roughness = 0.4;
                  child.material.metalness = 0.1;
                }
              }

              // Register as selectable heart part
              if (child.name) {
                heartParts.current.set(child.name, {
                  name: child.name.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                  description: `Part of the heart anatomy: ${child.name}`,
                  mesh: child,
                  originalMaterial: child.material,
                  highlightMaterial: new THREE.MeshStandardMaterial({
                    color: 0xff4444,
                    emissive: 0x222222,
                    roughness: 0.3,
                    metalness: 0.2
                  })
                });
              }
            }
          });

          // Setup animations if available
          if (gltf.animations && gltf.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
              const action = mixerRef.current!.clipAction(clip);
              action.play();
            });
          }

          // Add to heart group
          const heartGroup = new THREE.Group();
          heartGroup.add(model);
          heartGroupRef.current = heartGroup;
          scene.add(heartGroup);

          // Add blood flow if enabled
          if (showBloodFlow) {
            createBloodFlowParticles(heartGroup);
          }

          setModelLoaded(true);
          setIsLoading(false);
        },
        (progress) => {
          const percentComplete = (progress.loaded / progress.total) * 100;
          setLoadingProgress(percentComplete);
        },
        (error) => {
          console.error('Error loading 3D model:', error);
          setError('Failed to load 3D heart model. Creating procedural model instead.');
          createProceduralHeart(scene);
        }
      );
    } catch (err) {
      console.error('Error setting up model loader:', err);
      setError('Failed to setup model loader. Creating procedural model instead.');
      createProceduralHeart(scene);
    }
  };

  /**
   * Create procedural heart geometry as fallback
   */
  const createProceduralHeart = (scene: THREE.Scene) => {
    const heartGroup = new THREE.Group();
    heartGroupRef.current = heartGroup;

    // Create heart chambers
    createHeartChambers(heartGroup);
    
    // Create blood vessels
    createBloodVessels(heartGroup);
    
    // Add blood flow particles
    if (showBloodFlow) {
      createBloodFlowParticles(heartGroup);
    }

    scene.add(heartGroup);
    setModelLoaded(true);
    setIsLoading(false);
  };

  /**
   * Create heart chambers with proper materials and colors
   */
  const createHeartChambers = (group: THREE.Group) => {
    // Left ventricle (main pumping chamber)
    const leftVentricleGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    leftVentricleGeometry.scale(1, 1.3, 0.8);
    const leftVentricleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdc2626,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9
    });
    const leftVentricle = new THREE.Mesh(leftVentricleGeometry, leftVentricleMaterial);
    leftVentricle.position.set(-0.3, -0.5, 0);
    leftVentricle.castShadow = true;
    leftVentricle.receiveShadow = true;
    leftVentricle.userData = { name: 'leftVentricle' };
    group.add(leftVentricle);

    heartParts.current.set('leftVentricle', {
      name: 'Left Ventricle',
      description: 'The main pumping chamber that sends oxygen-rich blood to the body',
      mesh: leftVentricle,
      originalMaterial: leftVentricleMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0xff4444,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });

    // Right ventricle
    const rightVentricleGeometry = new THREE.SphereGeometry(1, 32, 32);
    rightVentricleGeometry.scale(1, 1.2, 0.7);
    const rightVentricleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7c2d12,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9
    });
    const rightVentricle = new THREE.Mesh(rightVentricleGeometry, rightVentricleMaterial);
    rightVentricle.position.set(0.4, -0.5, 0.2);
    rightVentricle.castShadow = true;
    rightVentricle.receiveShadow = true;
    rightVentricle.userData = { name: 'rightVentricle' };
    group.add(rightVentricle);

    heartParts.current.set('rightVentricle', {
      name: 'Right Ventricle',
      description: 'Pumps deoxygenated blood to the lungs for oxygenation',
      mesh: rightVentricle,
      originalMaterial: rightVentricleMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0xa84532,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });

    // Left atrium
    const leftAtriumGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const leftAtriumMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xef4444,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const leftAtrium = new THREE.Mesh(leftAtriumGeometry, leftAtriumMaterial);
    leftAtrium.position.set(-0.5, 0.8, 0);
    leftAtrium.castShadow = true;
    leftAtrium.receiveShadow = true;
    leftAtrium.userData = { name: 'leftAtrium' };
    group.add(leftAtrium);

    heartParts.current.set('leftAtrium', {
      name: 'Left Atrium',
      description: 'Receives oxygen-rich blood from the lungs',
      mesh: leftAtrium,
      originalMaterial: leftAtriumMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0xff6666,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });

    // Right atrium
    const rightAtriumGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const rightAtriumMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x991b1b,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const rightAtrium = new THREE.Mesh(rightAtriumGeometry, rightAtriumMaterial);
    rightAtrium.position.set(0.5, 0.8, 0.2);
    rightAtrium.castShadow = true;
    rightAtrium.receiveShadow = true;
    rightAtrium.userData = { name: 'rightAtrium' };
    group.add(rightAtrium);

    heartParts.current.set('rightAtrium', {
      name: 'Right Atrium',
      description: 'Receives deoxygenated blood from the body',
      mesh: rightAtrium,
      originalMaterial: rightAtriumMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0xcc3333,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });
  };

  /**
   * Create major blood vessels
   */
  const createBloodVessels = (group: THREE.Group) => {
    // Aorta
    const aortaGeometry = new THREE.CylinderGeometry(0.15, 0.2, 2, 16);
    const aortaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdc2626,
      roughness: 0.3,
      metalness: 0.2
    });
    const aorta = new THREE.Mesh(aortaGeometry, aortaMaterial);
    aorta.position.set(-0.3, 1.5, 0);
    aorta.rotation.z = Math.PI * 0.1;
    aorta.castShadow = true;
    aorta.userData = { name: 'aorta' };
    group.add(aorta);

    heartParts.current.set('aorta', {
      name: 'Aorta',
      description: 'The largest artery that carries oxygen-rich blood from the heart to the body',
      mesh: aorta,
      originalMaterial: aortaMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0xff4444,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });

    // Pulmonary artery
    const pulmonaryGeometry = new THREE.CylinderGeometry(0.12, 0.15, 1.5, 16);
    const pulmonaryMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e40af,
      roughness: 0.3,
      metalness: 0.2
    });
    const pulmonaryArtery = new THREE.Mesh(pulmonaryGeometry, pulmonaryMaterial);
    pulmonaryArtery.position.set(0.4, 1.3, 0.2);
    pulmonaryArtery.rotation.z = -Math.PI * 0.1;
    pulmonaryArtery.castShadow = true;
    pulmonaryArtery.userData = { name: 'pulmonaryArtery' };
    group.add(pulmonaryArtery);

    heartParts.current.set('pulmonaryArtery', {
      name: 'Pulmonary Artery',
      description: 'Carries deoxygenated blood from the heart to the lungs',
      mesh: pulmonaryArtery,
      originalMaterial: pulmonaryMaterial,
      highlightMaterial: new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.2
      })
    });
  };

  /**
   * Create animated blood flow particles
   */
  const createBloodFlowParticles = (group: THREE.Group) => {
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random positions within heart area
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      // Random velocities for flow simulation
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Red color for arterial blood, blue for venous
      const isArterial = Math.random() > 0.5;
      colors[i * 3] = isArterial ? 1 : 0.2;     // Red
      colors[i * 3 + 1] = 0.2;                  // Green
      colors[i * 3 + 2] = isArterial ? 0.2 : 1; // Blue

      sizes[i] = Math.random() * 3 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData = { velocities };
    bloodParticles.current = particles;
    group.add(particles);
  };

  /**
   * Setup mouse and touch event listeners
   */
  const setupEventListeners = () => {
    const canvas = rendererRef.current?.domElement;
    if (!canvas) return;

    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('click', handleClick);

    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
  };

  /**
   * Handle mouse interactions
   */
  const handleMouseDown = (event: MouseEvent) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: MouseEvent) => {
    const rect = rendererRef.current?.domElement.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    if (isDraggingRef.current && heartGroupRef.current) {
      const deltaX = event.clientX - previousMouseRef.current.x;
      const deltaY = event.clientY - previousMouseRef.current.y;

      heartGroupRef.current.rotation.y += deltaX * 0.01;
      heartGroupRef.current.rotation.x += deltaY * 0.01;

      previousMouseRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const newDistance = Math.max(3, Math.min(15, cameraDistance + event.deltaY * 0.01));
    setCameraDistance(newDistance);
  };

  const handleClick = (event: MouseEvent) => {
    if (isDraggingRef.current) return;

    const rect = rendererRef.current?.domElement.getBoundingClientRect();
    if (!rect || !raycasterRef.current || !cameraRef.current || !heartGroupRef.current) return;

    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    raycasterRef.current.setFromCamera(mouse, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(heartGroupRef.current.children, true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const partName = clickedObject.userData.name || clickedObject.name;
      if (partName) {
        setSelectedPart(selectedPart === partName ? null : partName);
        highlightPart(partName);
      }
    } else {
      setSelectedPart(null);
      clearHighlights();
    }
  };

  // Touch event handlers
  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      previousMouseRef.current = { x: touch.clientX, y: touch.clientY };
      isDraggingRef.current = true;
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (event.touches.length === 1 && isDraggingRef.current && heartGroupRef.current) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - previousMouseRef.current.x;
      const deltaY = touch.clientY - previousMouseRef.current.y;

      heartGroupRef.current.rotation.y += deltaX * 0.01;
      heartGroupRef.current.rotation.x += deltaY * 0.01;

      previousMouseRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  /**
   * Highlight selected heart part
   */
  const highlightPart = (partName: string) => {
    clearHighlights();
    const part = heartParts.current.get(partName);
    if (part?.mesh && part.highlightMaterial) {
      if (part.mesh instanceof THREE.Mesh) {
        part.mesh.material = part.highlightMaterial;
      }
    }
  };

  /**
   * Clear all highlights
   */
  const clearHighlights = () => {
    heartParts.current.forEach(part => {
      if (part.mesh && part.originalMaterial) {
        if (part.mesh instanceof THREE.Mesh) {
          part.mesh.material = part.originalMaterial;
        }
      }
    });
  };

  /**
   * Animation loop with proper cleanup
   */
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const clock = clockRef.current;
    if (!clock) return;

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = clock.getDelta();

    // Update animation mixer for loaded models
    if (mixerRef.current && isAnimating) {
      mixerRef.current.update(deltaTime * animationSpeed);
    }

    // Heart beating animation for procedural model
    if (isAnimating && heartGroupRef.current && !modelLoaded) {
      const beatScale = 1 + Math.sin(elapsedTime * 2 * animationSpeed) * 0.05;
      heartGroupRef.current.scale.setScalar(beatScale);

      // Gentle rotation
      heartGroupRef.current.rotation.y += 0.002 * animationSpeed;
    }

    // Blood flow animation
    if (showBloodFlow && bloodParticles.current) {
      const positions = bloodParticles.current.geometry.attributes.position.array as Float32Array;
      const velocities = bloodParticles.current.userData.velocities as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocities
        positions[i] += velocities[i] * animationSpeed;
        positions[i + 1] += velocities[i + 1] * animationSpeed;
        positions[i + 2] += velocities[i + 2] * animationSpeed;
        
        // Add some turbulence
        positions[i + 1] += Math.sin(elapsedTime + i) * 0.01 * animationSpeed;
        
        // Reset particles that go too far
        if (Math.abs(positions[i]) > 3 || Math.abs(positions[i + 1]) > 3 || Math.abs(positions[i + 2]) > 2) {
          positions[i] = (Math.random() - 0.5) * 2;
          positions[i + 1] = (Math.random() - 0.5) * 2;
          positions[i + 2] = (Math.random() - 0.5) * 1;
        }
      }
      bloodParticles.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update camera position
    if (cameraRef.current) {
      cameraRef.current.position.z = cameraDistance;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, [isAnimating, showBloodFlow, animationSpeed, cameraDistance, modelLoaded]);

  /**
   * Handle window resize with proper aspect ratio
   */
  const handleResize = useCallback(() => {
    if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  /**
   * Control functions
   */
  const toggleAnimation = () => setIsAnimating(!isAnimating);
  const resetView = () => {
    if (heartGroupRef.current) {
      heartGroupRef.current.rotation.set(0, 0, 0);
      heartGroupRef.current.scale.setScalar(1);
    }
    setCameraDistance(8);
    setSelectedPart(null);
    clearHighlights();
  };

  const zoomIn = () => setCameraDistance(Math.max(3, cameraDistance - 1));
  const zoomOut = () => setCameraDistance(Math.min(15, cameraDistance + 1));

  // File upload handler for custom models
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && sceneRef.current) {
      const url = URL.createObjectURL(file);
      setIsLoading(true);
      setError(null);
      loadExternalModel(sceneRef.current, url);
    }
  };

  // Initialize scene on mount
  useEffect(() => {
    initializeScene();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [initializeScene]);

  // Start animation loop
  useEffect(() => {
    animate();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [animate]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Update blood flow visibility
  useEffect(() => {
    if (heartGroupRef.current && bloodParticles.current) {
      bloodParticles.current.visible = showBloodFlow;
    }
  }, [showBloodFlow]);

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-xl p-8 text-center ${className}`}>
        <div className="text-red-600 mb-4">
          <Heart className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">3D Visualization Error</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <p className="text-sm text-red-600">
          Please ensure your browser supports WebGL and try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">
              {modelUrl ? 'Loading 3D Heart Model...' : 'Creating 3D Heart Model...'}
            </p>
            {loadingProgress > 0 && (
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[600px] lg:h-[700px] cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg space-y-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAnimation}
            className={`p-2 rounded-lg transition-colors ${
              isAnimating ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            title={isAnimating ? 'Pause Animation' : 'Play Animation'}
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={resetView}
            className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomIn}
            className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={zoomOut}
            className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBloodFlow(!showBloodFlow)}
            className={`p-2 rounded-lg transition-colors ${
              showBloodFlow ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            title="Toggle Blood Flow"
          >
            <Activity className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-lg transition-colors ${
              showInfo ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            title="Toggle Information"
          >
            {showInfo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        {/* File Upload for Custom Models */}
        <div className="border-t pt-3">
          <label className="block">
            <input
              type="file"
              accept=".gltf,.glb,.obj"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Upload className="w-4 h-4" />
              <span className="text-xs">Load Model</span>
            </button>
          </label>
        </div>

        {/* Animation Speed Control */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 font-medium">Speed</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Heart Anatomy</h3>
          </div>
          
          {selectedPart ? (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">
                {heartParts.current.get(selectedPart)?.name}
              </h4>
              <p className="text-sm text-gray-600">
                {heartParts.current.get(selectedPart)?.description}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {modelUrl ? 'Exploring external heart model.' : 'Click on different parts of the heart to learn more about their function.'}
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Drag to rotate</p>
                <p>• Scroll to zoom</p>
                <p>• Click parts for info</p>
                <p>• Upload custom models</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-red-600" />
            <span className="font-medium text-gray-900">
              {modelLoaded && modelUrl ? 'External Heart Model' : 'Interactive 3D Heart Model'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Drag to rotate • Scroll to zoom • Upload custom models
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heart3D;