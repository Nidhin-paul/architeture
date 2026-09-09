'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BuildingSceneProps {
  scrollProgress: number; // 0.0 to 1.0
}

export default function BuildingScene({ scrollProgress }: BuildingSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<THREE.Group | null>(null);
  const rightDoorRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  const currentProgress = useRef(0);
  const progressTarget = useRef(scrollProgress);

  useEffect(() => {
    progressTarget.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F5F0');
    scene.fog = new THREE.FogExp2('#F7F5F0', 0.012);

    const width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800);
    const height = container.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);

    const camera = new THREE.PerspectiveCamera(
      42,
      width / height,
      0.1,
      150
    );
    camera.position.set(0, 4.5, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // 2. Luxury Daylight Architectural Lighting
    const ambientLight = new THREE.AmbientLight('#FAF7F0', 1.8);
    scene.add(ambientLight);

    // Daylight Sky Fill Light
    const skyLight = new THREE.DirectionalLight('#D8E5F0', 1.0);
    skyLight.position.set(-15, 25, 10);
    scene.add(skyLight);

    // Main Architectural Accent Sun (Warm golden daylight)
    const sunLight = new THREE.DirectionalLight('#FFF5DE', 2.4);
    sunLight.position.set(14, 20, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    // Warm Interior Gallery Lights (Gleams through glass)
    const interiorGlow1 = new THREE.PointLight('#FFE0B2', 4.0, 18, 1.2);
    interiorGlow1.position.set(0, 3.2, -1.5);
    scene.add(interiorGlow1);

    const interiorGlow2 = new THREE.PointLight('#FFD180', 3.0, 22, 1.2);
    interiorGlow2.position.set(5.5, 3.8, -1.0);
    scene.add(interiorGlow2);

    const entranceSpot = new THREE.SpotLight('#FFF8E1', 4.5, 15, Math.PI / 4, 0.4);
    entranceSpot.position.set(0, 6.0, 3.5);
    entranceSpot.target.position.set(0, 0, 1.5);
    scene.add(entranceSpot);
    scene.add(entranceSpot.target);

    // 3. Materials: Luxury Limestone, Champagne Bronze, and Crystal Glass
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: '#D8D1C5',
      roughness: 0.72,
      metalness: 0.06,
    });

    const darkConcreteMaterial = new THREE.MeshStandardMaterial({
      color: '#CCC4B6',
      roughness: 0.8,
      metalness: 0.08,
    });

    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: '#B8955C',
      roughness: 0.28,
      metalness: 0.88,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: '#EAF2F8',
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.4,
    });

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: '#3B4E5E',
      roughness: 0.04,
      metalness: 0.94,
    });

    const warmInteriorMat = new THREE.MeshBasicMaterial({
      color: '#F4E3C8',
    });

    // 4. Ground & Reflecting Pool
    const poolGeo = new THREE.PlaneGeometry(36, 24);
    const poolMesh = new THREE.Mesh(poolGeo, waterMaterial);
    poolMesh.rotation.x = -Math.PI / 2;
    poolMesh.position.set(0, -0.05, 10);
    poolMesh.receiveShadow = true;
    scene.add(poolMesh);

    // Surrounding limestone terrace
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMesh = new THREE.Mesh(groundGeo, darkConcreteMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.set(0, -0.1, 0);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 5. Stepping Stone Pathway over water leading to entrance
    for (let i = 0; i < 7; i++) {
      const stoneGeo = new THREE.BoxGeometry(2.4, 0.18, 1.2);
      const stoneMesh = new THREE.Mesh(stoneGeo, concreteMaterial);
      stoneMesh.position.set(0, 0.02, 12 - i * 1.6);
      stoneMesh.receiveShadow = true;
      stoneMesh.castShadow = true;
      scene.add(stoneMesh);
    }

    // 6. Architectural Building Structure
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Central Entrance Portal Frame
    const portalTopGeo = new THREE.BoxGeometry(7, 1.2, 3.5);
    const portalTop = new THREE.Mesh(portalTopGeo, concreteMaterial);
    portalTop.position.set(0, 5.8, 1.5);
    portalTop.castShadow = true;
    buildingGroup.add(portalTop);

    // Left Concrete Wall Column
    const colLeftGeo = new THREE.BoxGeometry(1.6, 6.4, 3.2);
    const colLeft = new THREE.Mesh(colLeftGeo, concreteMaterial);
    colLeft.position.set(-3.2, 2.6, 1.5);
    colLeft.castShadow = true;
    buildingGroup.add(colLeft);

    // Right Concrete Wall Column
    const colRightGeo = new THREE.BoxGeometry(1.6, 6.4, 3.2);
    const colRight = new THREE.Mesh(colRightGeo, concreteMaterial);
    colRight.position.set(3.2, 2.6, 1.5);
    colRight.castShadow = true;
    buildingGroup.add(colRight);

    // Left Wing (Cantilevered Box with Floor-to-Ceiling Glass)
    const leftWingRoof = new THREE.BoxGeometry(9, 0.8, 8);
    const leftRoof = new THREE.Mesh(leftWingRoof, concreteMaterial);
    leftRoof.position.set(-8.2, 5.8, 0);
    leftRoof.castShadow = true;
    buildingGroup.add(leftRoof);

    const leftFloor = new THREE.Mesh(new THREE.BoxGeometry(9, 0.6, 8), concreteMaterial);
    leftFloor.position.set(-8.2, 0.2, 0);
    buildingGroup.add(leftFloor);

    const leftGlass = new THREE.Mesh(new THREE.BoxGeometry(8.6, 5.0, 0.1), glassMaterial);
    leftGlass.position.set(-8.2, 2.8, 3.6);
    buildingGroup.add(leftGlass);

    // Right Wing (Cantilevered Modern Volume)
    const rightWingRoof = new THREE.BoxGeometry(10, 0.9, 9);
    const rightRoof = new THREE.Mesh(rightWingRoof, concreteMaterial);
    rightRoof.position.set(8.5, 6.4, -0.5);
    rightRoof.castShadow = true;
    buildingGroup.add(rightRoof);

    const rightGlass = new THREE.Mesh(new THREE.BoxGeometry(9.6, 5.4, 0.1), glassMaterial);
    rightGlass.position.set(8.5, 3.2, 3.8);
    buildingGroup.add(rightGlass);

    // 7. Physical Double Doors with Pivots
    // Door Opening: 3.2m total width (1.6m per door leaf)
    // Left Door Pivot: placed at x = -1.6
    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-1.6, 0, 1.5);
    buildingGroup.add(leftDoorPivot);
    leftDoorRef.current = leftDoorPivot;

    const doorLeafGeo = new THREE.BoxGeometry(1.58, 4.6, 0.12);
    const leftDoorMesh = new THREE.Mesh(doorLeafGeo, bronzeMaterial);
    // Offset mesh so pivot is at the outer hinge
    leftDoorMesh.position.set(0.79, 2.3, 0);
    leftDoorMesh.castShadow = true;
    leftDoorPivot.add(leftDoorMesh);

    // Left Door Handle
    const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4);
    const leftHandle = new THREE.Mesh(handleGeo, bronzeMaterial);
    leftHandle.position.set(1.4, 2.2, 0.1);
    leftDoorPivot.add(leftHandle);

    // Right Door Pivot: placed at x = +1.6
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(1.6, 0, 1.5);
    buildingGroup.add(rightDoorPivot);
    rightDoorRef.current = rightDoorPivot;

    const rightDoorMesh = new THREE.Mesh(doorLeafGeo, bronzeMaterial);
    rightDoorMesh.position.set(-0.79, 2.3, 0);
    rightDoorMesh.castShadow = true;
    rightDoorPivot.add(rightDoorMesh);

    const rightHandle = new THREE.Mesh(handleGeo, bronzeMaterial);
    rightHandle.position.set(-1.4, 2.2, 0.1);
    rightDoorPivot.add(rightHandle);

    // 8. Interior Space (Behind Doors)
    const interiorFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 20),
      new THREE.MeshStandardMaterial({ color: '#2b2622', roughness: 0.4 })
    );
    interiorFloor.rotation.x = -Math.PI / 2;
    interiorFloor.position.set(0, 0.01, -7);
    buildingGroup.add(interiorFloor);

    // Warm Interior Feature Wall with Art
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(14, 6.5, 0.4),
      concreteMaterial
    );
    backWall.position.set(0, 3.2, -14);
    buildingGroup.add(backWall);

    const artCanvas = new THREE.Mesh(
      new THREE.BoxGeometry(5, 2.8, 0.05),
      warmInteriorMat
    );
    artCanvas.position.set(0, 3.4, -13.7);
    buildingGroup.add(artCanvas);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation / Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Heavy cinematic inertia lerping
      currentProgress.current = THREE.MathUtils.lerp(
        currentProgress.current,
        progressTarget.current,
        0.08
      );
      const p = currentProgress.current;

      // CAMERA TIMELINE:
      // 0.0 -> 0.20: Wide establishing view
      // 0.20 -> 0.60: Glide forward toward entrance
      // 0.60 -> 0.85: Entrance focus & doors swing open
      // 0.85 -> 1.00: Glide physically through doorway into interior
      let posX = 0;
      let posY = 4.5;
      let posZ = 24;
      let targetY = 2.5;
      let targetZ = 0;

      if (p <= 0.2) {
        const sub = p / 0.2;
        posX = 0;
        posY = THREE.MathUtils.lerp(4.5, 3.8, sub);
        posZ = THREE.MathUtils.lerp(24, 20, sub);
        targetY = 2.5;
        targetZ = 0;
      } else if (p <= 0.6) {
        const sub = (p - 0.2) / 0.4;
        posX = 0;
        posY = THREE.MathUtils.lerp(3.8, 2.3, sub);
        posZ = THREE.MathUtils.lerp(20, 6.5, sub);
        targetY = THREE.MathUtils.lerp(2.5, 2.2, sub);
        targetZ = THREE.MathUtils.lerp(0, 1.5, sub);
      } else if (p <= 0.85) {
        const sub = (p - 0.6) / 0.25;
        posX = 0;
        posY = THREE.MathUtils.lerp(2.3, 1.9, sub);
        posZ = THREE.MathUtils.lerp(6.5, 2.8, sub);
        targetY = 2.0;
        targetZ = 1.0;
      } else {
        // 0.85 -> 1.00: Glide into the interior gallery
        const sub = (p - 0.85) / 0.15;
        posX = 0;
        posY = THREE.MathUtils.lerp(1.9, 1.8, sub);
        posZ = THREE.MathUtils.lerp(2.8, -4.5, sub); // crosses door at z = 1.5
        targetY = 2.0;
        targetZ = THREE.MathUtils.lerp(1.0, -12.0, sub);
      }

      if (cameraRef.current) {
        cameraRef.current.position.set(posX, posY, posZ);
        targetLookAt.current.set(0, targetY, targetZ);
        currentLookAt.current.lerp(targetLookAt.current, 0.08);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // PHYSICAL DOOR OPENING ANIMATION:
      // Door opens between p = 0.65 and p = 0.85
      // Left: 0 -> -70deg (-1.22 rad)
      // Right: 0 -> +70deg (+1.22 rad)
      let doorAngle = 0;
      if (p >= 0.65 && p <= 0.85) {
        const doorProgress = (p - 0.65) / 0.2;
        // Smooth sine ease
        const eased = Math.sin((doorProgress * Math.PI) / 2);
        doorAngle = eased * 1.22; // ~70 degrees
      } else if (p > 0.85) {
        doorAngle = 1.22;
      }

      if (leftDoorRef.current) {
        leftDoorRef.current.rotation.y = -doorAngle;
      }
      if (rightDoorRef.current) {
        rightDoorRef.current.rotation.y = doorAngle;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative" />;
}
