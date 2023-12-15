const Page = require('./page');
const MainPage = require('./main.page');

class SettingsPage extends Page {

    emptyFirstNameAlertMessage = 'Enter a first name';
    emptyLastNameAlertMessage = 'Enter a last name';
    emptyEmailAlertMessage = 'Enter an email address';
    emptyPhoneNumberAlertMessage = 'Enter a phone number';

    get firstNameInput() {
        return $('#user-settings-firstName-input');
    }

    get lastNameInput() {
        return $('#user-settings-lastName-input');
    }

    get emailInput() {
        return $('#user-settings-email-input');
    }

    get phoneNumberInput() {
        return $('#user-settings-phoneNumber-input');
    }

    get accountName() {
        return $('.MuiTypography-root.MuiTypography-subtitle1.MuiTypography-colorTextPrimary');
    }

    get emptyFirstNameAlert() {
        return $('#user-settings-firstName-input-helper-text');
    }

    get emptyLastNameAlert() {
        return $('#user-settings-lastName-input-helper-text');
    }

    get emptyEmailAlert() {
        return $('#user-settings-email-input-helper-text');
    }

    get emptyPhoneNumberAlert() {
        return $('#user-settings-phoneNumber-input-helper-text');
    }

    async setFirstName(value) {
        await super.clearInputValue(this.firstNameInput);
        await this.firstNameInput.setValue(value);
    }

    async setLastName(value) {
        await super.clearInputValue(this.lastNameInput);
        await this.lastNameInput.setValue(value);
    }

    async setEmail(value) {
        await super.clearInputValue(this.emailInput);
        await this.emailInput.setValue(value);
    }

    async setPhoneNumber(value) {
        await this.clearInputValue(this.phoneNumberInput);
        await $('#user-settings-phoneNumber-input').setValue(value);
    }

    clickSubmitBtn() {
        return $('button[type=\'submit\']').click();
    }

    async navigate(username, password) {
        await MainPage.navigate(username, password);
        await MainPage.verify();
        await MainPage.clickMyAccountBtn();
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.firstNameInput);
        await super.verifyURL('/settings');
    }

}

module.exports = new SettingsPage();
