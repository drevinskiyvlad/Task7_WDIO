const Page = require('./page');
const LoginPage = require('./login.page');

class MainPage extends Page {
    get transactionList() {
        return $('div[data-test=\'transaction-list\']')
    }

    get userTag() {
        return $('h6[data-test=\'sidenav-username\']');
    }

    get logoutBtn() {
        return $('div[data-test*=\'signout\']');
    }

    get myAccountBtn() {
        return $('a[data-test*=\'settings\']');
    }

    get bankAccountsBtn() {
        return $('a[data-test*=\'bank\']');
    }

    get newTransactionBtn() {
        return $('a[data-test*=\'new-transaction\']');
    }

    async clickFirstTransaction() {
        return $('div[role=\'rowgroup\'] div:nth-child(1) li:nth-child(1)').click();
    }

    async clickTransaction(description) {
        const xpathSelector = `//p[contains(text(), '${description}')]`;
        return await $(xpathSelector).click();
    }

    clickLogoutBtn() {
        return this.logoutBtn.click();
    }

    clickMyAccountBtn() {
        return this.myAccountBtn.click();
    }

    clickBankAccountsBtn() {
        return this.bankAccountsBtn.click();
    }

    clickNewTransactionBtn() {
        return this.newTransactionBtn.click();
    }

    async navigate(username, password) {
        await LoginPage.navigate();
        await LoginPage.verify();
        await LoginPage.login(username, password);
    }

    async open() {
        await super.open('/');
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.transactionList);
        await super.verifyURL('/');
    }

}

module.exports = new MainPage();
