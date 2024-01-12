import '@testing-library/jest-dom';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithPageContent } from '../../../utils/testUtils';
import { movie } from '../../../utils/types';
import SingleMovie from '../SingleMovie';

const mockmovie: movie = {
  backdrop_path: '/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg',
  genre_ids: [28, 80, 53],
  _id: 385687,
  original_title: 'Fast X',
  overview:
    "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
  poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
  release_date: '2023-05-17',
  title: 'Fast X',
  vote_average: 7.3,
  isFavorite: true,
};

const genres: string[] = ['Action', 'Crime', 'Thriller'];

describe('SingleMovie', () => {
  beforeEach(() => {
    renderWithPageContent(<SingleMovie selectedMovie={mockmovie} genres={genres} />);
  });

  it('should match snapshot', async () => {
    const { container } = renderWithPageContent(<SingleMovie selectedMovie={mockmovie} genres={genres} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the movie title and release year', () => {
    const titleElement = screen.getByText(mockmovie.title + ' (' + mockmovie.release_date.split('-')[0] + ')');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the movie storyline', () => {
    const storyline = screen.getByText(mockmovie.overview);
    expect(storyline).toBeInTheDocument();
  });

  it('renders the movie poster', () => {
    const posterElement = screen.getByAltText(`${mockmovie.title} backdrop poster`);
    expect(posterElement).toBeDefined();
  });

  it('renders the movie genres', () => {
    const action = screen.getByText('Action');
    expect(action).toBeInTheDocument();
    const crime = screen.getByText('Crime');
    expect(crime).toBeInTheDocument();
    const thriller = screen.getByText('Thriller');
    expect(thriller).toBeInTheDocument();
  });

  it('renders the movie rating', () => {
    const rating = screen.getByText(mockmovie.vote_average);
    expect(rating).toBeInTheDocument();
  });

  it('renders the movie heading', () => {
    const review = screen.getByText('Reviews');
    expect(review).toBeInTheDocument();
  });

  it('renders the "Back to all movies" button', async () => {
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    waitFor(() => screen.getByText('Talk to me'));
  });
});
