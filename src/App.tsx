// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Scene,
  Environment,
  CameraController,
  Geometries,
  Particles,
  Connections,
  Effects,
} from './components/canvas';
import { useNavigationStore, Region } from './stores/navigationStore';

function NavigationSync() {
  const location = useLocation();
  const setRegion = useNavigationStore((s) => s.setRegion);

  useEffect(() => {
    const pathToRegion: Record<string, Region> = {
      '/': 'home',
      '/works': 'works',
      '/nexus': 'nexus',
      '/about': 'about',
    };
    const region = pathToRegion[location.pathname] || 'home';
    setRegion(region);
  }, [location.pathname, setRegion]);

  return null;
}

function App() {
  return (
    <>
      <NavigationSync />

      {/* 3D 场景 */}
      <Scene>
        <Environment />
        <CameraController />
        <Geometries />
        <Particles />
        <Connections />
        <Effects />
      </Scene>

      {/* 路由占位（后续添加实际内容） */}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/works" element={null} />
        <Route path="/nexus" element={null} />
        <Route path="/about" element={null} />
      </Routes>
    </>
  );
}

export default App;
