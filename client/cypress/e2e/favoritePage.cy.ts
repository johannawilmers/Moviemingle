describe('Favorites', () => {
  beforeEach(() => {
    cy.visit('/').wait(2000);
    cy.wait(500);
  });

  // check that favorite page is empty when user has not liked any movies
  it('No movies liked', () => {
    cy.visit('/favorites');
    cy.wait(1000);
    cy.get('p').should('contain.text', 'You have no current favorites. You can add your favorites on homepage');
  });

  // check that favorites update with new movie
  it('Like a movie, then visit favorites', () => {
    cy.get('.navbar').should('be.visible');
    cy.get('.navbar img').should('be.visible');
    const movieId = 762430;
    cy.get(`#favButton-${movieId}`).click();
    cy.wait(500);
    cy.visit('/favorites');
    cy.wait(1000);
    cy.get('p').should('contain.text', 'Retribution');
  });

  // update with unliked movie
  it('Unlike a movie, then visit favorites', () => {
    cy.get('.navbar').should('be.visible');
    cy.get('.navbar img').should('be.visible');
    const movieId = 762430;
    cy.get(`#favButton-${movieId}`).click();
    cy.wait(500);
    cy.visit('/favorites');
    cy.get(`#favButton-${movieId}`).click();
    cy.get('p').should('not.contain.text', 'Retribution');
    cy.get('p').should('contain.text', 'You have no current favorites. You can add your favorites on homepage');
  });
});
