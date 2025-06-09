"use client";
import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import Image from "next/image";

const COUNT = 15000;
const BOUNDARY_POINTS = 10;
const TOTAL_POINTS = COUNT + BOUNDARY_POINTS;
const RADIUS = 2.2;
const GRID_WIDTH = 12;
const WAVE_HEIGHT = 0.5;
const POINT_SIZE = 0.018;
const BASE_OPACITY = 0.4;

const BASE_RADIUS = 1.1;
const BASE_SCREEN_WIDTH = 1920;

const SCREEN_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  laptop: 1440,
};

export function WaveGlobe({ scrollProgress = 0 }) {
  const { viewport } = useThree();
  const [scaledRadius, setScaledRadius] = useState(BASE_RADIUS);
  const points = useRef<THREE.Points>(null);
  const positions = useRef(new Float32Array(TOTAL_POINTS * 3));
  const spherePositions = useRef(new Float32Array(TOTAL_POINTS * 3));
  const wavePositions = useRef(new Float32Array(TOTAL_POINTS * 3));
  const visiblePoints = useRef(new Array(TOTAL_POINTS).fill(false));
  const randomOffsets = useRef(new Float32Array(TOTAL_POINTS));
  const isBoundaryPoint = useRef(new Array(TOTAL_POINTS).fill(false));

  const texture = useLoader(TextureLoader, "./images/hero/map.png");
  const [textureLoaded, setTextureLoaded] = useState(false);

  const rippleCenters = useRef([
    new THREE.Vector2(-2, -2),
    new THREE.Vector2(2, -2),
    new THREE.Vector2(0, 2),
    new THREE.Vector2(-1, 1),
    new THREE.Vector2(1, -1),
  ]);

  useEffect(() => {
    const calculateRadius = () => {
      const screenWidth = window.innerWidth;
      let responsiveFactor;

      if (screenWidth <= 768) {
        responsiveFactor = 1.8;
      } else if (screenWidth <= 1024) {
        responsiveFactor = 1.5;
      } else if (screenWidth <= 1440) {
        responsiveFactor = 1.3;
      } else {
        responsiveFactor = 1;
      }

      const scaleFactor =
        Math.min(viewport.width, viewport.height) / (BASE_SCREEN_WIDTH / 200);
      const newRadius = BASE_RADIUS * responsiveFactor * (scaleFactor / 60);
      setScaledRadius(newRadius);
    };

    calculateRadius();
    window.addEventListener("resize", calculateRadius);
    return () => window.removeEventListener("resize", calculateRadius);
  }, [viewport]);
  const spherePointToUV = (
    dotCenter: THREE.Vector3,
    sphereCenter: THREE.Vector3,
  ) => {
    const newVector = new THREE.Vector3();
    newVector.subVectors(sphereCenter, dotCenter).normalize();
    const uvX =
      1 - (0.5 + Math.atan2(newVector.z, newVector.x) / (2 * Math.PI));
    const uvY = 0.5 + Math.asin(newVector.y) / Math.PI;
    return new THREE.Vector2(uvX, uvY);
  };
  const isBoundary = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    if (x <= 0 || y <= 0 || x >= width - 1 || y >= height - 1) return false;

    const pixel = ctx.getImageData(x, y, 1, 1).data[3];
    const surroundingPixels = [
      ctx.getImageData(x - 1, y, 1, 1).data[3],
      ctx.getImageData(x + 1, y, 1, 1).data[3],
      ctx.getImageData(x, y - 1, 1, 1).data[3],
      ctx.getImageData(x, y + 1, 1, 1).data[3],
    ];

    return pixel > 0 && surroundingPixels.some((p) => p === 0);
  };

  useEffect(() => {
    if (texture.image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context");
        return;
      }
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      ctx.drawImage(texture.image, 0, 0);

      const initializePoints = (startIndex: number, endIndex: number) => {
        for (let i = startIndex; i < endIndex; i++) {
          const i3 = i * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          spherePositions.current[i3] =
            RADIUS * Math.sin(phi) * Math.cos(theta);
          spherePositions.current[i3 + 1] =
            RADIUS * Math.sin(phi) * Math.sin(theta);
          spherePositions.current[i3 + 2] = RADIUS * Math.cos(phi);

          const uv = spherePointToUV(
            new THREE.Vector3(
              spherePositions.current[i3],
              spherePositions.current[i3 + 1],
              spherePositions.current[i3 + 2],
            ),
            new THREE.Vector3(0, 0, 0),
          );
          const pixelX = Math.floor(uv.x * canvas.width);
          const pixelY = Math.floor(uv.y * canvas.height);
          const pixel = ctx.getImageData(pixelX, pixelY, 1, 1).data;
          visiblePoints.current[i] = pixel[3] > 0;
        }
      };
      const batchSize = 1000;
      let currentIndex = 0;

      const loadNextBatch = () => {
        const endIndex = Math.min(currentIndex + batchSize, TOTAL_POINTS);
        initializePoints(currentIndex, endIndex);
        currentIndex += batchSize;

        if (currentIndex < TOTAL_POINTS) {
          requestAnimationFrame(loadNextBatch);
        } else {
          let boundaryPointCount = 0;
          while (boundaryPointCount < BOUNDARY_POINTS) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const i = COUNT + boundaryPointCount;
            const i3 = i * 3;

            spherePositions.current[i3] =
              RADIUS * Math.sin(phi) * Math.cos(theta);
            spherePositions.current[i3 + 1] =
              RADIUS * Math.sin(phi) * Math.sin(theta);
            spherePositions.current[i3 + 2] = RADIUS * Math.cos(phi);

            const uv = spherePointToUV(
              new THREE.Vector3(
                spherePositions.current[i3],
                spherePositions.current[i3 + 1],
                spherePositions.current[i3 + 2],
              ),
              new THREE.Vector3(0, 0, 0),
            );
            const pixelX = Math.floor(uv.x * canvas.width);
            const pixelY = Math.floor(uv.y * canvas.height);

            if (isBoundary(ctx, pixelX, pixelY, canvas.width, canvas.height)) {
              visiblePoints.current[i] = true;
              isBoundaryPoint.current[i] = true;
              boundaryPointCount++;
            }
          }
          const gridSize = Math.sqrt(COUNT);
          const spacing = GRID_WIDTH / gridSize;

          for (let i = 0; i < TOTAL_POINTS; i++) {
            const i3 = i * 3;
            const col = i % gridSize;
            const row = Math.floor(i / gridSize);

            wavePositions.current[i3] = col * spacing - GRID_WIDTH / 2;
            wavePositions.current[i3 + 1] = 1.5;
            wavePositions.current[i3 + 2] = row * spacing - GRID_WIDTH / 2;

            positions.current[i3] = wavePositions.current[i3];
            positions.current[i3 + 1] = wavePositions.current[i3 + 1];
            positions.current[i3 + 2] = wavePositions.current[i3 + 2];
          }

          setTextureLoaded(true);
        }
      };

      loadNextBatch();
    }
  }, [texture]);

  useFrame((state) => {
    if (!points.current || !textureLoaded) return;

    const currentPositions = points.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;
    const material = points.current.material as THREE.PointsMaterial;

    const breathingOpacity = BASE_OPACITY + Math.sin(time * 0.5) * 0.1;
    material.opacity = textureLoaded ? breathingOpacity : 0;

    const hue = (Math.sin(time * 0.2) * 0.1 + 0.7) % 1;
    material.color.setHSL(hue, 0.7, 0.5);

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const transitionProgress = easeInOutCubic(
      Math.min(1, scrollProgress * 1.2),
    );

    for (let i = 0; i < TOTAL_POINTS * 3; i += 3) {
      const pointIndex = i / 3;
      const x = wavePositions.current[i];
      const z = wavePositions.current[i + 2];

      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const fadeThreshold = GRID_WIDTH * 0.4;
      const fadeOpacity = Math.max(0, 1 - distanceFromCenter / fadeThreshold);

      let waveY = 1.5;
      for (const center of rippleCenters.current) {
        const dx = x - center.x;
        const dz = z - center.y;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const waveSpeed = 2;
        const waveFrequency = 3;
        const waveAmplitude = WAVE_HEIGHT * 0.5 * fadeOpacity;
        const wavePhase = distance * waveFrequency - time * waveSpeed;
        waveY += Math.sin(wavePhase) * waveAmplitude * (1 - transitionProgress);
      }

      if (transitionProgress < 0.1) {
        currentPositions[i] = x;
        currentPositions[i + 1] = waveY;
        currentPositions[i + 2] = z;
      } else {
        if (!visiblePoints.current[pointIndex] && transitionProgress > 0.98) {
          currentPositions[i + 1] = -100;
          continue;
        }

        const randomOffset = randomOffsets.current[pointIndex];
        const sphereX = spherePositions.current[i];
        const sphereY = spherePositions.current[i + 1];
        const sphereZ = spherePositions.current[i + 2];

        const randomness =
          Math.sin(transitionProgress * Math.PI) * randomOffset * 0.5;
        const transitionY = Math.sin(transitionProgress * Math.PI) * 0.3;

        currentPositions[i] =
          THREE.MathUtils.lerp(x, sphereX, transitionProgress) + randomness;
        currentPositions[i + 1] =
          THREE.MathUtils.lerp(
            waveY + transitionY,
            sphereY,
            transitionProgress,
          ) + randomness;
        currentPositions[i + 2] =
          THREE.MathUtils.lerp(z, sphereZ, transitionProgress) + randomness;
      }

      const shimmer = Math.sin(time * 3 + x + z) * 0.1 + 0.9;
      material.size = POINT_SIZE * shimmer;
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    if (points.current) {
      const rotationProgress = Math.max(0, (scrollProgress - 0.5) / 0.5);
      const rotationSpeed = 0.01 * easeInOutCubic(rotationProgress);
      points.current.rotation.y += rotationSpeed;
    }

    if (transitionProgress > 0.98) {
      const explosionFactor = (transitionProgress - 0.92) * 2;
      material.size = POINT_SIZE * 2;
      material.opacity = BASE_OPACITY * 0.8;
    } else {
      material.size = POINT_SIZE;
      material.opacity = breathingOpacity;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={TOTAL_POINTS}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={POINT_SIZE}
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        opacity={textureLoaded ? BASE_OPACITY : 0}
        color="#9333EA"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
