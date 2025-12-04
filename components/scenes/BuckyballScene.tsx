
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const BuckyballScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    
    // Generate C60 via Truncated Icosahedron construction
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // 1. Vertices of a regular Icosahedron (12 vertices)
    const icosahedronVerts: THREE.Vector3[] = [];
    
    // (0, ±1, ±phi)
    icosahedronVerts.push(new THREE.Vector3(0, 1, phi));
    icosahedronVerts.push(new THREE.Vector3(0, 1, -phi));
    icosahedronVerts.push(new THREE.Vector3(0, -1, phi));
    icosahedronVerts.push(new THREE.Vector3(0, -1, -phi));
    
    // (±1, ±phi, 0)
    icosahedronVerts.push(new THREE.Vector3(1, phi, 0));
    icosahedronVerts.push(new THREE.Vector3(1, -phi, 0));
    icosahedronVerts.push(new THREE.Vector3(-1, phi, 0));
    icosahedronVerts.push(new THREE.Vector3(-1, -phi, 0));
    
    // (±phi, 0, ±1)
    icosahedronVerts.push(new THREE.Vector3(phi, 0, 1));
    icosahedronVerts.push(new THREE.Vector3(phi, 0, -1));
    icosahedronVerts.push(new THREE.Vector3(-phi, 0, 1));
    icosahedronVerts.push(new THREE.Vector3(-phi, 0, -1));

    // 2. Truncate: For each vertex, find its 5 nearest neighbors.
    // Replace the vertex with 5 new vertices lying 1/3 of the way along the edges to those neighbors.
    
    // Helper to find neighbors
    const getNeighbors = (vIndex: number, allVerts: THREE.Vector3[]) => {
        const neighbors: number[] = [];
        const v = allVerts[vIndex];
        // Edge length of icosahedron with these coords is 2
        // Distance check ~ 2.0
        for(let i=0; i<allVerts.length; i++) {
            if (i === vIndex) continue;
            const d = v.distanceTo(allVerts[i]);
            if (d < 2.1 && d > 1.9) {
                neighbors.push(i);
            }
        }
        return neighbors;
    };

    let atomIdCounter = 0;
    const newPositions: THREE.Vector3[] = [];

    // Map to keep track of generated atoms to avoid duplicates? 
    // Actually, simple truncation:
    // For every directed edge (u, v), generate point at u + (v-u)/3.
    // Since graph is undirected, edge (u,v) generates one point near u, and edge (v,u) generates one point near v.
    // An icosahedron has 30 edges. 30 * 2 = 60 atoms. Perfect.

    // To avoid duplicates, we iterate all pairs.
    for (let i = 0; i < icosahedronVerts.length; i++) {
        for (let j = i + 1; j < icosahedronVerts.length; j++) {
             const v1 = icosahedronVerts[i];
             const v2 = icosahedronVerts[j];
             const d = v1.distanceTo(v2);
             
             // Check if edge exists
             if (d < 2.1 && d > 1.9) {
                 // Create atom near v1
                 const p1 = new THREE.Vector3().lerpVectors(v1, v2, 1/3);
                 // Create atom near v2
                 const p2 = new THREE.Vector3().lerpVectors(v1, v2, 2/3);
                 
                 newPositions.push(p1);
                 newPositions.push(p2);
             }
        }
    }

    // Create Atoms
    newPositions.forEach((pos, idx) => {
        atoms.push({
            id: `c60-${idx}`,
            element: 'C',
            position: [pos.x, pos.y, pos.z],
            color: '#475569', // Slate 600
            radius: 0.25
        });
    });

    // Create Bonds based on distance
    // There are two bond lengths in C60: 
    // 1. Between atoms generated from same icosahedron edge (the "double" bonds, length ~ 2/3 of original edge * something?) -> actually distance is 1/3 of edge length = 2/3 = 0.66
    // 2. Between atoms generated from sharing a vertex (the "single" bonds, forming pentagons).
    
    // Just simple distance check again
    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const p1 = new THREE.Vector3(...atoms[i].position);
            const p2 = new THREE.Vector3(...atoms[j].position);
            const dist = p1.distanceTo(p2);
            
            // Expected distances:
            // 1/3 of 2 = 0.666
            // The side of the pentagon cut... mathematical calc is approx same range.
            if (dist < 0.8) {
                bonds.push({
                    id: `b-${i}-${j}`,
                    source: atoms[i].id,
                    target: atoms[j].id,
                    order: 1
                });
            }
        }
    }

    return {
      title: "Buckminsterfullerene (C60)",
      description: "A truncated icosahedron resembling a soccer ball. The most famous fullerene, composed of 20 hexagons and 12 pentagons.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={0.8} />;
};
