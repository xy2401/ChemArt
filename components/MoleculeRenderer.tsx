import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { MoleculeStructure, AtomData, BondData } from '../types';

interface MoleculeRendererProps {
  data: MoleculeStructure;
  scale?: number;
}

const Atom: React.FC<{ atom: AtomData }> = ({ atom }) => {
  // Use PhysicalMaterial for that "scientific journal" glossy look
  return (
    <Sphere args={[atom.radius, 32, 32]} position={new THREE.Vector3(...atom.position)}>
      <meshPhysicalMaterial 
        color={atom.color}
        roughness={0.2}
        metalness={0.1}
        transmission={0.1} // slight glass effect
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
};

const Bond: React.FC<{ bond: BondData; atoms: AtomData[] }> = ({ bond, atoms }) => {
  const sourceAtom = atoms.find(a => a.id === bond.source);
  const targetAtom = atoms.find(a => a.id === bond.target);

  if (!sourceAtom || !targetAtom) return null;

  const start = new THREE.Vector3(...sourceAtom.position);
  const end = new THREE.Vector3(...targetAtom.position);
  
  // Calculate orientation and length for Cylinder
  const distance = start.distanceTo(end);
  const midPoint = start.clone().add(end).multiplyScalar(0.5);
  
  // Create a lookAt quaternion
  const direction = end.clone().sub(start).normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const radius = 0.08 * bond.order; // Thicker for double bonds

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, distance, 12]} />
      <meshPhysicalMaterial 
        color="#cbd5e1" 
        roughness={0.4} 
        metalness={0.6} 
      />
    </mesh>
  );
};

export const MoleculeRenderer: React.FC<MoleculeRendererProps> = ({ data, scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        {data.atoms.map((atom) => (
          <Atom key={atom.id} atom={atom} />
        ))}
        {data.bonds.map((bond) => (
          <Bond key={bond.id} bond={bond} atoms={data.atoms} />
        ))}
      </group>
    </Float>
  );
};