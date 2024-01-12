import './searchBar.css';

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

/**
 * SearchBarProps for the SearchBar component.
 * @typedef {Object} SearchBarProps
 * @property {string} search - The current search value.
 * @property {Function} handleSearch - Function to handle the search action.
 * @property {Function} setSearchValue - Function to set the search value.
 */

type SearchBarProps = {
  search: string;
  handleSearch: () => void;
  setSearchValue: (s: string) => void;
};

/**
 * SearchBar component for searching movies by movie title.
 * @function
 * @param {SearchBarProps} props - The SearchBarProps of the component.
 * @returns {JSX.Element} React component.
 */

export default function SearchBar({ search, setSearchValue, handleSearch }: SearchBarProps) {
  /**
   * Handle key down event.
   * @function
   * @param {React.KeyboardEvent<HTMLDivElement>} e - The key down event.
   */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  /**
   * Handle change event.
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    setSearchValue(value);
    sessionStorage.setItem('searchValue', value);
  };

  return (
    <div aria-label="Search movies by movie title">
      <form className="search-box-container" id="search-box-container">
        <label htmlFor="search-image-query"> </label>
        <TextField
          value={search}
          className="input-search"
          type="search"
          name="search-image-query"
          placeholder="Search for title"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <Button variant="outlined" onClick={handleSearch}>
          {' '}
          Search{' '}
        </Button>
      </form>
    </div>
  );
}
