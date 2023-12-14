const Page = require('./page');
const LoginPage = require('./login.page');
class MainPage extends Page {
    get transactionList() {
        return $('div[data-test=\'transaction-list\']')
    }

    get userTag() {
        return $('h6[data-test=\'sidenav-username\']');
    }

    async clickFirstTransaction() {
        return $('div[role=\'rowgroup\'] div:nth-child(1) li:nth-child(1)').click();
    }

    async clickTransaction(description) {
        const xpathSelector = `//p[contains(text(), '${description}')]`;
        return await $(xpathSelector).click();
    }

    clickLogoutBtn() {
        return $('div[class=\'MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button\']').click();
    }

    clickMyAccountBtn() {
        return $('div[class=\'MuiDrawer-root MuiDrawer-docked\'] a:nth-child(2)').click();
    }

    clickBankAccountsBtn() {
        return $('div[class=\'MuiDrawer-root MuiDrawer-docked\'] a:nth-child(3)').click();
    }

    clickNewTransactionBtn() {
        return $('a[data-test="nav-top-new-transaction"]').click();
    }

    async navigate(username, password) {
        await LoginPage.navigate();
        await LoginPage.verify();
        await LoginPage.login(username, password);
    }

    async open(){
        await super.open('/');
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.transactionList);
        await super.verifyURL('/');
    }

}

module.exports = new MainPage();
