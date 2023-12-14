const Page = require('./page');
const MainPage = require("./main.page");

class BankAccountPage extends Page {

    get createBankAccountBtn() {
        return $('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-containedSizeLarge.MuiButton-sizeLarge')
    }

    BankAccountName(bankName) {
        const xpathSelector = `//p[contains(text(), '${bankName}')]`;
        return $(xpathSelector);
    }

    clickCreateBankAccountBtn() {
        return this.createBankAccountBtn.click();
    }

    async clickRemoveBankAccountByNameBtn(bankName) {
        const xpathSelector = `//p[contains(text(), '${bankName}')]/../following-sibling::div/button`;
        return await $(xpathSelector).click();
    }

    async navigate(username, password) {
        await MainPage.navigate(username, password);
        await MainPage.verify();
        await MainPage.clickBankAccountsBtn();
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.createBankAccountBtn);
        await super.verifyURL('/bankaccounts');

    }

}

module.exports = new BankAccountPage();
