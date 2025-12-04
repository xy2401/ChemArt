import React, { useMemo } from 'react';
import { MoleculeStructure, AtomData, BondData } from '../../types';
import { MoleculeRenderer } from '../MoleculeRenderer';

export const CaffeineScene: React.FC = () => {
  const data: MoleculeStructure = useMemo(() => {
    // 1,3,7-Trimethylxanthine
    // Manually approximated 2D planar coords projected to 3D
    
    // Core Purine Ring System (Two rings: 6-membered pyrimidine + 5-membered imidazole)
    const atoms: AtomData[] = [
        // 6-Membered Ring
        { id: 'n1', element: 'N', position: [-1.2, -0.7, 0], color: '#3b82f6', radius: 0.4 }, // N1 (Blue)
        { id: 'c2', element: 'C', position: [0, -1.4, 0], color: '#334155', radius: 0.5 },    // C2 (Grey)
        { id: 'n3', element: 'N', position: [1.2, -0.7, 0], color: '#3b82f6', radius: 0.4 },  // N3 (Blue)
        { id: 'c4', element: 'C', position: [1.2, 0.7, 0], color: '#334155', radius: 0.5 },    // C4
        { id: 'c5', element: 'C', position: [0, 1.4, 0], color: '#334155', radius: 0.5 },      // C5
        { id: 'c6', element: 'C', position: [-1.2, 0.7, 0], color: '#334155', radius: 0.5 },   // C6

        // 5-Membered Ring Fused at C4-C5
        { id: 'n7', element: 'N', position: [0, 2.8, 0], color: '#3b82f6', radius: 0.4 },     // N7 (Blue)
        { id: 'c8', element: 'C', position: [1.9, 2.1, 0], color: '#334155', radius: 0.5 },    // C8
        { id: 'n9', element: 'N', position: [2.1, 0.7, 0], color: '#3b82f6', radius: 0.4 },    // N9 (Blue)

        // Functional Groups (Oxygens)
        { id: 'o2', element: 'O', position: [0, -2.8, 0], color: '#e11d48', radius: 0.45 },   // O on C2
        { id: 'o6', element: 'O', position: [-2.4, 1.4, 0], color: '#e11d48', radius: 0.45 }, // O on C6

        // Methyl Groups (CH3) - Represented as single large Carbon for style, or C + H
        // N1 Methyl
        { id: 'm1', element: 'C', position: [-2.5, -1.4, 0.5], color: '#334155', radius: 0.5 }, 
        // N3 Methyl
        { id: 'm3', element: 'C', position: [2.5, -1.4, -0.5], color: '#334155', radius: 0.5 },
        // N7 Methyl
        { id: 'm7', element: 'C', position: [-0.5, 4.0, 0.5], color: '#334155', radius: 0.5 },
    ];

    const bonds: BondData[] = [
        // 6-Ring
        { id: 'b1', source: 'n1', target: 'c2', order: 1 },
        { id: 'b2', source: 'c2', target: 'n3', order: 1 },
        { id: 'b3', source: 'n3', target: 'c4', order: 1 },
        { id: 'b4', source: 'c4', target: 'c5', order: 2 }, // Double bond shared
        { id: 'b5', source: 'c5', target: 'c6', order: 1 },
        { id: 'b6', source: 'c6', target: 'n1', order: 1 },

        // 5-Ring (Fused at C4-C5)
        { id: 'b7', source: 'c5', target: 'n7', order: 1 },
        { id: 'b8', source: 'n7', target: 'c8', order: 1 },
        { id: 'b9', source: 'c8', target: 'n9', order: 2 }, // Double bond
        { id: 'b10', source: 'n9', target: 'c4', order: 1 },

        // Oxygens (Double bonds)
        { id: 'b-o2', source: 'c2', target: 'o2', order: 2 },
        { id: 'b-o6', source: 'c6', target: 'o6', order: 2 },

        // Methyls
        { id: 'b-m1', source: 'n1', target: 'm1', order: 1 },
        { id: 'b-m3', source: 'n3', target: 'm3', order: 1 },
        { id: 'b-m7', source: 'n7', target: 'm7', order: 1 },
    ];

    return {
      title: "Caffeine",
      description: "1,3,7-Trimethylxanthine. The world's most popular psychoactive drug, featuring a fused pyrimidine-imidazole ring system.",
      atoms,
      bonds
    };
  }, []);

  return <MoleculeRenderer data={data} scale={1.0} />;
};