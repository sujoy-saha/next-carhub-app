import { CarProps, FilterProps } from "@/types";

const NEXT_RAPID_API_KEY = process.env.NEXT_RAPID_API_KEY as string;
const NEXT_RAPID_API_HOST = process.env.NEXT_RAPID_API_HOST as string;
const NEXT_RAPID_API_END_POINT = process.env.NEXT_RAPID_API_END_POINT as string;

const NEXT_PUBLIC_IMAGIN_API_KEY = process.env.NEXT_PUBLIC_IMAGIN_API_KEY as string;
const NEXT_PUBLIC_IMAGIN_END_POINT = process.env.NEXT_PUBLIC_IMAGIN_END_POINT as string;

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'X-RapidAPI-Key': NEXT_RAPID_API_KEY,
    'X-RapidAPI-Host': NEXT_RAPID_API_HOST
  }
  //Generate URL with the search params  
  const url = new URL(NEXT_RAPID_API_END_POINT);
  if(manufacturer!= "")      
    url.searchParams.append('make',`${manufacturer}`);
  if(model!= "")
    url.searchParams.append('model',`${model}`);  
  if(fuel!= "")
    url.searchParams.append('fuel_type',`${fuel}`);  
  url.searchParams.append('limit',`${limit}`);
  url.searchParams.append('year',`${year}`);
  // Set the required headers for the API request
  const response = await fetch(
    url,
    {
      headers: headers,
    }
  );
  console.log(`${url}`);
  // Parse the response as JSON
  const result = await response.json();
  return result;
}
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL(NEXT_PUBLIC_IMAGIN_END_POINT);
  const { make, model, year } = car;  
  url.searchParams.append('customer', NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);  
  return `${url}`;  
}

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