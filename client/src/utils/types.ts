/**
 * Interface representing a movie.
 * @interface
 * @property {number | undefined} _id - The unique identifier of the movie.
 * @property {string} title - The title of the movie.
 * @property {string} original_title - The original title of the movie.
 * @property {string} poster_path - The path to the movie's poster image.
 * @property {string} backdrop_path - The path to the movie's backdrop image.
 * @property {number[]} genre_ids - An array of genre IDs associated with the movie.
 * @property {string} overview - A brief overview or description of the movie.
 * @property {string} release_date - The release date of the movie.
 * @property {number} vote_average - The average vote or rating for the movie.
 * @property {boolean | undefined} isFavorite - Whether the movie is marked as a favorite.
 */
export interface movie {
  _id: number | undefined;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  release_date: string;
  vote_average: number;
  isFavorite?: boolean;
}

/**
 * Interface representing a genre.
 * @interface
 * @property {number | undefined} _id - The unique identifier of the genre.
 * @property {string} name - The name of the genre.
 */
export interface genre {
  _id: number | undefined;
  name: string;
}
