describe('Homepage test', () => {
  beforeEach(() => {
    cy.visit('/').wait(2000);
    cy.wait(500);
  });

  // test if there is an error

  it('Check that everything shows up on the homepage', () => {
    cy.wait(1000);
    cy.get('.navbar').should('be.visible');

    cy.get('.input-search').should('be.visible');
    cy.get('button:contains("Search")').should('be.visible');

    // genre is visible
    cy.get('#demo-genre-select').should('be.visible');

    // sortfield is visible
    cy.get('#demo-simple-sorting').should('be.visible');

    // reset filter button should be visible
    cy.get('button:contains("Reset filters")').should('be.visible');

    // pagination
    cy.get('#pagination').should('be.visible');

    cy.get('#demo-simple-sorting').parent().click().get('[data-value="undefined"]').click();

    // check that 4 of the movies in first page are visible
    cy.get('p').should('contain.text', 'Blue Beetle');
    cy.get('p').should('contain.text', 'Barbie');
    cy.get('p').should('contain.text', 'Talk to Me');
    cy.get('p').should('contain.text', 'The Nun II');

    // check that movies that is not on the first page is not displayed
    cy.get('p').should('not.contain.text', 'Elvis the Pig');
    cy.get('p').should('not.contain.text', 'Everything Everywhere All at Once');
  });

  // SEARCH TESTS
  it('should type into the search bar and trigger search', () => {
    cy.wait(500);
    cy.get('.input-search').type('Oppenheimer');
    cy.get('button:contains("Search")').click();
    cy.get('p').should('contain.text', 'Oppenheimer');
    cy.get('p').should('not.contain.text', 'Barbie');

    // test for when there are no movies matching the search
    cy.get('.input-search').type('{selectall}{backspace}');
    cy.get('.input-search').type('Webdev');
    cy.get('button:contains("Search")').click();
    cy.wait(1000);
    cy.get('p').should('contain.text', 'There are no movies matching this search');

    // test for special characters
    cy.get('.input-search').type('{selectall}{backspace}');
    cy.get('.input-search').type('@!#234');
    cy.get('button:contains("Search")').click();
    cy.get('p').should('contain.text', 'There are no movies matching this search');
  });

  // GENRE TESTS
  it('should be able to switch different genres and get updated content', () => {
    cy.wait(500);
    cy.get('#demo-genre-select').parent().click().get('[data-value=99]').click();
    cy.get('p').should('contain.text', 'The Darkness Within La Luz del Mundo');
    cy.get('p').should('contain.text', 'Race to the Summit');
    cy.get('p').should('not.contain.text', 'To Catch a Killer');

    // change to horror
    cy.get('#demo-genre-select').parent().click().get('[data-value=27]').click();
    cy.get('p').should('contain.text', '');
    cy.get('p').should('not.contain.text', 'Duell am Abgrund');

    // change to all movies
    cy.get('#demo-genre-select').parent().click().get('[data-value=1]').click();
    cy.contains('Fast X');
    cy.contains('Blue Beetle');
    cy.should('not.contain.text', 'Saw X');
  });

  // SORT TEST
  it('test that sort on genre works as expected', () => {
    cy.get('[data-testid="demo-simple-sorting"]').parent().click().get('[data-value="1111"]').click();
    cy.get('p').should('contain.text', '13 Hours: The Secret Soldiers of Benghazi');
    cy.get('p').should('not.contain.text', 'The Nun II');

    cy.get('#demo-simple-sorting').parent().click().get('[data-value="2222"]').click();
    cy.get('p').should('contain.text', 'xXx: Return of Xander Cage');
    cy.get('p').should('not.contain.text', 'Barbie');

    cy.get('#demo-simple-sorting').parent().click().get('[data-value="undefined"]').click();
    cy.get('p').should('contain.text', 'Blue Beetle');
  });

  // SORT TEST
  it('test that sort on rating works as expected', () => {
    cy.get('[data-testid="demo-simple-sorting"]').parent().click().get('[data-value="3333"]').click();
    cy.get('p').should('contain.text', 'The Last Resort');
    cy.get('p').should('not.contain.text', 'Black Belt');

    cy.get('#demo-simple-sorting').parent().click().get('[data-value="4444"]').click();
    cy.get('p').should('contain.text', 'Black Belt');
    cy.get('p').should('not.contain.text', 'Rio');
  });

  // ALL FILTERS WORK TOGETHER
  it('Genre and sorting work together', () => {
    //Sort and Genre together
    cy.get('[data-testid="demo-simple-sorting"]').parent().click().get('[data-value="2222"]').click();
    cy.get('#demo-genre-select').parent().click().get('[data-value=18]').click();
    cy.get('p').should('contain.text', 'Your Ticket Is No Longer Valid');
    cy.get('p').should('not.contain.text', 'Barbie');
    cy.get('[data-testid=simple-pagination]').should('not.contain.text', '46');
  });

  it('Genre and search', () => {
    cy.get('#demo-genre-select').parent().click().get('[data-value=10751]').click();
    cy.get('.input-search').type('Snow White');
    cy.get('button:contains("Search")').click();
    cy.get('p').should('contain.text', 'Snow White and the Seven Dwarfs');
    cy.get('[data-testid=simple-pagination]').should('not.contain.text', '2');

    //Search on something outside of the genre
    cy.get('.input-search').type('The Nun');
    cy.get('button:contains("Search")').click();
    cy.get('p').should('contain.text', 'There are no movies matching this search');
  });

  // RESET TEST
  it('Check that reset filter button works', () => {
    // Adds a search, a genre and sort.
    cy.get('.input-search').type('The');
    cy.get('button:contains("Search")').click();
    cy.get('#demo-genre-select').parent().click().get('[data-value=16]').click();
    cy.get('[data-testid="demo-simple-sorting"]').parent().click().get('[data-value="1111"]').click();

    cy.get('p').should('contain.text', 'Beauty and the Beast');
    cy.get('p').should('not.contain.text', 'Elemental');
    cy.get('#demo-genre-select').should('contain.text', 'Animation');

    cy.get('button:contains("Reset filters")').click();
    cy.get('#demo-genre-select').should('contain.text', '');
  });

  // PAGINATION TEST
  it('Should click on the next button in pagination', () => {
    cy.get('[data-testid=simple-pagination]').contains('2').click();
    cy.get('p').should('contain.text', 'Kandahar');
  });

  it('Should click on the last and the previous previous pagination', () => {
    cy.get('[data-testid=simple-pagination]').contains('46').click();
    cy.debug();
    cy.get('p').should('contain.text', 'The Whale');
    cy.get('p').should('not.contain.text', 'Blue Beetle');
    cy.get('[data-testid=simple-pagination]').contains('1').click();
    cy.debug();
    cy.get('p').should('contain.text', 'Blue Beetle');
    cy.get('p').should('not.contain.text', 'Toy Story 4');
  });

  it('Pagination gets decreased on genreFilter', () => {
    cy.get('#demo-genre-select').parent().click().get('[data-value=99]').click();
    cy.get('[data-testid=simple-pagination]').should('not.contain.text', '2');
  });

  // PAGINATION HIDING
  it('Nearby buttons in pagination gets hidden', () => {
    cy.get('[data-testid=simple-pagination]').contains('5').click();
    cy.get('[data-testid=simple-pagination] [aria-label="Go to page 10"]').should('not.exist');
    cy.get('[data-testid=simple-pagination] [aria-label="Go to page 6"]').should('exist');
  });

  it('Should be able to use the arrows to switch page', () => {
    // Click on the last page (page 46)
    cy.get('#pagination').contains('46').click();
    cy.get('#pagination [aria-label="Go to previous page"]').click();
    cy.get('#pagination [aria-label="page 45"]').should('have.attr', 'aria-current', 'true');
    cy.get('#pagination  [aria-label="Go to next page"]').click();
    cy.get('#pagination [aria-label="page 46"]').should('have.attr', 'aria-current', 'true');
  });
});
