import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const NanoScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    
    const layers = 8;
    const atomsPerLayer = 10;
    const radius = 1.5;
    const heightStep = 0.6;
    
    // Generate spiral/tube
    for (let l = 0; l < layers; l++) {
      for (let i = 0; i < atomsPerLayer; i++) {
        const angle = (i / atomsPerLayer) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (l - layers / 2) * heightStep;

        const id = `n-${l}-${i}`;
        atoms.push({
          id,
          element: 'C',
          position: [x, y, z],
          color: '#1e293b', // Dark Carbon
          radius: 0.3
        });

        // Bonds
        // 1. To next in layer
        const nextInLayer = `n-${l}-${(i + 1) % atomsPerLayer}`;
        bonds.push({ id: `b-h-${l}-${i}`, source: id, target: nextInLayer, order: 1 });

        // 2. To next layer
        if (l < layers - 1) {
            const nextLayerIndex = (i) % atomsPerLayer; 
            const nextLayerId = `n-${l+1}-${nextLayerIndex}`;
            bonds.push({ id: `b-v-${l}-${i}`, source: id, target: nextLayerId, order: 1 });
        }
      }
    }

    return {
      title: "Carbon Nanotube Segment",
      description: "A rolled hexagonal lattice representing a single-walled carbon nanotube, highlighting structural rigidity.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.5} />;
};