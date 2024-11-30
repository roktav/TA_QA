import DirectoryPage from '/Users/reihanoktavio/Documents/TA_QA_Sanbercode/cypress/e2e/Directory/directory.js';

describe('OrangeHRM Directory Feature', () => {
  const directoryPage = new DirectoryPage();

  beforeEach(() => {
    directoryPage.visit();
  });

  it('get to directory', () => {
    directoryPage.checkingDirectory();
  });

  it('search valid name', () => {
    directoryPage.searchValid('peter','Chief Financial Officer','New York Sales Office');
  });

  it('search invalid name', () => {
    directoryPage.searchInvalid('kmkmn');
  });

  it('search by job title', () => {
    directoryPage.searchByJob('Chief Financial Officer');
  });

  it('search by location', () => {
    directoryPage.searchByJob('New York Sales Office');
  });

  it('no records found', () => {
    directoryPage.searchInvalid('peter','Accountant Assistant');
  });

  it('reset', () => {
    directoryPage.searchValid('peter','Chief Financial Officer','New York Sales Office');
    cy.contains('Reset').click();
    cy.get('.oxd-text.oxd-text--span').should('be.visible').and('include.text','Records Found')
  });
});
