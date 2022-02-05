import React from 'react';
import { useSearchContext } from '../../context';
import { useDebounce } from '../../hooks';
import { FiltersModal } from '../FiltersModal';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import './SearchBar.scss';

export const SearchBar = () => {
  const { search, setSearch } = useSearchContext();
  const [filtersModalOpen, setFiltersModalOpen] = React.useState(false);

  const [temporarySearch, setTemporarySearch] = React.useState(search);
  const [fakeLoading, setFakeLoading] = React.useState(false);
  const debouncedSearch = useDebounce(temporarySearch, 500);

  React.useEffect(() => {
    setSearch(debouncedSearch);
    setFakeLoading(false);
  }, [debouncedSearch]);

  return (
    <>
      <div className="search-bar">
        <div className="background-bar" />
        <input
          placeholder="Search..."
          type="text"
          value={temporarySearch}
          onChange={(e) => {
            setFakeLoading(true);
            setTemporarySearch(e.target.value);
          }}
        />
        <div className="search-bar__right-area">
          <Spinner visible={fakeLoading} size={20} />
          <div className="search-bar__vertical-divider" />
          <Button text="Filters" onClick={() => setFiltersModalOpen(true)} />
        </div>
      </div>
      <FiltersModal isOpen={filtersModalOpen} onClose={() => setFiltersModalOpen(false)} />
    </>
  );
};
