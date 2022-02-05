import React from 'react';
import { useCountriesContext } from '../../context';
import { filterByUniqueValues } from '../../utils';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { Modal } from '../Modal';
import './FiltersModal.scss';

export const FiltersModal = ({ isOpen, onClose }) => {
  const { countries, setFilterCriteria } = useCountriesContext();

  const [filterTypes, setFilterTypes] = React.useState({
    region: [],
    languages: [],
    currencies: [],
    timezones: [],
  });

  const continents = filterByUniqueValues(
    countries.map((country) => ({ label: { title: country.region }, value: country.region })),
  ).sort((a, b) => a.label.title.localeCompare(b.label.title));

  const languages = filterByUniqueValues(
    countries.flatMap((country) => {
      return country.languages.map((language) => {
        return { label: { title: language }, value: language };
      });
    }),
  ).sort((a, b) => a.label.title.localeCompare(b.label.title));

  const timezones = filterByUniqueValues(
    countries.flatMap((country) => {
      return country.timezones.map((timezone) => {
        return { label: { title: timezone }, value: timezone };
      });
    }),
  ).sort((a, b) => a.label.title.localeCompare(b.label.title));

  const currencies = filterByUniqueValues(
    countries.flatMap((country) => {
      return country.currencies.map((currency) => {
        return { label: { title: currency.code, subtitle: currency.name }, value: currency.code };
      });
    }),
  ).sort((a, b) => a.label.title.localeCompare(b.label.title));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="filters-modal">
        <h2>Filters</h2>
        <Dropdown
          placeholder={'Select continents'}
          type="continents"
          items={continents}
          values={filterTypes.region}
          onChange={(selectedItems) => {
            setFilterTypes({
              ...filterTypes,
              region: selectedItems.map(({ value }) => value),
            });
          }}
        />
        <br />
        <Dropdown
          placeholder={'Select languages'}
          type="languages"
          items={languages}
          values={filterTypes.languages}
          onChange={(selectedItems) => {
            setFilterTypes({
              ...filterTypes,
              languages: selectedItems.map(({ value }) => value),
            });
          }}
        />
        <br />
        <Dropdown
          placeholder={'Select timezones'}
          type="timezones"
          items={timezones}
          values={filterTypes.timezones}
          onChange={(selectedItems) => {
            setFilterTypes({
              ...filterTypes,
              timezones: selectedItems.map(({ value }) => value),
            });
          }}
        />
        <br />
        <Dropdown
          placeholder={'Select currencies'}
          type="currencies"
          items={currencies}
          values={filterTypes.currencies}
          onChange={(selectedItems) => {
            setFilterTypes({
              ...filterTypes,
              currencies: selectedItems.map(({ value }) => value),
            });
          }}
        />
        <br />
        <div className="filters-modal__actions">
          <Button
            text="Clear all filters"
            variant="secondary"
            onClick={() => {
              const emptyFilters = {
                region: [],
                languages: [],
                timezones: [],
                currencies: [],
              };

              setFilterTypes(emptyFilters);
              setFilterCriteria(emptyFilters);
              onClose();
            }}
          />
          <Button
            text="Apply"
            onClick={() => {
              setFilterCriteria(filterTypes);
              onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
