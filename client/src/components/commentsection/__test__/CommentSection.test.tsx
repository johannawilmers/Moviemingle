import '@testing-library/jest-dom';

import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import { ADD_COMMENT, GET_ALL_COMMENTS } from '../../../queries/Comments';
import { renderWithMocks, renderWithPageContent } from '../../../utils/testUtils';
import { movie } from '../../../utils/types';
import CommentSection from '../CommentSection';

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

const comments = [
  {
    movieId: 385687,
    userID: 'testUser',
    comment: ['Such a good action movie!'],
  },
];

const mocks = [
  {
    request: {
      query: GET_ALL_COMMENTS,
      variables: { movieId: 385687 },
    },
    result: {
      data: {
        getAllComments: comments,
      },
    },
  },
];

describe('CommentSection', () => {
  it('renders with initial mock comments', async () => {
    let container;
    await act(async () => {
      ({ container } = renderWithMocks(
        <CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />,
        mocks,
      ));
    });
    await screen.findByText('testUser: Such a good action movie!');
    expect(screen.queryByText('Loading')).toBeNull();
    comments.forEach((comment) => {
      expect(screen.getByText(`${comment.userID}: ${comment.comment}`)).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('render the commentsection before adding comment', async () => {
    await renderWithPageContent(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />);
    waitFor(() => {
      expect(screen.getByText('Submit Review')).toBeInTheDocument();
      expect(screen.getByText('No reviews to this movie yet - be the first one to comment')).toBeInTheDocument();
    });
  });

  it('render the addComment button', () => {
    renderWithPageContent(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />);
    expect(screen.getByText('Submit Review')).toBeInTheDocument();
  });

  it('render the textField placeholder', () => {
    renderWithPageContent(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />);
    const inputField = screen.getByLabelText('Review this movie');
    expect(inputField).toBeInTheDocument();
  });

  it('render the commentsection with an empty submit', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};
    renderWithMocks(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />, mocks);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Review this movie'), { target: { value: '' } });
      fireEvent.click(screen.getByText('Submit Review'));
      expect(screen.getAllByRole('alert')).toHaveLength(1);
    });
    window.alert = jsdomAlert;
  });

  it('render the commentsection with a submit', async () => {
    const comments = [
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Such a good action movie!'],
      },
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Wow i really liked this'],
      },
    ];

    const mocks = [
      {
        request: {
          query: ADD_COMMENT,
          variables: {
            addCommentId: 385687,
            comment: 'Wow i really liked this',
            userID: 'testUser',
          },
        },
        result: {
          data: {
            addComment: {
              movieId: 385687,
              userID: 'testUser',
              comment: 'Wow i really liked this',
            },
          },
        },
      },
      {
        request: {
          query: GET_ALL_COMMENTS,
          variables: { movieId: 385687 },
        },
        result: {
          data: {
            getAllComments: comments,
            userID: 'testuser',
          },
        },
      },
    ];
    renderWithMocks(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />, mocks);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Review this movie'), { target: { value: 'Wow i really liked this' } });
      fireEvent.click(screen.getByText('Submit Review'));
      waitFor(() => {
        expect(screen.getByText(comments[0].userID + ': ' + 'Wow i really liked this')).toBeInTheDocument();
      });
    });
  });

  it('test that "show more comments" changes to "show less comments', async () => {
    const comments = [
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Such a good action movie!'],
      },
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Wow i really liked this'],
      },
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Liked this a lot'],
      },
      {
        movieId: 385687,
        userID: 'testUser',
        comment: ['Not so nice'],
      },
    ];
    const updatedMocks = [
      {
        request: {
          query: ADD_COMMENT,
          variables: {
            addCommentId: 385687,
            comment: 'shit',
            userID: 'testUser',
          },
        },
        result: {
          data: {
            addComment: {
              movieId: 385687,
              userID: 'testUser',
              comment: 'Not so nice',
            },
          },
        },
      },
      {
        request: {
          query: GET_ALL_COMMENTS,
          variables: { movieId: 385687 },
        },
        result: {
          data: {
            getAllComments: comments,
          },
        },
      },
    ];
    renderWithMocks(<CommentSection movieId={mockmovie._id || 0} userID={comments[0].userID} />, updatedMocks);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Show more comments'));
      expect(screen.getByText('Show less comments')).toBeInTheDocument();
    });
  });
});
