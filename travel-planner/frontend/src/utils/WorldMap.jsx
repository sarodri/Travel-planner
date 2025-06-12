import React, { useState } from 'react';

const WorldMap = ({ onSelectRegion }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    setSelectedRegion(regionId);
    if (onSelectRegion) {
      onSelectRegion(regionId);
    }
  };

  const regions = {
    americas: {
      name: 'América',
      color: '#10B981', // Verde esmeralda
      hoverColor: '#059669',
      countries: ['Estados Unidos', 'Canadá', 'Brasil', 'Argentina', 'México']
    },
    europe: {
      name: 'Europa',
      color: '#3B82F6', // Azul
      hoverColor: '#2563EB',
      countries: ['Francia', 'España', 'Italia', 'Alemania', 'Reino Unido']
    },
    africa: {
      name: 'África',
      color: '#F59E0B', // Ámbar
      hoverColor: '#D97706',
      countries: ['Sudáfrica', 'Egipto', 'Marruecos', 'Kenia', 'Nigeria']
    },
    asia: {
      name: 'Asia',
      color: '#8B5CF6', // Púrpura
      hoverColor: '#7C3AED',
      countries: ['China', 'Japón', 'India', 'Tailandia', 'Corea del Sur']
    },
    oceania: {
      name: 'Oceanía',
      color: '#06B6D4', // Cian
      hoverColor: '#0891B2',
      countries: ['Australia', 'Nueva Zelanda', 'Fiyi', 'Papúa Nueva Guinea']
    }
  };

  const getRegionStyle = (regionId) => {
    const region = regions[regionId];
    const isHovered = hoveredRegion === regionId;
    const isSelected = selectedRegion === regionId;
    
    return {
      fill: isSelected ? region.hoverColor : (isHovered ? region.hoverColor : region.color),
      stroke: isSelected ? '#FFF' : (isHovered ? '#FFF' : '#E5E7EB'),
      strokeWidth: isSelected ? '3' : (isHovered ? '2' : '1'),
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      filter: isHovered || isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none'
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Selecciona tu Destino
        </h2>
        <p className="text-gray-600">
          Haz clic en cualquier continente para explorar sus países
        </p>
      </div>

      {/* Contenedor del mapa */}
      <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-6 shadow-xl overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-200 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-12 h-12 bg-yellow-100 rounded-full"></div>
        </div>

        {/* SVG del mapa */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto relative z-10"
          style={{ maxHeight: '400px' }}
        >
          {/* Océanos de fondo */}
          <rect width="1000" height="500" fill="#E0F2FE" />
          
          {/* América */}
          <g
            onClick={() => handleRegionClick('americas')}
            onMouseEnter={() => setHoveredRegion('americas')}
            onMouseLeave={() => setHoveredRegion(null)}
            style={getRegionStyle('americas')}
          >
            {/* América del Norte */}
            <path d="M50 80 L180 60 L220 90 L190 140 L160 160 L120 150 L80 120 Z" />
            {/* América Central */}
            <path d="M160 160 L200 155 L210 170 L180 175 Z" />
            {/* América del Sur */}
            <path d="M180 175 L220 180 L240 220 L230 280 L200 320 L170 300 L160 250 L165 200 Z" />
          </g>

          {/* Europa */}
          <g
            onClick={() => handleRegionClick('europe')}
            onMouseEnter={() => setHoveredRegion('europe')}
            onMouseLeave={() => setHoveredRegion(null)}
            style={getRegionStyle('europe')}
          >
            <path d="M420 60 L480 55 L500 80 L490 110 L460 120 L430 115 L410 90 Z" />
            <path d="M450 100 L470 95 L480 110 L465 115 Z" />
          </g>

          {/* África */}
          <g
            onClick={() => handleRegionClick('africa')}
            onMouseEnter={() => setHoveredRegion('africa')}
            onMouseLeave={() => setHoveredRegion(null)}
            style={getRegionStyle('africa')}
          >
            <path d="M420 130 L480 125 L510 140 L520 200 L500 280 L470 320 L440 310 L410 250 L400 180 Z" />
          </g>

          {/* Asia */}
          <g
            onClick={() => handleRegionClick('asia')}
            onMouseEnter={() => setHoveredRegion('asia')}
            onMouseLeave={() => setHoveredRegion(null)}
            style={getRegionStyle('asia')}
          >
            {/* Asia Central y del Norte */}
            <path d="M520 50 L650 45 L720 60 L750 90 L740 130 L680 140 L620 135 L560 120 L510 100 Z" />
            {/* Asia del Sur */}
            <path d="M580 140 L640 135 L660 160 L650 180 L620 175 L590 165 Z" />
            {/* Asia Oriental */}
            <path d="M700 80 L780 75 L800 110 L790 150 L760 160 L730 145 L710 120 Z" />
          </g>

          {/* Oceanía */}
          <g
            onClick={() => handleRegionClick('oceania')}
            onMouseEnter={() => setHoveredRegion('oceania')}
            onMouseLeave={() => setHoveredRegion(null)}
            style={getRegionStyle('oceania')}
          >
            {/* Australia */}
            <path d="M700 280 L780 275 L800 300 L790 330 L750 340 L710 335 L690 310 Z" />
            {/* Nueva Zelanda */}
            <path d="M820 320 L835 315 L840 335 L830 340 L825 330 Z" />
            <path d="M825 345 L840 340 L845 360 L835 365 Z" />
            {/* Islas del Pacífico */}
            <circle cx="750" cy="250" r="3" />
            <circle cx="780" cy="240" r="2" />
            <circle cx="820" cy="260" r="2" />
          </g>

          {/* Etiquetas de continentes */}
          {hoveredRegion && (
            <text
              x="500"
              y="30"
              textAnchor="middle"
              className="fill-gray-800 text-xl font-bold"
              style={{ pointerEvents: 'none' }}
            >
              {regions[hoveredRegion].name}
            </text>
          )}
        </svg>

      </div>

    </div>
  );
};

export default WorldMap;