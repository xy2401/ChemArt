import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const DNAScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    
    const basePairs = 12;
    const radius = 2.0;
    const rise = 0.6; // Vertical distance between pairs
    const rotationPerStep = Math.PI / 5; // ~36 degrees
    
    for (let i = 0; i < basePairs; i++) {
        const angle = i * rotationPerStep;
        const y = (i - basePairs / 2) * rise;

        // --- Strand A (Sugar-Phosphate Backbone) ---
        const aId = `backbone-a-${i}`;
        const ax = Math.cos(angle) * radius;
        const az = Math.sin(angle) * radius;
        
        atoms.push({
            id: aId,
            element: 'P',
            position: [ax, y, az],
            color: '#fb7185', // Rose 400 (Phosphate)
            radius: 0.5
        });

        // --- Strand B (Sugar-Phosphate Backbone) ---
        // Offset by PI + minor groove adjustment (approx)
        const offset = Math.PI + 0.5; 
        const bId = `backbone-b-${i}`;
        const bx = Math.cos(angle + offset) * radius;
        const bz = Math.sin(angle + offset) * radius;

        atoms.push({
            id: bId,
            element: 'P',
            position: [bx, y, bz],
            color: '#fb7185', // Rose 400
            radius: 0.5
        });

        // --- Nucleobases (Connecting toward center) ---
        const innerRadius = 0.8;
        
        // Base A attached to Strand A
        const baseAId = `base-a-${i}`;
        const bax = Math.cos(angle) * innerRadius;
        const baz = Math.sin(angle) * innerRadius;
        atoms.push({
            id: baseAId,
            element: 'N',
            position: [bax, y, baz],
            color: i % 2 === 0 ? '#2dd4bf' : '#818cf8', // Teal (A/T) or Indigo (C/G)
            radius: 0.35
        });

        // Base B attached to Strand B
        const baseBId = `base-b-${i}`;
        const bbx = Math.cos(angle + offset) * innerRadius;
        const bbz = Math.sin(angle + offset) * innerRadius;
        atoms.push({
            id: baseBId,
            element: 'N',
            position: [bbx, y, bbz],
            color: i % 2 === 0 ? '#818cf8' : '#2dd4bf', // Complementary
            radius: 0.35
        });

        // --- Bonds ---
        // Backbone vertical connections
        if (i > 0) {
             bonds.push({ id: `bb-a-v-${i}`, source: `backbone-a-${i-1}`, target: aId, order: 1 });
             bonds.push({ id: `bb-b-v-${i}`, source: `backbone-b-${i-1}`, target: bId, order: 1 });
        }

        // Backbone to Base
        bonds.push({ id: `b-a-base-${i}`, source: aId, target: baseAId, order: 1 });
        bonds.push({ id: `b-b-base-${i}`, source: bId, target: baseBId, order: 1 });

        // Hydrogen Bond (Base to Base) - Represented as thick bond here
        bonds.push({ id: `h-bond-${i}`, source: baseAId, target: baseBId, order: 1 });
    }

    return {
      title: "Deoxyribonucleic Acid (DNA)",
      description: "The molecule of life. A double helix formed by base pairs attached to a sugar-phosphate backbone.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.2} />;
};