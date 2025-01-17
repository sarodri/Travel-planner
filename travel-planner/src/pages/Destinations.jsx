import React, { useEffect, useState } from 'react';
import { getCountriesByRegion } from '../services/api';
import './Destinations.css'
import '../index.css'

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState(''); // Para filtrar por continente
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(10); // Número de países por página

  useEffect(() => {
    if (region) {
      getCountriesByRegion(region).then(setCountries).catch(console.error);
    }
  }, [region]);

  // Calcular los países para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar selección de continente
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  return (
    <div>
      <h1>Elige tu continente de destino</h1>

      {/* Selector de continente */}
      <select value={region} onChange={handleRegionChange}>
        <option value="">Selecciona un continente</option>
        <option value="africa">África</option>
        <option value="americas">América</option>
        <option value="asia">Asia</option>
        <option value="europe">Europa</option>
        <option value="oceania">Oceanía</option>
      </select>

      {/* Mostrar países */}
      <div>
        {currentCountries.map((country) => (
          <div className="border rounded-lg shadow-lg p-4 max-w-sm"
            key={country.cca3}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
              borderRadius: '8px',
              maxWidth: '300px',
            }}
          >
            {/* Bandera */}
            <img className="w-full rounded-md"
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              style={{ width: '100%', borderRadius: '8px' }}
            />

            {/* Nombre del país */}
            <h3  className="text-lg font-bold mt-2">{country.name.common}</h3>

            {/* Capital */}
            <p className="text-sm">
              <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
            </p>

            {/* Idiomas */}
            <p>
              <strong>Idioma(s):</strong>{' '}
              {country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'}
            </p>

            {/* Población */}
            <p>
              <strong>Población:</strong> {country.population.toLocaleString()}
            </p>

            {/* Moneda */}
            <p>
              <strong>Moneda:</strong>{' '}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(', ')
                : 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div>
        {Array.from({ length: Math.ceil(countries.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '5px',
              padding: '5px 10px',
              backgroundColor: currentPage === index + 1 ? 'blue' : 'lightgray',
              color: currentPage === index + 1 ? 'white' : 'black',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
