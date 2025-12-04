
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing';
import { SceneType, SceneConfig } from './types';
import { CrystalScene } from './components/scenes/CrystalScene';
import { OrganicScene } from './components/scenes/OrganicScene';
import { NanoScene } from './components/scenes/NanoScene';
import { DNAScene } from './components/scenes/DNAScene';
import { CaffeineScene } from './components/scenes/CaffeineScene';
import { GrapheneScene } from './components/scenes/GrapheneScene';
import { BuckyballScene } from './components/scenes/BuckyballScene';
import { RBCScene } from './components/scenes/RBCScene';

// Icons
const BeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>;
const HexagonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const MacroIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>;
const DnaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 12c-5.8-3.6-12-3.6-17.8 0"/><path d="M7 12c5.8 3.6 12 3.6 17.8 0"/><path d="M2 2c6.667 6 13.333 0 20 6"/></svg>;
const CoffeeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const SphereIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const DropletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-7-1.9-2.9-4-5.2-4-5.2S5.8 8.5 4 12c-2 3-2 5 0 7 2 2 5 3 8 3z"/></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;


const SCENES: SceneConfig[] = [
  { 
    id: SceneType.CRYSTAL_LATTICE, 
    label: 'Lattice',
    label_cn: '晶格结构',
    description: 'Crystalline solid state structure. Orderly arrangement.',
    description_cn: '晶体固态结构。展现原子的有序排列。'
  },
  { 
    id: SceneType.ORGANIC_MACRO, 
    label: 'Macrocycle',
    label_cn: '大环分子',
    description: 'Complex organometallic systems. Catalytic beauty.',
    description_cn: '复杂的有机金属系统。展现催化化学之美。'
  },
  { 
    id: SceneType.NANO_TUBE, 
    label: 'Nanotube',
    label_cn: '纳米管',
    description: 'Carbon allotrope formations. High tensile strength.',
    description_cn: '碳同素异形体结构。展现极高的抗拉强度。'
  },
  { 
    id: SceneType.GRAPHENE, 
    label: 'Graphene',
    label_cn: '石墨烯',
    description: '2D Hexagonal Lattice. High conductivity.',
    description_cn: '二维蜂窝状晶格。极高的导电性与强度。'
  },
  { 
    id: SceneType.BUCKYBALL, 
    label: 'C60',
    label_cn: '巴基球',
    description: 'Buckminsterfullerene. Spherical geometry.',
    description_cn: '富勒烯 C60。标志性的球形截角二十面体结构。'
  },
  { 
    id: SceneType.DNA_HELIX, 
    label: 'DNA',
    label_cn: 'DNA',
    description: 'Biological double helix polymer. The code of life.',
    description_cn: '生物双螺旋聚合物。生命的密码。'
  },
  { 
    id: SceneType.RBC, 
    label: 'RBC',
    label_cn: '红细胞',
    description: 'Red Blood Cell. Biconcave disc without nucleus.',
    description_cn: '红细胞。无细胞核的双凹圆盘状结构。'
  },
  { 
    id: SceneType.CAFFEINE, 
    label: 'Caffeine',
    label_cn: '咖啡因',
    description: '1,3,7-Trimethylxanthine. Stimulating alkaloid.',
    description_cn: '1,3,7-三甲基黄嘌呤。一种兴奋性生物碱。'
  }
];

const getSceneIcon = (id: SceneType) => {
  switch (id) {
    case SceneType.CRYSTAL_LATTICE: return <HexagonIcon />;
    case SceneType.ORGANIC_MACRO: return <MacroIcon />;
    case SceneType.NANO_TUBE: return <BeakerIcon />;
    case SceneType.GRAPHENE: return <GridIcon />;
    case SceneType.BUCKYBALL: return <SphereIcon />;
    case SceneType.DNA_HELIX: return <DnaIcon />;
    case SceneType.RBC: return <DropletIcon />;
    case SceneType.CAFFEINE: return <CoffeeIcon />;
    default: return <BeakerIcon />;
  }
};

const TRANSLATIONS = {
  en: {
    mainTitle: "Molecular",
    subTitle: "Aesthetics",
    tagline: "A tribute to scientific visualization. Reconstructing complex chemical systems with React Three Fiber.",
    version: "v1.5.0 • THREE.JS",
    moreBtn: "More",
    allScenesTitle: "Scene Catalog",
    selectScene: "Select a structure to visualize",
    snapshot: "Snapshot",
  },
  cn: {
    mainTitle: "分子",
    subTitle: "美学",
    tagline: "致敬科学可视化。使用 React Three Fiber 重构复杂的化学系统。",
    version: "v1.5.0 • THREE.JS",
    moreBtn: "更多",
    allScenesTitle: "场景目录",
    selectScene: "选择一个结构进行可视化",
    snapshot: "保存图片",
  }
};

