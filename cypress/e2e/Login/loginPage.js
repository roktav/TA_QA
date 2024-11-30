class LoginPage {
    constructor() {
      this.usernameInput = '[name="username"]';
      this.passwordInput = '[name="password"]';
      this.loginButton = '.orangehrm-login-button'; // Updated selector
      this.errorMessage = '.oxd-alert.oxd-alert--error';
      this.requiredMessage = 'span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message';
      this.forgotPasswordLink = '.oxd-text.oxd-text--p.orangehrm-login-forgot-header';
    }
  
    visit() {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
      cy.get(this.usernameInput, { timeout: 10000 }).should('be.visible'); // Ensure the page is loaded
    }
  
    login(username, password) {
      if (username !== null) cy.get(this.usernameInput).clear().type(username);
      if (password !== null) cy.get(this.passwordInput).clear().type(password);
      cy.contains('button', 'Login', { timeout: 10000 }).click(); // Updated with timeout
    }
  
    checkErrorMessage(expectedMessage) {
      cy.get(this.errorMessage).should('be.visible').and('contain.text', expectedMessage);
    }
  
    checkRequiredMessage(expectedMessage) {
      cy.get(this.requiredMessage).should('be.visible').and('contain.text', expectedMessage);
    }
  
    clickForgotPassword() {
      cy.get(this.forgotPasswordLink).click();
    }
  }
  
  export default LoginPage;
  