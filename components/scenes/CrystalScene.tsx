import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const CrystalScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    const size = 3;
    const spacing = 1.5;

    let idCounter = 0;
    const grid: string[][][] = [];

    // Generate grid
    for (let x = 0; x < size; x++) {
      grid[x] = [];
      for (let y = 0; y < size; y++) {
        grid[x][y] = [];
        for (let z = 0; z < size; z++) {
          const id = `atom-${idCounter++}`;
          grid[x][y][z] = id;
          
          const isCenter = x === 1 && y === 1 && z === 1;
          
          atoms.push({
            id,
            element: isCenter ? 'Metal' : 'Cl',
            position: [
              (x - size / 2 + 0.5) * spacing,
              (y - size / 2 + 0.5) * spacing,
              (z - size / 2 + 0.5) * spacing
            ],
            color: isCenter ? '#fbbf24' : '#38bdf8', // Gold center, Blue surrounding
            radius: isCenter ? 0.6 : 0.4
          });
        }
      }
    }

    // Generate bonds (neighbors)
    let bondId = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const source = grid[x][y][z];
          
          // Connect to +x, +y, +z to avoid duplicates
          if (x + 1 < size) bonds.push({ id: `b-${bondId++}`, source, target: grid[x + 1][y][z], order: 1 });
          if (y + 1 < size) bonds.push({ id: `b-${bondId++}`, source, target: grid[x][y + 1][z], order: 1 });
          if (z + 1 < size) bonds.push({ id: `b-${bondId++}`, source, target: grid[x][y][z + 1], order: 1 });
        }
      }
    }

    return {
      title: "Perovskite Lattice Structure",
      description: "A idealized representation of a crystal lattice showing symmetry and connectivity typical of solid-state materials.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.2} />;
};