import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import { useState } from 'react';

import { ADD_COMMENT, GET_ALL_COMMENTS } from '../../queries/Comments';

/**
 * CommentSectionProps for the CommentSection component.
 */
interface CommentSectionProps {
  movieId: number;
  userID: string;
}

/**
 * CommentSection component for handling comments on a movie.
 *
 * @param {CommentSectionProps} props - The CommentSectionProps for the CommentSection component.
 * @returns {JSX.Element} The rendered CommentSection component.
 */
const CommentSection: React.FC<CommentSectionProps> = ({ movieId, userID }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT);
  const { data: allCommentsData, refetch } = useQuery(GET_ALL_COMMENTS, {
    variables: { movieId: movieId },
  });

  const allComments = allCommentsData?.getAllComments || [];
  const [showAllComments, setShowAllComments] = useState(false);

  /**
   * Toggles the visibility of all comments.
   */
  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  /**
   * Updates comments on submission.
   *
   * @param {string} newComment - The new comment to be added.
   */
  const updateComments = async (newComment: string) => {
    if (newComment === '') {
      alert('You must write a comment.');
      return;
    }
    await addComment({
      variables: { addCommentId: movieId, comment: newComment, userID: userID },
      refetchQueries: [{ query: GET_ALL_COMMENTS, variables: { movieId: movieId } }],
    });

    refetch();
    setNewComment('');
  };

  /**
   * Handles the Enter key press event to submit comments.
   *
   * @param {React.KeyboardEvent} event - The keyboard event.
   */
  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateComments((event.target as HTMLInputElement).value);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Alert variant="outlined" severity="error">
        Could not load comments
      </Alert>
    );

  return (
    <div aria-label="Comments section">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '80%',
          maxWidth: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Review this movie"
          id="fullWidth"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Button sx={{ marginLeft: '12px' }} variant="outlined" onClick={() => updateComments(newComment)}>
          Submit Review
        </Button>
      </Box>

      <div style={{ textAlign: 'center' }}>
        {allComments
          .slice()
          .reverse()
          .map(
            (commentObject, index) =>
              (showAllComments || index < 2) && (
                <Paper key={index} style={{ padding: '10px 20px', marginTop: 10, marginBottom: 30 }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: blue[500], marginTop: '0.5rem' }}>{commentObject.userID[0]}</Avatar>
                    </Grid>
                    <Grid tabIndex={0} item>
                      <p>
                        {commentObject.userID}: {commentObject.comment}
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              ),
          )}

        {allComments.length > 2 && (
          <Button
            variant="outlined"
            onClick={handleToggleComments}
            style={{ color: 'white', marginBottom: '1rem', marginTop: '1rem' }}
          >
            {showAllComments ? 'Show less comments' : 'Show more comments'}
          </Button>
        )}

        {allComments.length === 0 && (
          <Alert sx={{ marginTop: '1rem', marginBottom: '1rem' }} variant="outlined" severity="info" tabIndex={-1}>
            No reviews for this movie yet - be the first one to comment
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
