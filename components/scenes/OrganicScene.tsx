import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const OrganicScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    
    // Create a complex ring structure (Porcea-like)
    const numPoints = 6;
    const radius = 2.0;
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const id = `c-${i}`;
        atoms.push({
            id,
            element: 'C',
            position: [x, y, 0],
            color: '#334155', // Slate 700 (Carbon)
            radius: 0.5
        });

        // Add functional groups sticking out
        const fX = Math.cos(angle) * (radius + 1);
        const fY = Math.sin(angle) * (radius + 1);
        const fId = `f-${i}`;
        atoms.push({
            id: fId,
            element: i % 2 === 0 ? 'O' : 'H',
            position: [fX, fY, i % 2 === 0 ? 0.5 : -0.5],
            color: i % 2 === 0 ? '#ef4444' : '#f8fafc', // Red or White
            radius: i % 2 === 0 ? 0.4 : 0.25
        });

        bonds.push({ id: `b-f-${i}`, source: id, target: fId, order: 1 });

        // Connect ring
        const nextId = `c-${(i + 1) % numPoints}`;
        bonds.push({ id: `b-r-${i}`, source: id, target: nextId, order: 2 });
    }

    // Central Metal
    atoms.push({
        id: 'center-fe',
        element: 'Fe',
        position: [0, 0, 0],
        color: '#f59e0b',
        radius: 0.7
    });

    // Connect center to ring nitrogens (simulated as carbons here for simplicity)
    for (let i = 0; i < numPoints; i++) {
         bonds.push({ id: `b-c-${i}`, source: 'center-fe', target: `c-${i}`, order: 1 });
    }

    return {
      title: "Heme-like Macrocycle",
      description: "An organic metallic complex showing coordination geometry common in biological catalysis.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.3} />;
};