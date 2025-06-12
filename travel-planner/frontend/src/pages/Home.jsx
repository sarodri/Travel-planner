import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate = useNavigate();
  
    return (
        <div className="container">
        <h1>¡Bienvenido a tu Planificador de Viajes!</h1>
        <p>Elige una opción para comenzar a planear tus viajes y descubrir destinos increíbles.</p>
      
        <div className="card-grid">
          <div className="card">
            <h2 className="card-title">Prepara tu Destino</h2>
            <p className="card-description">
              Explora países por continente, consulta información detallada y elige tu próximo destino.
            </p>
            <button  onClick={() => navigate('/destinations')} className="card-button">Ir a Destinations</button>
          </div>
      
          <div className="card">
            <h2 className="card-title">Consulta tus Planes</h2>
            <p className="card-description">
              Revisa y administra los itinerarios que has planeado para tus viajes.
            </p>
            <button  onClick={() => navigate('/itinerary')} className="card-button">Ir a Itinerary</button>
          </div>
        </div>
      </div>
    );
  };

export default Home;