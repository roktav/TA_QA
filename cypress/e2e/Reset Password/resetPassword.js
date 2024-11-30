class ResetPasswordPage {
    visit() {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    }
  
    enterUsernameOrEmail(usernameOrEmail) {
      cy.get('input[name="username"]').type(usernameOrEmail);
    }
  
    clickReset() {
      cy.get('button[type="submit"]').click();
    }

    clickCancel() {
        cy.contains('button','Cancel').click();
      }
  
    interceptResetPassword() {
      cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword').as('resetRequest');
    }
  
    validateSuccessMessage() {
      cy.wait('@resetRequest').its('response.statusCode').should('eq', 302);
      cy.get('.orangehrm-forgot-password-title').should('be.visible').and('contain.text', 'Reset Password link sent successfully');
    }

    validateErrorMessage(message) {
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain.text', message);
    }
  }
  
  export default ResetPasswordPage;