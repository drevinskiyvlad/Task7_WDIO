const {expect, browser} = require('@wdio/globals')
const {Faker} = require('../helper/faker');
const LoginPage = require('../pageobjects/login.page')
const RegistrationPage = require('../pageobjects/registration.page')
const MainPage = require('../pageobjects/main.page')
const Data = require('../data/data')

describe('Login', async () => {

    beforeEach(async function () {
        await LoginPage.navigate();
        await LoginPage.verify();
    });

    afterEach(async function () {
        await browser.deleteCookies();
        await browser.reloadSession();
    });

    it('Login with valid credentials', async () => {
        const firstValidUsername = Data.user1.valid_username;
        const firstValidPassword = Data.user1.valid_password;
        const secondValidUsername = Data.user2.valid_username;
        const secondValidPassword = Data.user2.valid_password;

        await LoginPage.login(firstValidUsername, firstValidPassword);
        await MainPage.verify();
        await expect(MainPage.userTag).toHaveText('@' + firstValidUsername);

        await MainPage.clickLogoutBtn();
        await LoginPage.verify();

        await LoginPage.login(secondValidUsername, secondValidPassword);
        await MainPage.verify();
        await expect(MainPage.userTag).toHaveText('@' + secondValidUsername);
    })

    it('Login with invalid credentials', async () => {
        const invalidUsername = Faker.generateRandomString(8);
        const invalidPassword = Faker.generateRandomString(8);

        await LoginPage.login(invalidUsername, invalidPassword);
        await expect(LoginPage.errorAlert).toHaveText(LoginPage.invalidCredentialsAlertMessage);
    })

    it('Login with invalid password', async () => {
        const validUsername = Data.user1.valid_username;
        const invalidPassword = Faker.generateRandomString(8);

        await LoginPage.login(validUsername, invalidPassword);
        await expect(LoginPage.errorAlert).toHaveText(LoginPage.invalidCredentialsAlertMessage);
    })

    it('Login with empty fields', async () => {
        await LoginPage.clickSubmitBtn();
        await expect(LoginPage.usernameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(LoginPage.invalidUsernameAlert).toHaveText(LoginPage.emptyUsernameAlertMessage);
    })

    it('Logout', async () => {
        const validUsername = Data.user1.valid_username;
        const validPassword = Data.user1.valid_password;

        await LoginPage.login(validUsername, validPassword);
        await MainPage.verify();
        await expect(MainPage.userTag).toHaveText('@' + validUsername);
        await MainPage.clickLogoutBtn();
        await LoginPage.verify();
    })

    it('Registration with valid credentials', async () => {
        const firstName = Faker.generateRandomString(8);
        const lastName = Faker.generateRandomString(8);
        const username = Faker.generateRandomString(8);
        const password = Faker.generateRandomString(8);
        const confirmPassword = password;

        await LoginPage.clickRegistrationLink();
        await RegistrationPage.navigate();
        await RegistrationPage.verify();
        await RegistrationPage.register(firstName, lastName, username, password, confirmPassword);
        await RegistrationPage.clickSubmitBtn();
        await LoginPage.verify();
    })

    it('Registration with incorrect password confirmation', async () => {
        const firstName = Faker.generateRandomString(8);
        const lastName = Faker.generateRandomString(8);
        const username = Faker.generateRandomString(8);
        const password = Faker.generateRandomString(8);
        const confirmPassword = Faker.generateRandomString(8);

        await LoginPage.clickRegistrationLink();
        await RegistrationPage.navigate();
        await RegistrationPage.verify();
        await RegistrationPage.register(firstName, lastName, username, password, confirmPassword);
        await expect(RegistrationPage.confirmPasswordInput).toHaveAttribute('aria-invalid', 'true');
        await expect(RegistrationPage.passwordMismatchAlert).toHaveText(RegistrationPage.passwordMismatchAlertMessage);
    })

    it('Registration with empty fields', async () => {
        await LoginPage.clickRegistrationLink();
        await RegistrationPage.navigate();
        await RegistrationPage.verify();
        await RegistrationPage.clickSubmitBtn();
        await expect(RegistrationPage.firstNameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(RegistrationPage.emptyFirstNameAlert).toHaveText(RegistrationPage.emptyFirstNameAlertMessage);
    })
})