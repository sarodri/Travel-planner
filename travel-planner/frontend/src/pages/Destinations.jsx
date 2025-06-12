import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import { getCountriesByRegion } from "../services/api"; 
import CreatePlan from "../utils/CreatePlan";
import useToggleMenu from "../hooks/useToggleMenu"
import WorldMap from "../utils/WorldMap";

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [showCountries, setShowCountries] = useState(true);
  const [plans, setPlans] = useState([]);
  const { isOpen, toggleMenu } = useToggleMenu();

   // Obtenemos todos los países por región
   useEffect(() => {
    const fetchCountries = async () => {
      if (!selectedRegion) {
        setCountries([]); // Vaciar la lista si no hay región seleccionada
        return;
      }
      try {
        const data = await getCountriesByRegion(selectedRegion);
        setCountries(data);
        setSelectedCountry(null); // Reiniciar selección de país
        setSelectedCity(""); // Reiniciar ciudad seleccionada
        setShowCountries(true);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  // Seleccionamos país y guardamos la capital
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity(country.name.common);
    setShowCountries(false);
  };

  const  handleSelectRegion = (region) => {
    console.log("Región seleccionada:", region);
    setSelectedRegion (region)
  };

  const handlePlanCreated = (newPlan) => {
    setPlans([...plans, newPlan]); // Agrega el nuevo plan a la lista
  };

  
  return (
    <>
      <span><NavLink to="/" onClick={toggleMenu}>Inicio</NavLink></span>
      <div className="w-full max-w-7xl mx-auto mb-4 p-8 space-y-8 flex flex-col items-center">
        {/* Título centrado */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">Explora Destinos</h1>

        {/* Contenedor de select y formulario alineados al inicio */}
          <div className="w-full flex flex-col items-start gap-4">
        {/* Selección por región */}
            {/* Mapa interactivo de continentes */}
            <WorldMap onSelectRegion={handleSelectRegion} />



        {/* Mostrar formulario cuando CreatePlan está abierto */}
          {selectedCity && (
            <div className="w-full flex justify-start">
              <CreatePlan selectedCity={selectedCity} onPlanCreated={handlePlanCreated} />
            </div>
          )}
          </div>

        {/* Mostrar países como tarjetas */}
        {showCountries && countries.length > 0 && (
          <div className="my-grid">
            {countries.map((country) => (
              <div
                key={country.cca3}
                className="border p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:scale-105 transform transition duration-300 w-full h-full min-h-[25vh] gap-4"
                onClick={() => handleSelectCountry(country)}
              >
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="flag"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-blue-600">{country.name.common}</h3>
                  <p className="text-sm text-gray-600">{country.capital ? country.capital[0] : "No disponible"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mostrar lugares turísticos (futura implementación) */}
        {selectedCountry && (
          <div className="mt-6 p-4 border rounded">
            <h2 className="text-xl font-bold">Lugares Turísticos en {selectedCountry.name.common}</h2>
            <p className="text-gray-500">(Próximamente)</p>
          </div>
        )}

      </div>
    </>
  );
};

export default Destinations;


