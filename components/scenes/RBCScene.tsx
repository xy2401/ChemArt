
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export const RBCScene: React.FC = () => {
  const points = useMemo(() => {
    // Evans & Fung (1972) Red Blood Cell Shape Model
    // The shape is defined by rotating a specific profile curve.
    // Formula: z(r) = +/- 0.5 * sqrt(1-r^2) * (c0 + c1*r^2 + c2*r^4)
    // where r is the normalized radius [0, 1].
    
    const pts: THREE.Vector2[] = [];
    const R = 3.2; // Visual Model Radius
    const thicknessScale = 1.8; // Exaggerate thickness slightly for 3D look
    const segments = 128; // High segment count for smooth curvature

    // Coefficients for human erythrocyte
    const c0 = 0.207;
    const c1 = 2.003;
    const c2 = -1.123;

    // We generate the full cross-sectional loop in the X-Y plane.
    // LatheGeometry spins this around the Y-axis.
    // So, Vector2.x maps to the Radius (distance from center).
    // Vector2.y maps to the Thickness (height).

    // 1. Top Surface: Center (r=0) -> Edge (r=1)
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const r = u; // Normalized radius
      
      // Calculate half-thickness
      const shapeFactor = c0 + c1 * (r * r) + c2 * Math.pow(r, 4);
      const halfThickness = 0.5 * Math.sqrt(1 - r * r) * shapeFactor;
      
      pts.push(new THREE.Vector2(r * R, halfThickness * R * thicknessScale));
    }

    // 2. Bottom Surface: Edge (r=1) -> Center (r=0)
    for (let i = segments; i >= 0; i--) {
      const u = i / segments;
      const r = u;
      
      const shapeFactor = c0 + c1 * (r * r) + c2 * Math.pow(r, 4);
      const halfThickness = 0.5 * Math.sqrt(1 - r * r) * shapeFactor;
      
      // Negative thickness for bottom half
      pts.push(new THREE.Vector2(r * R, -halfThickness * R * thicknessScale));
    }

    return pts;
  }, []);

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.5}>
        {/* Rotate X by 90deg so the flat face points towards the camera (Z-axis) initially */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <latheGeometry args={[points, 64]} />
          <meshPhysicalMaterial 
            color="#dc2626" // Deep Red (Red 600)
            roughness={0.3} 
            metalness={0.1}
            clearcoat={0.6} // Wet organic look
            clearcoatRoughness={0.25}
            sheen={1.0}
            sheenColor="#fca5a5" // Soft pinkish highlight
            transmission={0}
          />
        </mesh>
      </Float>
    </group>
  );
};
