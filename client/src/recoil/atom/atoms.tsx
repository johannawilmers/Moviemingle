import { atom } from 'recoil';

/**
 * Represents the state of filters for movies.
 * @typedef {Object} FiltersState
 * @property {?number} genre_id - The genre ID (nullable).
 * @property {string} search - The search query.
 * @property {string} sortValue - The sorting criteria.
 */

/**
 * Atom for managing the state of filters.
 * @type {import('recoil').RecoilState<FiltersState>}
 */

export const filtersAtom = atom({
  key: 'filtersState',
  default: {
    genre_id: null as number | null,
    search: '',
    sortValue: '',
  },
});

/**
 * Atom for managing the count of filtered movies.
 * @type {import('recoil').RecoilState<number>}
 */
export const filteredMoviesCountAtom = atom({
  key: 'filteredMovieCountState',
  default: 0,
});
