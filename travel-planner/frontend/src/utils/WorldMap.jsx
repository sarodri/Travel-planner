import React from 'react';

const WorldMap = ({ onSelectRegion }) => {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto max-w-4xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* África */}
      <rect
        x="300" y="200" width="80" height="60"
        className="fill-yellow-400 cursor-pointer hover:fill-yellow-500 transition"
        onClick={() => onSelectRegion('africa')}
      />
      <text x="310" y="240" className="text-black text-sm">África</text>

      {/* América */}
      <rect
        x="100" y="150" width="80" height="100"
        className="fill-green-400 cursor-pointer hover:fill-green-500 transition"
        onClick={() => onSelectRegion('americas')}
      />
      <text x="110" y="200" className="text-black text-sm">América</text>

      {/* Asia */}
      <rect
        x="500" y="150" width="100" height="80"
        className="fill-red-400 cursor-pointer hover:fill-red-500 transition"
        onClick={() => onSelectRegion('asia')}
      />
      <text x="520" y="190" className="text-black text-sm">Asia</text>

      {/* Europa */}
      <rect
        x="450" y="100" width="50" height="50"
        className="fill-blue-400 cursor-pointer hover:fill-blue-500 transition"
        onClick={() => onSelectRegion('europe')}
      />
      <text x="455" y="130" className="text-black text-sm">Europa</text>

      {/* Oceanía */}
      <rect
        x="650" y="250" width="60" height="40"
        className="fill-purple-400 cursor-pointer hover:fill-purple-500 transition"
        onClick={() => onSelectRegion('oceania')}
      />
      <text x="655" y="275" className="text-black text-sm">Oceanía</text>
    </svg>
  );
};

export default WorldMap;