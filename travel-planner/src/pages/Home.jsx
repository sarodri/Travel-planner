import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

const Home = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
        {/* Título */}
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          ¡Bienvenido a tu Planificador de Viajes!
        </h1>
  
        {/* Texto introductorio */}
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Elige una opción para comenzar a planear tus viajes y descubrir destinos increíbles.
        </p>
  
        {/* Contenedor de las tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta 1: Prepara tu destino */}
          <div className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Prepara tu Destino</h2>
            <p className="text-gray-700 mb-4">
              Explora países por continente, consulta información detallada y elige tu próximo destino.
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Ir a Destinations
            </button>
          </div>
  
          {/* Tarjeta 2: Consulta tus planes */}
          <div className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Consulta tus Planes</h2>
            <p className="text-gray-700 mb-4">
              Revisa y administra los itinerarios que has planeado para tus viajes.
            </p>
            <button
              onClick={() => navigate('/itinerary')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Ir a Itinerary
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Home;