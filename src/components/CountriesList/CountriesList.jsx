import React from 'react';
import { Loader } from '../Loader';
import { useCountriesContext, useSearchContext } from '../../context';
import { CountryCard } from '../CountryCard';
import './CountriesList.scss';

export const CountriesList = () => {
  const { search } = useSearchContext();
  const { countries, fetching, filterCriteria } = useCountriesContext();

  const [filteredCountries, setFilteredCountries] = React.useState(countries);

  React.useEffect(() => {
    const filteredData = countries.filter((country) => {
      const { region, currencies, languages, timezones } = country;

      const regionFilters = filterCriteria.region;
      const currencyFilters = filterCriteria.currencies;
      const languageFilters = filterCriteria.languages;
      const timezoneFilters = filterCriteria.timezones;

      if (regionFilters.length > 0 && !regionFilters.includes(region)) {
        return false;
      }

      if (
        currencyFilters.length > 0 &&
        !currencyFilters.some((currencyFilter) => currencies.find(({ code }) => code === currencyFilter))
      ) {
        return false;
      }

      if (languageFilters.length > 0 && !languageFilters.some((languageFilter) => languages.includes(languageFilter))) {
        return false;
      }

      if (timezoneFilters.length > 0 && !timezoneFilters.some((timezoneFilter) => timezones.includes(timezoneFilter))) {
        return false;
      }

      const searchTerm = search.toLowerCase();

      const { name, capital, cca2, cca3, ccn3, cioc, translations } = country;
      const fields = [name, capital, cca2, cca3, ccn3, cioc];

      const hasMatch = fields.some((field) => field.toLowerCase().includes(searchTerm));

      if (hasMatch) return true;

      if (translations.some((t) => t.toLowerCase().includes(searchTerm))) return true;

      return false;
    });

    setFilteredCountries(filteredData);

    // eslint-disable-next-line
  }, [search, countries, filterCriteria]);

  return (
    <div className="countries-list">
      {fetching && <Loader visible={fetching} size={50} />}
      {filteredCountries && filteredCountries.map((country) => <CountryCard key={country.name} country={country} />)}
      {!filteredCountries.length && !fetching && (
        <div className="no-results">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};
