const {expect, browser} = require('@wdio/globals')
const {Faker} = require('../helper/faker');
const BankAccountsPage = require('../pageobjects/bank-accounts.page')
const NewBankAccountsPage = require('../pageobjects/new-bank-accounts.page')
const Data = require('../data/data')

describe('Bank account', async () => {

    beforeEach(async function () {
        const validUsername = Data.user1.valid_username;
        const validPassword = Data.user1.valid_password;

        await BankAccountsPage.navigate(validUsername, validPassword);
        await BankAccountsPage.verify();
    });

    afterEach(async function () {
        await browser.deleteCookies();
        await browser.reloadSession();
    });

    it('Create new bank account with valid credentials', async () => {
        const validBankName = Faker.generateRandomString(6);
        const validRoutingNumber = Faker.generateRandomNumberString(9);
        const validAccountNumber = Faker.generateRandomNumberString(9);

        await BankAccountsPage.clickCreateBankAccountBtn();
        await NewBankAccountsPage.verify();

        await NewBankAccountsPage.createBankAccount(validBankName, validRoutingNumber, validAccountNumber);
        await NewBankAccountsPage.clickSaveBtn();
        await BankAccountsPage.verify();
        await expect(BankAccountsPage.BankAccountName(validBankName)).toHaveText(validBankName);
    });

    it('Create new bank account with invalid credentials', async () => {
        const invalidBankName = Faker.generateRandomString(1);
        const invalidRoutingNumber = Faker.generateRandomNumberString(1);
        const invalidAccountNumber = Faker.generateRandomNumberString(1);

        await BankAccountsPage.clickCreateBankAccountBtn();
        await NewBankAccountsPage.verify();

        await NewBankAccountsPage.createBankAccount(invalidBankName, invalidRoutingNumber, invalidAccountNumber);

        await expect(NewBankAccountsPage.bankNameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(NewBankAccountsPage.invalidBankNameAlert).toHaveText(NewBankAccountsPage.invalidBankNameAlertMessage);

        await expect(NewBankAccountsPage.routingNumberInput).toHaveAttribute('aria-invalid', 'true');
        await expect(NewBankAccountsPage.invalidRoutingNumberAlert).toHaveText(NewBankAccountsPage.invalidRoutingNumberAlertMessage);

        await expect(NewBankAccountsPage.accountNumberInput).toHaveAttribute('aria-invalid', 'true');
        await expect(NewBankAccountsPage.invalidAccountNumberAlert).toHaveText(NewBankAccountsPage.invalidAccountNumberAlertMessage);
    });

    it('Create new bank account with empty fields', async () => {
        await BankAccountsPage.clickCreateBankAccountBtn();
        await NewBankAccountsPage.verify();

        await NewBankAccountsPage.doubleClickSaveBtn();

        await expect(NewBankAccountsPage.bankNameInput).toHaveAttribute('aria-invalid', 'true');
        await expect(NewBankAccountsPage.invalidBankNameAlert).toHaveText(NewBankAccountsPage.emptyBankNameAlertMessage);
    });

    it('Delete bank account', async () => {
        const validBankName = Faker.generateRandomString(6);
        const validRoutingNumber = Faker.generateRandomNumberString(9);
        const validAccountNumber = Faker.generateRandomNumberString(9);

        await BankAccountsPage.clickCreateBankAccountBtn();
        await NewBankAccountsPage.verify();

        await NewBankAccountsPage.createBankAccount(validBankName, validRoutingNumber, validAccountNumber);
        await NewBankAccountsPage.clickSaveBtn();
        await BankAccountsPage.verify();

        await BankAccountsPage.clickRemoveBankAccountByNameBtn(validBankName);
        await expect(BankAccountsPage.BankAccountName(validBankName)).toHaveText(expect.stringContaining('(Deleted)'));
    });
})