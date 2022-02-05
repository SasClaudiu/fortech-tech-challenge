import React from 'react';
import './CountryModal.scss';

import { Modal } from '../Modal';
import { DetailsSection, Divider } from '..';
import { numberWithCommas } from '../../utils';
import { LeafletMap } from '../LeafletMap';
import { useCountriesContext } from '../../context';

export const CountryModal = ({ isOpen, onClose, country, onCountryChange }) => {
  const { countries } = useCountriesContext();

  if (!isOpen || !country) return null;

  const [lat, long] = country.latlng;
  const currencies = country.currencies ? country.currencies.map((currency) => currency.code).join(', ') : '-';
  const neighbours = country.neighbours && country.neighbours.length ? country.neighbours : [];
  const position = [lat, long];
  const timezones = country.timezones ? country.timezones.map((timezone) => timezone) : '-';
  const hasMultipleTimezones = country.timezones.length > 1;
  const timezone = hasMultipleTimezones ? `${timezones[0]} and ${timezones.length - 1} more` : timezones[0];
  const hasMultipleLanguages = country.languages.length > 1;
  const languages = country.languages;
  const language = hasMultipleLanguages ? `${languages[0]} and ${languages.length - 1} more` : languages[0];

  const lagLongsByCountry = countries.map((country) => {
    const { latlng } = country;
    return { latlng, country };
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="country-modal__content">
        <div className="country-modal__left-area">
          <img className="country-modal__flag" src={country.flag} alt="" />
          <div className="country-modal__info-section">
            <h2>
              {country.name} <span>({country.cca2})</span>
            </h2>
            <Divider />
            <div className="country-modal__info-details">
              <DetailsSection label="Capital" value={country.capital} />
              <DetailsSection label="Continent" value={country.region} />
              <DetailsSection label="Population" value={numberWithCommas(country.population)} />
              <DetailsSection label="Lat/Long" value={`[ ${Number(lat).toFixed(2)}°, ${Number(long).toFixed(2)}° ]`} />
              <DetailsSection label="Area" value={`${numberWithCommas(country.area)}`} />
              <DetailsSection label="Currencies" value={currencies} />
              <DetailsSection label="Timezones" value={timezone} tooltipValue={timezones.slice(1).join(' ')} />
              <DetailsSection label="Languages" value={language} tooltipValue={languages.slice(1).join(' ')} />
            </div>
          </div>
        </div>
        <div className="country-modal__right-area">
          <div className="country-modal__neighbours-section">
            <h3>Neighbours</h3>
            <Divider />
            <div className="country-modal__neighbours-list">
              {neighbours.length === 0 && <p>No neighbours</p>}
              {neighbours.map((neighbour) => {
                return (
                  <div
                    key={neighbour.cca2}
                    className="country-modal__neighbour-item"
                    onClick={() => onCountryChange(neighbour)}
                  >
                    <img src={`${neighbour.flag}`} alt={`${neighbour.name}'s flag`} width={30} height={20} />
                    <span>{neighbour.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="country-modal__map-section">
            <h3>Map</h3>
            <Divider />
            <LeafletMap
              position={position}
              zoom={5}
              onPositionChange={(newPosition) => {
                const newLatLong = [newPosition.lat, newPosition.lng];

                // find closest country to the new lat long clicked
                const closestCountry = lagLongsByCountry.reduce((prev, curr) => {
                  const prevDistance = Math.sqrt(
                    Math.pow(prev.latlng[0] - newLatLong[0], 2) + Math.pow(prev.latlng[1] - newLatLong[1], 2),
                  );
                  const currDistance = Math.sqrt(
                    Math.pow(curr.latlng[0] - newLatLong[0], 2) + Math.pow(curr.latlng[1] - newLatLong[1], 2),
                  );
                  return prevDistance < currDistance ? prev : curr;
                });

                onCountryChange(closestCountry.country);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
