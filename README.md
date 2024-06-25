#TASK 7: WebdriverIO framework

## Summary of Repository

This repository contains automated tests using the WebDriverIO (wdio) testing framework. The tests cover various suites including login, account, bank account, and transaction.

## Requirements

Ensure you have the following prerequisites installed before running the tests:

- Node.js (v18 or higher)
- npm (Node Package Manager)
- yarn v1.22.22 or higher

## Steps to Install

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/drevinskiyvlad/Task7_WDIO
   ```

2. Navigate to the project directory.
   ```bash
   cd your-repo
   ```

3. Install the required dependencies.
   ```bash
   npm install
   ```
   
4. Clone repository with application for testing.
   ```bash
   git clone https://github.com/cypress-io/cypress-realworld-app.git
   ```
   
5. Install the required dependencies.
   ```bash
   yarn install
   ```

6. Run the site application.
   ```bash
    yarn dev
    ```
   
## Steps to Launch Tests

To run the tests, you may use the following commands:

### Run All Tests
```bash
npm run test
```

### Run Tests in Firefox
```bash
npm run test:firefox
```

### Run Tests in Edge
```bash
npm run test:edge
```

### Run Login Suite
```bash
npm run test:suite:login
```

### Run Account Suite
```bash
npm run test:suite:account
```

### Run Bank Account Suite
```bash
npm run test:suite:bank-account
```

### Run Transaction Suite
```bash
npm run test:suite:transaction
```

## Steps to Create the Report

Use the following commands to generate and view the Allure report:

```bash
npm run report
```

Or run the following commands separately:

1. Generate the Allure report.
   ```bash
   npm run report:generate
   ```

2. Open the generated Allure report in the default browser.
   ```bash
   npm run report:open
   ```
