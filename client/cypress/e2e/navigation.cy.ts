describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/').wait(2000);
    cy.wait(500);
  });

  // NAVBAR TESTS
  it('should display the logo and navigate to home page when clicking on the logo', () => {
    cy.get('.navbar img').should('be.visible');
    cy.get('.navbar img').click();
    cy.url().should('include', '/project2/');
  });

  it('should navigate to home page when clicking on the MOVIEMINGLE', () => {
    cy.get('#movieMingle').click();
    cy.url().should('include', '/project2/');
  });

  it('should navigate to favorites page when clicking on the FAVORITES', () => {
    cy.get('#favorites').click();
    cy.url().should('include', '/project2/favorites');
  });

  // SINGLE MOVIE NAVIGATION TEST
  it('Should be able to click a image and navigate correct', () => {
    cy.get('.navbar').should('be.visible');
    const movieId = 762430;
    cy.get('p').should('exist');
    cy.get(`#movieImage-${movieId}`).click();
    cy.get('h1').should('contain.text', 'Retribution');
    cy.url().should('include', `/project2/movie/${movieId}`);
  });
});
