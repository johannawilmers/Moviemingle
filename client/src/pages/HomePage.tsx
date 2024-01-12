import { useQuery } from '@apollo/client';
import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import GenresFilter from '../components/genres/GenresFilter';
import { ListView } from '../components/listview/Listview';
import SimplePagination from '../components/pagination/SimplePagination';
import SearchBar from '../components/searchbar/SearchBar';
import Sorting from '../components/sorting/Sorting';
import { getFilteredMovies } from '../queries/AllMovies';
import { filtersAtom } from '../recoil/atom/atoms';

/**
 * The Home Page component for displaying movies with filters, sorting, and pagination.
 *
 * @param {HomePageProps} props - The HomePageProps for the HomePage component.
 * @returns {JSX.Element} The rendered HomePage component.
 */

export const HomePage = () => {
  const displayedMovies = 8;
  const [displayedView, setDisplayedView] = useState(0);
  const [allFilters, setFilters] = useRecoilState(filtersAtom);
  const { search, genre_id, sortValue } = allFilters;
  const [searchFilter, setSearchFilter] = useState(search);
  const userID = localStorage.getItem('userID') || '';

  /**
   * Handles the change of page when the pagination is clicked.
   *
   * @param {number} newPage - The new page number.
   * @returns {void}
   */
  const handlePageChange = (newPage: number) => {
    const amountMovies = newPage * displayedMovies - displayedMovies;
    sessionStorage.setItem('paginationPage', JSON.stringify(amountMovies));
    setDisplayedView(amountMovies);
  };

  /**
   * Handles the change of genre when the genre filter is changed.
   *
   * @param {number} selectedGenreId - The selected genre ID.
   * @returns {void}
   */
  const handleGenreChange = (selectedGenreId: number) => {
    setFilters({ ...allFilters, genre_id: selectedGenreId });
    setDisplayedView(0);
    sessionStorage.setItem('paginationPage', JSON.stringify(0));
  };

  /**
   * Handles the change of sort value when the sort filter is changed.
   *
   * @param {string} selectedSort - The selected sort value.
   * @returns {void}
   */
  const handleSortChange = (selectedSort: string) => {
    setFilters({ ...allFilters, sortValue: selectedSort });
    setDisplayedView(0);
    sessionStorage.setItem('paginationPage', JSON.stringify(0));
  };

  /**
   * Handles the search action when the search filter is used.
   *
   * @returns {void}
   */
  const handleSearch = () => {
    setFilters({ ...allFilters, search: searchFilter });
    setDisplayedView(0);
    sessionStorage.setItem('paginationPage', JSON.stringify(0));
  };

  /**
   * Resets all filters and pagination.
   *
   * @returns {void}
   */
  const resetFilters = () => {
    setFilters({
      genre_id: null,
      search: '',
      sortValue: '',
    });
    setSearchFilter('');
    sessionStorage.removeItem('genresFilter');
    sessionStorage.removeItem('searchValue');
    sessionStorage.removeItem('sort');
    sessionStorage.removeItem('paginationPage');
    setDisplayedView(0);
  };

  /**
   * Handles the refresh action when the page is loaded.
   *
   * @param {number} selectedGenreId - The selected genre ID.
   * @param {string} selectedSort - The selected sort value.
   * @param {string} searchValue - The search value.
   * @returns {void}
   */
  const handleRefresh = (selectedGenreId: number, selectedSort: string, searchValue: string) => {
    setFilters({ search: searchValue, genre_id: selectedGenreId, sortValue: selectedSort });
  };

  useEffect(() => {
    const page = sessionStorage.getItem('paginationPage');
    const pageNumber = Number(page);
    setDisplayedView(pageNumber);

    const sort = sessionStorage.getItem('sort') || '';
    const genresFilter = sessionStorage.getItem('genresFilter');
    const searchValue = sessionStorage.getItem('searchValue') || '';
    setSearchFilter(searchValue);
    const genresFilterNumber = Number(genresFilter);
    handleRefresh(genresFilterNumber, sort, searchValue);
  }, []);

  const { data, loading } = useQuery(getFilteredMovies(), {
    variables: {
      genre_id: genre_id,
      skip: displayedView,
      limit: displayedMovies,
      search: search,
      sortValue: sortValue,
      userID: userID,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const movies = data?.getFilteredMovies || [];

  return (
    <div>
      <div id="filters">
        <GenresFilter genreId={genre_id} setGenreId={handleGenreChange} />
        <Sorting sortValue={sortValue} setSortValue={handleSortChange} />
        <div id="searchBar">
          <SearchBar search={searchFilter} setSearchValue={setSearchFilter} handleSearch={handleSearch} />
        </div>
        <Button onClick={resetFilters} variant="outlined">
          Reset filters
        </Button>
      </div>
      <div tabIndex={-1} id="pagination" className="simplePagination">
        <SimplePagination setPage={handlePageChange} page={displayedView / 8 + 1} />
      </div>
      <div id="listview">{loading ? <CircularProgress /> : <ListView movies={movies} />}</div>
      <div className="simplePagination">
        <SimplePagination setPage={handlePageChange} page={displayedView / 8 + 1} />
      </div>
    </div>
  );
};
