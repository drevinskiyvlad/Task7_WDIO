const {expect, browser} = require('@wdio/globals')
const {Faker} = require('../helper/faker');
const TransactionPage = require('../pageobjects/transaction.page')
const MainPage = require('../pageobjects/main.page')
const Data = require('../data/data')

describe('Transaction', async () => {

    beforeEach(async function () {
        const validUsername = Data.user1.valid_username;
        const validPassword = Data.user1.valid_password;

        await TransactionPage.navigate(validUsername, validPassword);
        await TransactionPage.verify();
    });

    afterEach(async function () {
        await browser.deleteCookies();
        await browser.reloadSession();
    });

    it('Create request transaction', async () => {
        const amount = Faker.generateRandomNumberString(2);
        const description = Faker.generateRandomString(6);

        await TransactionPage.firstUser.click();
        await TransactionPage.setAmount(amount);
        await TransactionPage.setDescription(description);
        await TransactionPage.clickCreateRequestTransactionBtn();
        await expect(TransactionPage.transactionText).toHaveText(`Requested $${amount}.00 for ${description}`);
    });

    it('Create pay transaction', async () => {
        const amount = Faker.generateRandomNumberString(2);
        const description = Faker.generateRandomString(6);

        await TransactionPage.firstUser.click();
        await TransactionPage.setAmount(amount);
        await TransactionPage.setDescription(description);
        await TransactionPage.clickCreatePayTransactionBtn();
        await expect(TransactionPage.transactionText).toHaveText(`Paid $${amount}.00 for ${description}`);
    });

    it('Create transaction with empty fields', async () => {
        await TransactionPage.firstUser.click();
        await TransactionPage.clickCreatePayTransactionBtn();

        await expect(TransactionPage.amountInput).toHaveAttribute('aria-invalid', 'true');
        await expect(TransactionPage.invalidAmountAlert).toHaveText(TransactionPage.emptyAmountAlertMessage);
    });

    it('Accept request transaction', async () => {
        const amount = Faker.generateRandomNumberString(2);
        const description = Faker.generateRandomString(6);
        const validUser2Username = Data.user2.valid_username;
        const validUser2Password = Data.user2.valid_password;

        await TransactionPage.setSearchUser(validUser2Username);
        await TransactionPage.firstUser.click();
        await TransactionPage.setAmount(amount);
        await TransactionPage.setDescription(description);
        await TransactionPage.clickCreateRequestTransactionBtn();
        await expect(TransactionPage.transactionText).toHaveText(`Requested $${amount}.00 for ${description}`);

        await MainPage.clickLogoutBtn();

        await MainPage.navigate(validUser2Username, validUser2Password);
        await MainPage.verify();

        await MainPage.clickTransaction(description);
        await TransactionPage.clickAcceptRequestBtn();
        await expect(TransactionPage.transactionAction).toHaveText('charged');
    });

    it('Reject request transaction', async () => {
        const amount = Faker.generateRandomNumberString(2);
        const description = Faker.generateRandomString(6);
        const validUser2Username = Data.user2.valid_username;
        const validUser2Password = Data.user2.valid_password;

        await TransactionPage.setSearchUser(validUser2Username);
        await TransactionPage.firstUser.click();
        await TransactionPage.setAmount(amount);
        await TransactionPage.setDescription(description);
        await TransactionPage.clickCreateRequestTransactionBtn();
        await expect(TransactionPage.transactionText).toHaveText(`Requested $${amount}.00 for ${description}`);

        await MainPage.clickLogoutBtn();

        await MainPage.navigate(validUser2Username, validUser2Password);
        await MainPage.verify();

        await MainPage.clickTransaction(description);
        await TransactionPage.clickRejectRequestBtn();
        await expect(TransactionPage.transactionAction).toHaveText('requested');
    });

    it('Like transaction', async () => {
        await MainPage.open();
        await MainPage.verify();

        await MainPage.clickFirstTransaction();

        let likeNumber = parseInt(await TransactionPage.likeCountText);

        await TransactionPage.clickLikeButton();
        await expect(parseInt(await TransactionPage.likeCountText)).toEqual(likeNumber + 1);
    });
})