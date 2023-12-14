const Page = require('./page');

class NewBankAccountPage extends Page {

    invalidBankNameAlertMessage = 'Must contain at least 5 characters';
    invalidRoutingNumberAlertMessage = 'Must contain a valid routing number';
    invalidAccountNumberAlertMessage = 'Must contain at least 9 digits';

    emptyBankNameAlertMessage = 'Enter a bank name';

    get saveBtn() {
        return $('button[type=\'submit\']');
    }

    get bankNameInput() {
        return $('#bankaccount-bankName-input');
    }

    get routingNumberInput() {
        return $('#bankaccount-routingNumber-input');
    }

    get accountNumberInput() {
        return $('#bankaccount-accountNumber-input');
    }

    get invalidBankNameAlert() {
        return $('#bankaccount-bankName-input-helper-text');
    }

    get invalidRoutingNumberAlert() {
        return $('#bankaccount-routingNumber-input-helper-text');
    }

    get invalidAccountNumberAlert() {
        return $('#bankaccount-accountNumber-input-helper-text');
    }

    setBankName(bankName) {
        return this.bankNameInput.setValue(bankName);
    }

    setRoutingNumber(routingNumber) {
        return this.routingNumberInput.setValue(routingNumber);
    }

    setAccountNumber(accountNumber) {
        return this.accountNumberInput.setValue(accountNumber);
    }

    clickSaveBtn() {
        return this.saveBtn.click();
    }

    doubleClickSaveBtn() {
        return this.saveBtn.doubleClick();
    }

    async createBankAccount(bankName, routingNumber, accountNumber) {
        await this.setBankName(bankName);
        await this.setRoutingNumber(routingNumber);
        await this.setAccountNumber(accountNumber);
    }

    async verify() {
        await super.waitForLoad();
        await super.verify(this.saveBtn);
        await super.verifyURL('bankaccounts/new');

    }

}

module.exports = new NewBankAccountPage();
