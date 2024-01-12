import { useQuery } from '@apollo/client';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { GET_ALL_GENRES } from '../../queries/Genres';
import { genre } from '../../utils/types';

/**
 * GenresProps for the GenresFilter component.
 */
type GenresProps = {
  genreId: number | null;
  setGenreId: (value: number) => void;
};

/**
 * GenresFilter component for filtering movies by genre.
 *
 * @param {GenresProps} props - The GenresProps for the GenresFilter component.
 * @returns {JSX.Element} The rendered GenresFilter component.
 */
export default function GenresFilter({ setGenreId, genreId }: GenresProps) {
  /**
   * Handles the change event when selecting a genre from the filter.
   *
   * @param {SelectChangeEvent} event - The change event.
   */
  const handleChangeFilter = (event: SelectChangeEvent) => {
    setGenreId(parseInt(event.target.value));
    sessionStorage.setItem('genresFilter', JSON.stringify(parseInt(event.target.value)));
  };

  const { loading, error, data } = useQuery(GET_ALL_GENRES);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error(error.message);
    return <div>Error loading genres</div>;
  }

  /**
   * Maps genre data to MenuItem components.
   */
  const genreItems =
    data?.getAllGenres?.map((genre: genre) => (
      <MenuItem key={genre._id} value={genre._id}>
        {genre.name}
      </MenuItem>
    )) || [];

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth id="genres-form">
        <InputLabel aria-label="Select genres" id="demo-genre-label">
          Genre
        </InputLabel>
        <Select
          aria-label="select genre"
          labelId="demo-genre-label"
          id="demo-genre-select"
          label="Genre"
          onChange={handleChangeFilter}
          value={genreId ? genreId.toString() : ''}
        >
          {genreItems}
        </Select>
      </FormControl>
    </Box>
  );
}
