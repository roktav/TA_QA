class DirectoryPage {
    constructor() {
      this.usernameInput = '[name="username"]';
      this.passwordInput = '[name="password"]';
      this.employeeInput = 'input[placeholder="Type for hints..."]';
      this.jobTitleInput = '[name="Chief Financial Officer"]';
      this.titleInput = 'input[placeholder="-- Select --"]';
      this.loginButton = '.orangehrm-login-button'; // Updated selector
      this.checkDirectory = '.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module';
      this.webHRM = 'https://opensource-demo.orangehrmlive.com/';
      this.directoryList = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0';
      this.dropdownList = '.oxd-select-text.oxd-select-text--active';
      this.targetItem = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2&empNumber=3&jobTitleId=2';
      this.dashboard = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
    }
  
    visit() {
      cy.visit(this.webHRM);
      cy.get(this.usernameInput, { timeout: 10000 }).should('be.visible'); // Ensure the page is loaded
      cy.get(this.usernameInput).clear().type('Admin');
      cy.get(this.passwordInput).clear().type('admin123');
      cy.intercept("GET", this.dashboard).as('dashboard');
      cy.contains('button', 'Login', { timeout: 10000 }).click(); // Updated with timeout
      cy.wait('@dashboard').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });
      cy.intercept("GET", this.directoryList).as('directory');
      cy.get('a[href="/web/index.php/directory/viewDirectory"]').click();
      cy.wait('@directory').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });
    }
  
    checkingDirectory() {
      cy.get(this.checkDirectory).should('be.visible').and('contain.text','Directory');
    }
  
    searchValid(employeeName,jobTitle,location) {
      cy.get(this.dropdownList).eq(0).click();
      cy.contains(jobTitle).click();
      cy.get(this.dropdownList).eq(1).click();
      cy.contains(location).click();
      cy.get(this.employeeInput).clear().type(employeeName);
      cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 }) // Wait for up to 10 seconds
        .should('be.visible')
        .within(() => {
      cy.contains('Peter Mac Anderson', { timeout: 10000 }).click();
      });
      cy.intercept("GET", this.targetItem).as('target');
      cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click();
      cy.wait('@target').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });
      cy.get('.orangehrm-directory-card-body').click();
      cy.get('.orangehrm-qr-code').should('be.visible');
    }
  
    searchInvalid(employeeName) {
      cy.get(this.employeeInput).clear().type(employeeName);
      cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click();
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('contain.text','Invalid');
    }

    searchByJob(jobTitle) {
      cy.get(this.dropdownList).eq(0).click();
      cy.contains(jobTitle).click();
      cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click();
      cy.contains('Peter Mac Anderson').should('be.visible');
    }

    searchByLocation(location) {
      cy.get(this.dropdownList).eq(1).click();
      cy.contains(location).click();
      cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click();
      cy.contains('Sania Shaheen').should('be.visible');
    }

    noRecords(employeeName,jobTitle) {
      cy.get(this.dropdownList).eq(0).click();
      cy.contains(jobTitle).click();
      cy.get(this.employeeInput).clear().type(employeeName);
      cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 }) // Wait for up to 10 seconds
        .should('be.visible')
        .within(() => {
      cy.contains('Peter Mac Anderson', { timeout: 10000 }).click();
      cy.contains('No Records Found').should('be.visible');
      });
    }
  }
  
  export default DirectoryPage;
  