
const RAPID_API_KEY = process.env.RAPID_API_KEY as string;
const RAPID_API_HOST = process.env.RAPID_API_HOST as string;
const RAPID_API_URL = process.env.RAPID_API_URL as string;

export async function fetchCars() {
  const headers = {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST
  }
  // Set the required headers for the API request
  const response = await fetch(
    RAPID_API_URL,
    {
      headers: headers,
    }
  );
  // Parse the response as JSON
  const result = await response.json();
  return result;
}
/*
const axios = require('axios');

const options = {
  method: 'GET',
  url: RAPID_API_URL,
  params: { model: 'corolla' },
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST
  }
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
*/

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};