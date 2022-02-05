import React from 'react';
import './App.scss';

import { CountriesList, Navbar } from './components';
import { CountriesProvider, SearchProvider } from './context';

export const App = () => {
  return (
    <div className="main">
      <SearchProvider>
        <CountriesProvider>
          <Navbar />
          <CountriesList />
        </CountriesProvider>
      </SearchProvider>
    </div>
  );
};
