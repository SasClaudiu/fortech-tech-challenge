import React from 'react';
import './CountryCard.scss';
import { CountryModal } from '../CountryModal';
import { DetailsSection } from '../DetailsSection';
import { numberWithCommas } from '../../utils';
import { useCountriesContext } from '../../context';

export const CountryCard = ({ country }) => {
  const [countryModalOpen, setCountryModalOpen] = React.useState(false);
  const [selectCountry, setSelectCountry] = React.useState(country);
  const { countries } = useCountriesContext();

  return (
    <>
      <div className="country-card" onClick={() => setCountryModalOpen(true)}>
        <div className="country-card__top-area">
          <img src={country.flag} alt={`${country.name}'s flag`} />
        </div>
        <div className="country-card__middle-section">
          <h1 className="country-card__heading">
            <span className="country-card__heading__name">{country.name}</span>
          </h1>
          <div className="country-card__details">
            <DetailsSection label="Capital" value={country.capital} />
            <DetailsSection label="Region" value={country.region} />
            <DetailsSection label="Population" value={numberWithCommas(country.population)} />
          </div>
        </div>
      </div>
      <CountryModal
        isOpen={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
        country={selectCountry}
        onCountryChange={({ cca2 }) => {
          const country = countries.find((country) => country.cca2 === cca2);
          setSelectCountry(country);
        }}
      />
    </>
  );
};
