import React from 'react';

const WorldMap = ({ onSelectRegion }) => {
  return (
    <svg
      viewBox="0 0 2000 1001"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* África */}
      <path
        d="M960 480 L980 520 L970 580 L940 580 L930 520 Z"
        className="fill-yellow-500 cursor-pointer hover:opacity-80 transition"
        onClick={() => onSelectRegion('africa')}
      />
      <text x="940" y="600" className="fill-black text-sm">África</text>

      {/* América */}
      <path
        d="M400 300 L420 400 L410 500 L380 500 L370 400 Z"
        className="fill-green-500 cursor-pointer hover:opacity-80 transition"
        onClick={() => onSelectRegion('americas')}
      />
      <text x="380" y="520" className="fill-black text-sm">América</text>

      {/* Asia */}
      <path
        d="M1300 300 L1320 400 L1310 500 L1280 500 L1270 400 Z"
        className="fill-red-500 cursor-pointer hover:opacity-80 transition"
        onClick={() => onSelectRegion('asia')}
      />
      <text x="1280" y="520" className="fill-black text-sm">Asia</text>

      {/* Europa */}
      <path
        d="M1100 200 L1120 240 L1110 280 L1080 280 L1070 240 Z"
        className="fill-blue-500 cursor-pointer hover:opacity-80 transition"
        onClick={() => onSelectRegion('europe')}
      />
      <text x="1080" y="300" className="fill-black text-sm">Europa</text>

      {/* Oceanía */}
      <path
        d="M1600 700 L1620 740 L1610 780 L1580 780 L1570 740 Z"
        className="fill-purple-500 cursor-pointer hover:opacity-80 transition"
        onClick={() => onSelectRegion('oceania')}
      />
      <text x="1580" y="800" className="fill-black text-sm">Oceanía</text>
    </svg>
  );
};

export default WorldMap;
