
export interface AtomData {
  id: string;
  element: string;
  position: [number, number, number];
  color: string;
  radius: number;
}

export interface BondData {
  id: string;
  source: string; // Atom ID
  target: string; // Atom ID
  order: number; // 1, 2, 3
}

export interface MoleculeStructure {
  atoms: AtomData[];
  bonds: BondData[];
  title: string;
  description: string;
}

export enum SceneType {
  CRYSTAL_LATTICE = 'CRYSTAL_LATTICE',
  ORGANIC_MACRO = 'ORGANIC_MACRO',
  NANO_TUBE = 'NANO_TUBE',
  DNA_HELIX = 'DNA_HELIX',
  CAFFEINE = 'CAFFEINE',
  GRAPHENE = 'GRAPHENE',
  BUCKYBALL = 'BUCKYBALL',
  RBC = 'RBC'
}

export interface SceneConfig {
  id: SceneType;
  label: string;
  label_cn: string;
  description: string;
  description_cn: string;
}

// Augment JSX namespace to include React Three Fiber elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      meshPhysicalMaterial: any;
      cylinderGeometry: any;
      latheGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      color: any;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        mesh: any;
        group: any;
        meshPhysicalMaterial: any;
        cylinderGeometry: any;
        latheGeometry: any;
        ambientLight: any;
        spotLight: any;
        pointLight: any;
        color: any;
      }
    }
  }
}