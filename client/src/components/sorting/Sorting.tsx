import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/**
 * SortingProps for the Sorting component.
 */

type SortingProps = {
  sortValue?: string | undefined;
  setSortValue: (value: string) => void;
};

/**
 * Sorting component for sorting movies by title or rating.
 *
 * @param {SortingProps} props - The SortingProps for the Sorting component.
 * @returns {JSX.Element} The rendered Sorting component.
 */

export default function Sorting({ sortValue, setSortValue }: SortingProps) {
  /**
   * Handles the change event when selecting a sorting option.
   *
   * @param {SelectChangeEvent} event - The change event.
   * @returns {void}
   */

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
    sessionStorage.setItem('sort', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel aria-label="Sort movies" id="demo-sort-label">
          Sort
        </InputLabel>
        <Select
          labelId="demo-sort-label"
          className="sorting-value"
          id="demo-simple-sorting"
          value={sortValue}
          label="Sort"
          onChange={handleChange}
          data-testid="demo-simple-sorting"
        >
          <MenuItem value={'undefined'}>No sorting</MenuItem>
          <MenuItem value={'1111'}>Title A-Z</MenuItem>
          <MenuItem value={'2222'}>Title Z-A</MenuItem>
          <MenuItem value={'3333'}>Rating ASC</MenuItem>
          <MenuItem value={'4444'}>Rating DESC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
