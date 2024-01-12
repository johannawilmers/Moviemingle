describe('Singlemovie', () => {
  beforeEach(() => {
    cy.visit('/movie/565770').wait(2000);
    cy.wait(500);
  });

  // add more attributes
  it('Check that the correct attributes are visible', () => {
    cy.wait(1000);
    cy.get('h1').should('contain.text', 'Blue Beetle (2023)');
    cy.wait(500).get('.genres').should('contain.text', 'Action');
    cy.get('.average-rating').should('exist');
  });

  it('Add comment and it should appear', () => {
    cy.get('#fullWidth').type('Great movie');
    cy.get('button:contains("Submit Review")').click();
    cy.wait(500);
    cy.get('p').should('contain.text', 'Great movie');
    cy.get('p').should('not.contain.text', 'Bad movie');
  });

  // check that you can like the movie and it shows up on favoritepage
  it('Like a movie, then visit favorites', () => {
    const movieId = 565770;
    cy.get(`#singleFavButton-${movieId}`).click();
    cy.wait(500);
    cy.visit('/favorites');
    cy.get('p').should('contain.text', 'Blue Beetle');
  });

  it('Unlike movie from singleMoviePage', () => {
    // first like a movie a see that it shows up in favorites
    const movieId = 565770;
    cy.get(`#singleFavButton-${movieId}`).click();
    cy.wait(500);
    cy.visit('/favorites');

    // then unlike the movie and it should be removed from favorites
    cy.visit('/movie/565770');
    cy.get(`#singleFavButton-${movieId}`).click();
    cy.wait(500);
    cy.visit('/favorites');
    cy.get('p').should('contain.text', 'You have no current favorites. You can add your favorites on homepage');
  });
});
