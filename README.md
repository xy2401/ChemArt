# ChemArt: Nature Reimagined (分子美学)

> A high-fidelity 3D visualization suite recreating the aesthetic of high-end scientific journals using Three.js.
>
> 这是一个高保真 3D 可视化套件，使用 Three.js 重现顶级科学期刊（如 Nature Chemistry）的视觉美学。

![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20Three.js-indigo)
  
## 🧪 Overview (项目概述)

**ChemArt** represents the intersection of rigorous science and digital art. It moves away from standard "ball-and-stick" models found in textbooks, aiming instead for the glossy, depth-rich, and cinematic look found in cover art of scientific publications.

**ChemArt** 代表了严谨科学与数字艺术的交汇。它摆脱了教科书中标准的“球棍”模型，转而追求科学出版物封面艺术中常见的光泽感、景深和电影级视觉效果。

### Key Features (核心功能)

*   **Procedural Scenes (程序化场景)**: Mathematically generated geometry for complex structures.
    *   🧬 **DNA Helix**: Double helix with sugar-phosphate backbones and base pairs.
    *   ⚽ **Buckyball (C60)**: Truncated icosahedron geometry.
    *   🧪 **Nanotubes & Graphene**: Hexagonal carbon lattices.
    *   🩸 **Red Blood Cell**: Parametric mesh based on the Evans & Fung (1972) formula.
*   **Cinematic Rendering (电影级渲染)**:
    *   Real-time post-processing including **Depth of Field (DoF)**, **Bloom (Glow)**, **Vignette**, and **Film Grain**.
    *   Physically based materials (PBR) simulating clear coats and subsurface scattering.
*   **Bilingual Interface (双语界面)**: Seamless switching between English and Chinese.

## 🛠 Tech Stack (技术栈)

*   **Frontend**: React 18, TypeScript, Vite
*   **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Three.js)
*   **Styling**: Tailwind CSS
*   **Post-Processing**: `@react-three/postprocessing`

## 🚀 Getting Started (快速开始)

### Prerequisites (前置要求)

*   Node.js (v18 or higher recommended)

### Installation (安装)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/chemart.git
    cd chemart
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎨 Visualization Gallery (可视化库)

The application includes the following preset visualizations:

1.  **Crystal Lattice (晶格结构)**: Perovskite-inspired cubic structure.
2.  **Organic Macrocycle (大环分子)**: Heme-like organometallic complex.
3.  **Carbon Nanotube (碳纳米管)**: Cylindrical carbon allotrope.
4.  **Graphene (石墨烯)**: 2D hexagonal atomic sheet.
5.  **C60 Fullerene (富勒烯)**: The classic "soccer ball" molecule.
6.  **DNA (脱氧核糖核酸)**: Biopolymer double helix.
7.  **Erythrocyte (红细胞)**: Accurate biconcave disc model.
8.  **Caffeine (咖啡因)**: The world's favorite alkaloid.

## 📄 License

This project is licensed under the MIT License.

---

*Designed for those who see the beauty in bonds.*