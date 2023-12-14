const Page = require('./page');
const MainPage = require('./main.page');

class TransactionPage extends Page {

    emptyAmountAlertMessage = 'Please enter a valid amount';

    get searchUserInput() {
        return $('#user-list-search-input');
    }

    get firstUser() {
        return $('li.MuiListItem-root:first-of-type');
    }

    get amountInput() {
        return $('#amount');
    }

    get descriptionInput() {
        return $('#transaction-create-description-input');
    }

    get createRequestTransactionBtn() {
        return $('div.MuiGrid-justify-content-xs-center div:nth-child(1)');
    }

    get createPayTransactionBtn() {
        return $('div.MuiGrid-justify-content-xs-center div:nth-child(2)');
    }

    get transactionText() {
        return $('div.MuiGrid-justify-content-xs-center h2');
    }

    get invalidAmountAlert() {
        return $('#transaction-create-amount-input-helper-text');
    }

    get acceptRequestBtn() {
        return $('button[data-test*="accept"]');
    }

    get rejectRequestBtn() {
        return $('button[data-test*="reject"]');
    }

    get transactionAction() {
        return $('span[data-test*="transaction-action"]');
    }

    get likeButton() {
        return $('button[data-test*="like"]');
    }

    get likeCountText() {
        return $('div[data-test*="like-count"]').getText();
    }

    setSearchUser(user) {
        return this.searchUserInput.setValue(user);
    }

    setAmount(amount) {
        return this.amountInput.setValue(amount);
    }

    setDescription(description) {
        return this.descriptionInput.setValue(description);
    }

    clickCreateRequestTransactionBtn() {
        return this.createRequestTransactionBtn.click();
    }

    clickCreatePayTransactionBtn() {
        return this.createPayTransactionBtn.click();
    }

    clickAcceptRequestBtn() {
        return this.acceptRequestBtn.click();
    }

    clickRejectRequestBtn() {
        return this.rejectRequestBtn.click();
    }

    async clickLikeButton() {
        await this.likeButton.click();
    }

    async navigate(username, password) {
        await MainPage.navigate(username, password);
        await MainPage.verify();
        await MainPage.clickNewTransactionBtn();
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.searchUserInput);
        await super.verifyURL('/transaction/new');
    }

}

module.exports = new TransactionPage();