const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneType>(SceneType.BUCKYBALL);
  const [lang, setLang] = useState<'en' | 'cn'>('cn'); 
  const [showSceneSelector, setShowSceneSelector] = useState(false);

  const t = TRANSLATIONS[lang];

  const renderActiveScene = () => {
    switch (currentScene) {
      case SceneType.CRYSTAL_LATTICE: return <CrystalScene />;
      case SceneType.ORGANIC_MACRO: return <OrganicScene />;
      case SceneType.NANO_TUBE: return <NanoScene />;
      case SceneType.GRAPHENE: return <GrapheneScene />;
      case SceneType.BUCKYBALL: return <BuckyballScene />;
      case SceneType.DNA_HELIX: return <DNAScene />;
      case SceneType.CAFFEINE: return <CaffeineScene />;
      case SceneType.RBC: return <RBCScene />;
      default: return <CrystalScene />;
    }
  };

  const getSceneDescription = () => {
      const scene = SCENES.find(s => s.id === currentScene);
      return {
        label: lang === 'cn' ? scene?.label_cn : scene?.label,
        description: lang === 'cn' ? scene?.description_cn : scene?.description
      };
  }

  const activeInfo = getSceneDescription();

  // Top 5 scenes for default bar
  const defaultScenes = SCENES.slice(0, 5);

  const handleSnapshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const sceneName = currentScene.toLowerCase();
        link.setAttribute('download', `chemart-${sceneName}-${timestamp}.png`);
        
        // Convert canvas data to URL
        // Note: preserveDrawingBuffer: true is required in Canvas gl props for this to work robustly
        link.setAttribute('href', canvas.toDataURL('image/png'));
        
        link.click();
    }
  };

  return (
    <div className="w-full h-screen relative bg-slate-900 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          gl={{ antialias: false, preserveDrawingBuffer: true }}
        >
          <color attach="background" args={['#0f172a']} />
          
          <Suspense fallback={null}>
            {/* Load HDR from local public directory */}
            <Environment files="/studio_small_03_1k.hdr" blur={0.8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Main Content */}
            <group position={[0, 0, 0]}>
               {renderActiveScene()}
            </group>

            {/* Lighting for that "Nature" Look */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} castShadow shadow-bias={-0.0001} />
            <pointLight position={[-10, -10, -10]} intensity={500} color="#60a5fa" />
            
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
            
            <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.1} color="#cbd5e1" />
          </Suspense>

          {/* Post Processing for Scientific "Glow" and Polish */}
          <EffectComposer enableNormalPass={false}>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.8} radius={0.6} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Noise opacity={0.02} />
          </EffectComposer>

          <OrbitControls 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        
        {/* Header */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 font-serif italic">
              {t.mainTitle} <span className="text-indigo-400 not-italic font-sans">{t.subTitle}</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md">
              {t.tagline}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 items-center">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs text-slate-300 font-mono hidden md:block">
                 {t.version}
               </div>

               {/* Snapshot Button */}
               <button 
                 onClick={handleSnapshot}
                 className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs text-slate-300 font-sans hover:bg-white/10 transition-colors hover:text-white"
                 title={t.snapshot}
               >
                 <CameraIcon />
                 <span className="hidden sm:inline">{t.snapshot}</span>
               </button>

               {/* Language Toggle */}
               <button 
                 onClick={() => setLang(l => l === 'en' ? 'cn' : 'en')}
                 className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs text-slate-300 font-sans hover:bg-white/10 transition-colors"
               >
                 <GlobeIcon />
                 {lang === 'en' ? '中文' : 'English'}
               </button>
            </div>
          </div>
        </header>

        {/* Footer / Controls */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto relative z-20">
          
          {/* Info Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-xs transition-all hover:bg-white/10">
            <h2 className="text-2xl text-white font-serif mb-2">{activeInfo?.label}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeInfo?.description}
            </p>
          </div>

          {/* Navigation Bar */}
          <nav className="flex flex-wrap justify-end gap-2 bg-slate-900/50 backdrop-blur-lg p-2 rounded-2xl border border-white/5 max-w-lg">
            {defaultScenes.map((scene) => (
               <button 
                  key={scene.id}
                  onClick={() => setCurrentScene(scene.id)}
                  className={`p-3 rounded-xl transition-all ${currentScene === scene.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  title={lang === 'cn' ? scene.label_cn : scene.label}
                >
                  {getSceneIcon(scene.id)}
                </button>
            ))}

            <div className="w-px bg-white/10 mx-1"></div>
            
            {/* More Button */}
            <button 
              onClick={() => setShowSceneSelector(true)}
              className="p-3 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-white/5"
              title={t.moreBtn}
            >
              <ListIcon />
            </button>
          </nav>
        </div>
      </div>

      {/* Full Screen Scene Catalog Modal */}
      {showSceneSelector && (
        <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 overflow-y-auto">
           <div className="w-full max-w-5xl">
             <div className="flex justify-between items-center mb-8">
               <div>
                  <h2 className="text-3xl font-serif text-white italic">{t.allScenesTitle}</h2>
                  <p className="text-slate-400 mt-1">{t.selectScene}</p>
               </div>
               <button 
                 onClick={() => setShowSceneSelector(false)}
                 className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
               >
                 <XIcon />
               </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {SCENES.map((scene) => (
                 <button
                   key={scene.id}
                   onClick={() => {
                     setCurrentScene(scene.id);
                     setShowSceneSelector(false);
                   }}
                   className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left group
                     ${currentScene === scene.id 
                       ? 'bg-indigo-600/20 border-indigo-500/50 hover:bg-indigo-600/30' 
                       : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                     }
                   `}
                 >
                   <div className={`p-3 rounded-lg ${currentScene === scene.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'}`}>
                      {getSceneIcon(scene.id)}
                   </div>
                   <div>
                      <h3 className={`font-semibold text-lg mb-1 ${currentScene === scene.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                        {lang === 'cn' ? scene.label_cn : scene.label}
                      </h3>
                      <p className="text-sm text-slate-400 leading-snug">
                        {lang === 'cn' ? scene.description_cn : scene.description}
                      </p>
                   </div>
                 </button>
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
