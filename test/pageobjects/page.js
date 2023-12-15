const {browser} = require('@wdio/globals')


module.exports = class Page {
    async open(path) {
        return await browser.url(`${path}`)
    }

    async verify(locator) {
        await expect(locator).toExist();
    }

    async verifyURL(path) {
        await expect(browser).toHaveUrl(expect.stringContaining(path));
    }

    async waitForLoad() {
        await browser.waitUntil(async () => {
            const state = await browser.execute(() => document.readyState);
            return state === 'complete';
        });
    }

    async clearInputValue(selector) {
        const valueLength = (await selector.getValue()).length;
        for (let i = 0; i < valueLength; i++) {
            await selector.addValue('\uE003');
        }
    }
}
