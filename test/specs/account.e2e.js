const {expect, browser} = require('@wdio/globals')
const {Faker} = require('../helper/faker');
const SettingsPage = require('../pageobjects/settings.page')
const Data = require('../data/data')

describe('Account', async () => {

    beforeEach(async function () {
        const validUsername = Data.user1.valid_username;
        const validPassword = Data.user1.valid_password;

        await SettingsPage.navigate(validUsername, validPassword);
        await SettingsPage.verify();
    });

    afterEach(async function () {
        await browser.deleteCookies();
        await browser.reloadSession();
    });

    it('Update account info', async () => {
        const validFirstName = Faker.generateRandomString(8);
        const validLastName = Faker.generateRandomString(8);

        await SettingsPage.setFirstName(validFirstName);
        await SettingsPage.setLastName(validLastName);
        await SettingsPage.clickSubmitBtn();
        await expect(SettingsPage.accountName).toHaveText(validFirstName + ' ' + validLastName[0]);
    })

    it('Update account info with empty fields', async () => {
        await SettingsPage.setFirstName('');
        await expect(SettingsPage.firstNameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(SettingsPage.emptyFirstNameAlert).toHaveText(SettingsPage.emptyFirstNameAlertMessage);

        await SettingsPage.setLastName('');
        await expect(SettingsPage.lastNameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(SettingsPage.emptyLastNameAlert).toHaveText(SettingsPage.emptyLastNameAlertMessage);

        await SettingsPage.setEmail('');
        await expect(SettingsPage.emailInput).toHaveAttribute('aria-invalid', 'true');
        await expect(SettingsPage.emptyEmailAlert).toHaveText(SettingsPage.emptyEmailAlertMessage);

        await SettingsPage.setPhoneNumber('');
        await expect(SettingsPage.phoneNumberInput).toHaveAttribute('aria-invalid', 'true');
        await expect(SettingsPage.emptyPhoneNumberAlert).toHaveText(SettingsPage.emptyPhoneNumberAlertMessage);
    })
})