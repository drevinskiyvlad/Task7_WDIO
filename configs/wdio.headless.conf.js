const dotenv = require('dotenv');

dotenv.config();

exports.config = {

    runner: 'local',

    specs: [
        '../test/specs/**/*.js'
    ],
    suites: {
        login: [
            '../test/specs/login.e2e.js',
        ],
        account: [
            '../test/specs/account.e2e.js',
        ],
        bank_account: [
            '../test/specs/bank_account.e2e.js',
        ],
        transaction: [
            '../test/specs/transaction.e2e.js',
        ],
    },

    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']
        }
    }],

    logLevel: 'warn',

    bail: 0,

    baseUrl: 'http://localhost:3000/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
