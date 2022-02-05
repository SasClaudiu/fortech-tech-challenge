import React from 'react';
import { useCountries } from '../hooks';

export const CountriesContext = React.createContext({});

export const CountriesProvider = ({ children }) => {
  const { countries: allCountries, fetching } = useCountries();
  const [filterCriteria, setFilterCriteria] = React.useState({
    region: [],
    languages: [],
    currencies: [],
    timezones: [],
  });

  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    if (allCountries.length > 0) {
      setCountries(allCountries);
    }

    // eslint-disable-next-line
  }, [allCountries.length]);

  return (
    <CountriesContext.Provider value={{ countries, setCountries, fetching, setFilterCriteria, filterCriteria }}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountriesContext = () => React.useContext(CountriesContext);
