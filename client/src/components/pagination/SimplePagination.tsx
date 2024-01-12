/**
 * Pagination component for navigating through pages of filtered movies.
 * @module components/SimplePagination
 */

import { useQuery } from '@apollo/client';
import { Pagination, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { GET_FILTERED_MOVIE_COUNT } from '../../queries/AllMovies';
import { filteredMoviesCountAtom, filtersAtom } from '../../recoil/atom/atoms';

/**
 * Props for the SimplePagination component.
 * @typedef {Object} SimplePaginationProps
 * @property {Function} setPage - Function to set the current page.
 * @property {number} page - Current page.
 */
interface SimplePaginationProps {
  setPage: (newPage: number) => void;
  page: number;
}

/**
 * SimplePagination component for navigating through pages of filtered movies.
 * @function
 * @param {SimplePaginationProps} props - The props of the component.
 * @returns {JSX.Element} React component.
 */
const SimplePagination: React.FC<SimplePaginationProps> = ({ setPage, page }) => {
  const [allFilters, _setFilters] = useRecoilState(filtersAtom);
  const { search, genre_id, sortValue } = allFilters;
  const [movieCount, setMovieCount] = useRecoilState(filteredMoviesCountAtom);

  const { data, loading, error } = useQuery(GET_FILTERED_MOVIE_COUNT, {
    variables: {
      genre_id,
      search,
      sortValue,
    },
  });

  const isLargeScreen = useMediaQuery('(min-width: 500px)');

  useEffect(() => {
    if (data) {
      setMovieCount(data.getFilteredMoviesCount.total);
    }
  }, [data, setMovieCount]);

  if (loading) return null;
  if (error) return <p> An error occurred </p>;

  /**
   * Handle page change event.
   * @function
   * @param {React.ChangeEvent<unknown>} _event - The change event.
   * @param {number} newPage - The new page number.
   */
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <Pagination
      count={Math.ceil(movieCount / 8)}
      page={page}
      onChange={handlePageChange}
      variant="outlined"
      size={isLargeScreen ? 'large' : 'medium'}
      color="primary"
      data-testid="simple-pagination"
    />
  );
};

export default SimplePagination;
