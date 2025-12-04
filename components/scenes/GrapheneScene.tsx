
import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const GrapheneScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    
    // Hexagonal grid parameters
    const rows = 6;
    const cols = 6;
    const bondLength = 1.42; // standard C-C in graphene
    
    // Basis vectors for hexagonal lattice
    // v1 = (3/2 * a, sqrt(3)/2 * a)
    // But easier to think in terms of staggering rows
    const dx = bondLength * Math.sqrt(3); // Horizontal spacing between same-parity columns
    const dy = bondLength * 1.5; // Vertical spacing between rows
    
    let atomId = 0;
    const grid: string[][] = []; // Store IDs to connect

    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      const y = (r - rows / 2) * dy;
      
      // Stagger columns
      const xOffset = (r % 2) * (dx / 2);
      
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * dx + xOffset;
        
        const id = `c-${r}-${c}`;
        grid[r][c] = id;
        
        atoms.push({
          id,
          element: 'C',
          position: [x, y, 0],
          color: '#1e293b', // Slate 800
          radius: 0.35
        });
      }
    }

    // Create Bonds
    // In a hexagonal lattice, each atom connects to 3 neighbors (except edges)
    // Due to the rectangular loop construction, we just need to connect specific directions
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         const source = grid[r][c];

         // 1. Connect to next column in same row? No, hexagons don't have horizontal bonds directly in this orientation usually
         // Let's use distance based connecting for simplicity on the edges, or specific logic
         // Logic for "pointy top" hexagons:
         // Even rows connect to (r+1, c) and (r+1, c-1)
         // Odd rows connect to (r+1, c) and (r+1, c+1)
         
         // Actually, let's just use distance check for robustness, 
         // since lattice math indices can be tricky to get perfect without visual debug.
         // 1.5 * bondLength is threshold
         
         // Optimization: Only check neighbors "forward" in the array to avoid duplicates
      }
    }
    
    // Re-loop for distance-based bonds (easier for hexagonal grid generation)
    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const p1 = atoms[i].position;
            const p2 = atoms[j].position;
            const dist = Math.sqrt(
                Math.pow(p1[0] - p2[0], 2) + 
                Math.pow(p1[1] - p2[1], 2) + 
                Math.pow(p1[2] - p2[2], 2)
            );
            
            // Allow small epsilon for floating point math
            if (dist > 0.1 && dist < bondLength * 1.1) {
                bonds.push({
                    id: `b-${atoms[i].id}-${atoms[j].id}`,
                    source: atoms[i].id,
                    target: atoms[j].id,
                    order: 1 // Delocalized really, but 1 for viz
                });
            }
        }
    }

    return {
      title: "Graphene Sheet",
      description: "A single layer of carbon atoms arranged in a two-dimensional honeycomb lattice. Known for exceptional strength and conductivity.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.0} />;
};
