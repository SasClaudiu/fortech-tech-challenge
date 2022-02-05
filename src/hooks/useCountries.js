import React from 'react';
import { sortAscendingString } from '../utils';

const sortCountriesAlphabetically = (c1, c2) => {
  return sortAscendingString(c1.name, c2.name);
};

const extractNeighbours = (country, countries) => {
  const neighbours = country.neighbours.filter((neighbour) => countries.find((c) => c.cca3 === neighbour));

  const formattedNeighbours = neighbours.sort(sortCountriesAlphabetically).map((n) => {
    const neighbourCountry = countries.find((c) => c.cca3 === n);
    return { name: neighbourCountry.name.common, flag: neighbourCountry.flags.svg, cca2: neighbourCountry.cca2 };
  });

  return { ...country, neighbours: formattedNeighbours };
};

const mapCountryFields = (country) => ({
  name: country.name.common,
  capital: (country.capital && country.capital[0]) || '-',
  region: country.region,
  flag: country.flags.svg,
  population: country.population,
  cca2: country.cca2 || '',
  cca3: country.cca3 || '',
  ccn3: country.ccn3 || '',
  cioc: country.cioc || '',
  latlng: country.latlng || [],
  area: country.area || 0,
  neighbours: country.borders || [],
  timezones: country.timezones || [],
  currencies: country.currencies
    ? Object.keys(country.currencies).map((key) => ({ ...country.currencies[key], code: key }))
    : [],
  languages: country.languages ? Object.keys(country.languages).map((key) => country.languages[key]) : [],
  translations: Object.keys(country.translations).map((key) => country.translations[key].common),
});

const getAllCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  return countries
    .map(mapCountryFields)
    .map((c) => extractNeighbours(c, countries))
    .sort(sortCountriesAlphabetically);
};

export const useCountries = () => {
  const [countries, setCountries] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const getAllCountriesRequest = async () => {
      setFetching(true);
      const data = await getAllCountries();

      setCountries(data);
      setFetching(false);
    };

    getAllCountriesRequest();
  }, []);

  return { countries, fetching };
};
