const Page = require('./page');

class RegistrationPage extends Page {

    passwordMismatchAlertMessage = 'Password does not match';
    emptyFirstNameAlertMessage = 'First Name is required';

    get firstNameInput() {
        return $('#firstName')
    }

    get lastNameInput() {
        return $('#lastName')
    }

    get usernameInput() {
        return $('#username')
    }

    get passwordInput() {
        return $('#password')
    }

    get confirmPasswordInput() {
        return $('#confirmPassword')
    }

    get passwordMismatchAlert() {
        return $('#confirmPassword-helper-text')
    }

    get emptyFirstNameAlert() {
        return $('#firstName-helper-text')
    }

    clickSubmitBtn() {
        return $('button[type=\'submit\']').click();
    }

    async register(firstName, lastName, username, password, confirmPassword) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.confirmPasswordInput.setValue(confirmPassword);
    }

    async navigate() {
        return await super.open('/signup');
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.firstNameInput);
        await super.verifyURL('/signup');
    }

}

module.exports = new RegistrationPage();
