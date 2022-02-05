import React from "react";

export const SearchContext = React.createContext({});

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = React.useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
