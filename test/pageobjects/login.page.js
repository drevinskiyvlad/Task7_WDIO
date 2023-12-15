const Page = require('./page');

class LoginPage extends Page {

    invalidCredentialsAlertMessage = 'Username or password is invalid';
    emptyUsernameAlertMessage = 'Username is required';

    get usernameInput() {
        return $('#username')
    }

    get passwordInput() {
        return $('#password')
    }

    get registrationLink() {
        return $('a[data-test=\'signup\']')
    }

    get invalidUsernameAlert() {
        return $('#username-helper-text')
    }

    get errorAlert() {
        return $('div[role=\'alert\']')
    }

    clickSubmitBtn() {
        return $('.MuiButton-label').click();
    }

    clickRegistrationLink() {
        return this.registrationLink.click();
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.clickSubmitBtn();
    }

    async navigate() {
        return await super.open('/signin');
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.usernameInput);
        await super.verifyURL('/signin');
    }

}

module.exports = new LoginPage();
