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
  Portals,
} from './components/canvas';
import { HomeRegion, WorksRegion, NexusRegion, AboutRegion } from './components/regions';
import { Navbar } from './components/ui/Navbar';
import { MobileNav } from './components/ui/MobileNav';
import { FallbackPage } from './components/ui/FallbackPage';
import { useNavigationStore, Region } from './stores/navigationStore';
import { useDevicePerformance } from './hooks';

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
  const performance = useDevicePerformance();

  if (!performance.supportsWebGL) {
    return <FallbackPage />;
  }

  return (
    <>
      <NavigationSync />
      <Navbar />
      <MobileNav />

      {/* 3D 场景 */}
      <Scene>
        <Environment />
        <CameraController />
        <Geometries />
        <Particles performanceTier={performance.tier} />
        <Connections />
        <Effects />
        <HomeRegion />
        <WorksRegion />
        <NexusRegion />
        <AboutRegion />
        <Portals />
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
