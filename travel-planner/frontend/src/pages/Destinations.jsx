import React, { useState, useEffect } from "react";
import { getCountriesByRegion } from "../services/api"; 
import CreatePlan from "../utils/CreatePlan";

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [showCountries, setShowCountries] = useState(true);
  const [plans, setPlans] = useState([]);

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
  const handlePlanCreated = (newPlan) => {
    setPlans([...plans, newPlan]); // Agrega el nuevo plan a la lista
  };

  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Explora Destinos</h1>

       {/* Selección por región */}
       <div className="flex justify-center">
        <select
          className="border p-2 rounded w-1/2 text-center text-gray-700 bg-white shadow-sm"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Selecciona un continente</option>
          <option value="africa">África</option>
          <option value="americas">América</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceanía</option>
        </select>
      </div>

      {/* Mostrar países como tarjetas */}
      {showCountries && countries.length > 0 && (
        <div className="my-grid">
  {countries.map((country) => (
    <div
      key={country.cca3}
      className="border p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center text-center w-full h-auto min-h-[25vh]"
      onClick={() => handleSelectCountry(country)}
    >
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-16 h-10 mb-2 rounded shadow"
      />
      <h3 className="text-lg font-semibold text-blue-600">{country.name.common}</h3>
      <p className="text-sm text-gray-600">{country.capital ? country.capital[0] : "No disponible"}</p>
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

      {/* Crear un nuevo plan con la ciudad predefinida */}
      {selectedCity && <CreatePlan selectedCity={selectedCity} onPlanCreated={handlePlanCreated}/>}
    </div>
  );
};

export default Destinations;

