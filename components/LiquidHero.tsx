'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Vector2 } from 'three';

// SHADER: The distortion logic (no changes)
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = distance(uv, uMouse);
    float decay = clamp(1.0 - dist * 3.0, 0.0, 1.0);
    pos.z += sin(pos.x * 5.0 + uTime * 2.0) * 0.1 * decay;
    pos.y += cos(pos.y * 5.0 + uTime * 2.0) * 0.1 * decay;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

function LiquidText() {
  const mesh = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uColor: { value: new THREE.Color('#e0dedb') }, // Explicit Bone Color
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Mouse physics
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      const currentMouse = (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value;
      
      currentMouse.x += (targetX - currentMouse.x) * 0.05;
      currentMouse.y += (targetY - currentMouse.y) * 0.05;
    }
  });

  return (
    // CHANGED: Position moved to [0.60, 0.50, 0] (doubling the last small adjustment)
    <Center position={[0.60, 0.50, 0]}>
      <Text
        ref={mesh}
        // Keeping the reliable font that works for you
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        // Font size remains 0.36
        fontSize={0.36}
        letterSpacing={-0.05}
        lineHeight={1}
        anchorX="center"
        anchorY="middle"
      >
        BERLIN ST. CLAIR STUDIOS
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </Text>
    </Center>
  );
}

export default function LiquidHero() {
  return (
    <div className="h-screen w-full relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <LiquidText />
      </Canvas>
    </div>
  );
}