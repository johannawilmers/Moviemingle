import { screen } from '@testing-library/react';

import { renderWithPageContent } from '../../../utils/testUtils';
import { movie } from '../../../utils/types';
import { ListView } from '../Listview';

describe('ListView', () => {
  const movies: movie[] = [
    {
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
    },
    {
      backdrop_path: '/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg',
      genre_ids: [27, 53],
      _id: 1008042,
      original_title: 'Talk to Me',
      overview:
        'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
      poster_path: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
      release_date: '2023-07-26',
      title: 'Talk to Me',
      vote_average: 7.2,
      isFavorite: false,
    },
  ];

  it('should match snapshot', () => {
    const { container } = renderWithPageContent(<ListView movies={movies} />);
    expect(container).toMatchSnapshot();
  });

  it('should render one picture for each movie in the list', () => {
    renderWithPageContent(<ListView movies={movies} />);
    const movieCards = screen.getAllByRole('img');
    expect(movieCards).toHaveLength(2);
  });
});
