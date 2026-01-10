import React from 'react';

export const Globe: React.FC = () => {
  // Sanmenxia Coordinates: 34.77° N, 111.20° E
  // We need to convert spherical coordinates to Cartesian for CSS 3D positioning
  // Radius = 100px (assuming globe size is 200px)
  // CSS 3D coordinate system: Y is down, Z is out towards viewer, X is right
  // Standard Math: Y is up, X is right, Z is out
  // We'll adapt: Y (CSS) = -Y (Math), X (CSS) = X (Math), Z (CSS) = Z (Math)
  
  const R = 90; // Slightly smaller than container radius (100) to keep inside
  const lat = 34.77 * (Math.PI / 180);
  const lon = 111.20 * (Math.PI / 180);

  // Calculate position
  // In 3D space with Y up:
  // y = R * sin(lat)
  // x = R * cos(lat) * sin(lon)
  // z = R * cos(lat) * cos(lon)
  
  // Adjust for CSS (Y is down) and initial rotation
  // Let's assume the globe starts with 0,0 at center front (Z=R)
  // Actually, standard sphere mapping:
  // x = R * cos(lat) * sin(lon)
  // z = R * cos(lat) * cos(lon) 
  // y = -R * sin(lat) (negative because CSS Y is down)
  
  const x = R * Math.cos(lat) * Math.sin(lon);
  const y = -R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.cos(lon);

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center perspective-[1000px]">
      <style>{`
        @keyframes spin {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to { transform: rotateY(360deg) rotateX(15deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
        .globe-container {
          transform-style: preserve-3d;
          animation: spin 20s linear infinite;
        }
        .globe-container:hover {
          animation-play-state: paused;
        }
        .ring-h {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(45, 212, 191, 0.3);
          border-radius: 50%;
          transform-style: preserve-3d;
          box-shadow: 0 0 10px rgba(45, 212, 191, 0.1);
        }
        .ring-v {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 50%;
          transform-style: preserve-3d;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
        }
        .marker {
            transform-style: preserve-3d;
        }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-full blur-3xl" />
      
      {/* Globe Wrapper */}
      <div className="globe-container relative w-[200px] h-[200px]">
        {/* Core Glow */}
        <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-md transform translate-z-[-50px]" />

        {/* Latitude Rings (Horizontal) */}
        {/* Equator */}
        <div className="ring-h w-[200px] h-[200px] -ml-[100px] -mt-[100px] border-teal-400/40" 
             style={{ transform: 'rotateX(90deg)' }} />
        {/* +30 deg */}
        <div className="ring-h w-[173px] h-[173px] -ml-[86.5px] -mt-[86.5px] border-teal-400/20" 
             style={{ transform: 'translateY(-50px) rotateX(90deg)' }} />
        {/* -30 deg */}
        <div className="ring-h w-[173px] h-[173px] -ml-[86.5px] -mt-[86.5px] border-teal-400/20" 
             style={{ transform: 'translateY(50px) rotateX(90deg)' }} />
        {/* +60 deg */}
        <div className="ring-h w-[100px] h-[100px] -ml-[50px] -mt-[50px] border-teal-400/10" 
             style={{ transform: 'translateY(-86.6px) rotateX(90deg)' }} />
        {/* -60 deg */}
        <div className="ring-h w-[100px] h-[100px] -ml-[50px] -mt-[50px] border-teal-400/10" 
             style={{ transform: 'translateY(86.6px) rotateX(90deg)' }} />

        {/* Longitude Rings (Vertical) */}
        {/* 0 deg */}
        <div className="ring-v w-[200px] h-[200px] -ml-[100px] -mt-[100px]" />
        {/* 45 deg */}
        <div className="ring-v w-[200px] h-[200px] -ml-[100px] -mt-[100px]" style={{ transform: 'rotateY(45deg)' }} />
        {/* 90 deg */}
        <div className="ring-v w-[200px] h-[200px] -ml-[100px] -mt-[100px]" style={{ transform: 'rotateY(90deg)' }} />
        {/* 135 deg */}
        <div className="ring-v w-[200px] h-[200px] -ml-[100px] -mt-[100px]" style={{ transform: 'rotateY(135deg)' }} />

        {/* Location Marker: Sanmenxia */}
        <div 
          className="marker absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center group"
          style={{ 
            transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(-${lon}rad)`, // Rotate marker to face out? No, just position is enough
          }}
        >
          {/* Dot */}
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] relative z-10" />
          
          {/* Pulse */}
          <div className="absolute w-2 h-2 bg-teal-400 rounded-full animate-[pulse-ring_2s_infinite]" />
          
          {/* Label Line */}
          <div className="absolute left-1/2 bottom-full w-[1px] h-8 bg-gradient-to-t from-white/50 to-transparent origin-bottom transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
          
          {/* Label Card */}
          <div className="absolute left-1/2 bottom-[35px] -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/20 rounded-md backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-xs font-bold text-teal-300">Sanmenxia</span>
            <div className="text-[10px] text-white/60">Henan, CN</div>
          </div>
        </div>
      </div>
      
      {/* Decorative Outer Rings (2D) */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-125 animate-pulse" />
      <div className="absolute inset-0 border border-dashed border-white/5 rounded-full scale-150 animate-[spin_60s_linear_infinite]" />
    </div>
  );
};
