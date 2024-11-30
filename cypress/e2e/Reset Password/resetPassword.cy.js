import ResetPasswordPage from '/Users/reihanoktavio/Documents/TA_QA_Sanbercode/cypress/e2e/Reset Password/resetPassword.js';

const resetPasswordPage = new ResetPasswordPage();

describe('Reset Password Tests', () => {
  beforeEach(() => {
    resetPasswordPage.visit();
  });

  it('should send a reset password link for a valid username or email', () => {
    resetPasswordPage.interceptResetPassword();
    resetPasswordPage.enterUsernameOrEmail('Admin');
    resetPasswordPage.clickReset();
    resetPasswordPage.validateSuccessMessage();
  });

  it('should show a required field error for empty input', () => {
    resetPasswordPage.clickReset();
    resetPasswordPage.validateErrorMessage('Required');
  });

  it('should show login page when click cancel', () => {
    cy.intercept("GET", 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('login');
    resetPasswordPage.clickCancel();
    cy.wait('@login').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    });
  });
});