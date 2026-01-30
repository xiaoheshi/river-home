import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Nexus from './pages/Nexus';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/nexus" element={<Nexus />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
