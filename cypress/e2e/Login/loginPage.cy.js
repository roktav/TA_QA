import LoginPage from '/Users/reihanoktavio/Documents/TA_QA_Sanbercode/cypress/e2e/Login/loginPage.js';

describe('OrangeHRM Login Feature', () => {
  const loginPage = new LoginPage();
  const validUsername = 'Admin';
  const validPassword = 'admin123';

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with valid credentials', () => {
    loginPage.login(validUsername, validPassword);
    cy.intercept("GET", 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('location');
    cy.wait('@location').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    });
  });

  it('should display error for invalid password', () => {
    loginPage.login(validUsername, 'wrongpassword');
    loginPage.checkErrorMessage('Invalid credentials');
  });

  it('should display error for invalid username', () => {
    loginPage.login('WrongUsername', validPassword);
    loginPage.checkErrorMessage('Invalid credentials');
  });

  it('should display error for empty username', () => {
    loginPage.login(null, validPassword);
    loginPage.checkRequiredMessage('Required');
  });

  it('should display error for empty password', () => {
    loginPage.login(validUsername, null);
    loginPage.checkRequiredMessage('Required');
  });

  it('should display error for empty username and password', () => {
    loginPage.login(null, null);
    loginPage.checkRequiredMessage('Required');
  });

  it('should display error for special characters in username', () => {
    loginPage.login('!@#$%^&*()', validPassword);
    loginPage.checkErrorMessage('Invalid credentials');
  });

  it('should display error for SQL Injection attempt', () => {
    loginPage.login("admin' OR 1=1 --", validPassword);
    loginPage.checkErrorMessage('Invalid credentials');
  });

  it('forgot password', () => {
    loginPage.clickForgotPassword();
    // Add additional assertions for forgot password page if necessary
  });
});
