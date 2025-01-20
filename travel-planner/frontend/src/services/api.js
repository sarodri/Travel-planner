import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
    try {
      const response = await axios.get(`${BASE_URL}/region/${region}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries by region:', error);
      throw error;
    }
  };