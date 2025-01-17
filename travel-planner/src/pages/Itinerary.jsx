import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../services/api';

const Destinations = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountries().then(setCountries).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Destinos Disponibles</h1>
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} width="50" />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital?.[0] || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
