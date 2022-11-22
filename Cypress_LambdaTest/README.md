## Pre-request Dependencies must be installed

- node version - ^14.20.0
- npm version - [latest]
- Cypress version - ^10.0.0

## Install Cypress

Cypress installation command

> npm init -y
> npm install cypress

To verify if cypress is properly installed

> npx cypress -v
> npx cypress verify

How to open cypress UI

> npx cypress open

## Run the Cypress Code on LambdaTest Automation Test Platform.

## Step-up lambdatest for Cypress test case execution

Step 1: Install the CLI.
Install the LambdaTest using Cypress CLI command via npm. LambdaTest’s command-line interface allows us to run your Cypress tests on LambdaTest.

> npm install -g lambdatest-cypress-cli

Step 2: Generate lambdatest-config.json.

> lambdatest-cypress init

## In the generated lambdatest-config.json file, pass the below information.

Fill required values in the section lambdatest_auth, browsers, and run_settings to run your tests.

```json
{
"lambdatest_auth": {
"username": "username",
"access_key": "access_key"
},
"browsers": [
{
"browser": "Chrome",
"platform": "Windows 10",
"versions": ["latest-1"]
},
{
"browser": "Firefox",
"platform": "Windows 10",
"versions": ["latest-1"]
}
],
"run_settings": {
"config_file": "cypress.config.js",
"build_name": "build-name",
"parallels": 2,
"specs": "./cypress/e2e/e2e testing/Common/*.cy.js",
"ignore_files": "",
"feature_file_suppport": false,
"network": false,
"headless": false,
"reporter_config_file": "",
"npm_dependencies": {
"npm-run-all": "4.1.2",
"typescript": "3.7.4",
"cypress-file-upload": "5.0.8"
},
"cypress_version": "10.0.0"
},
"tunnel_settings": {
"tunnel": false,
"tunnel_name": null
}
}
```

## Find package.json file and update the below information.
```json

{
"name": "cypress",
"version": "1.0.0",
"description": "",
"main": "index.js",
"files": [
"cypress"
],
"standard": {
"globals": [
"describe",
"context",
"before",
"beforeEach",
"after",
"afterEach",
"should",
"it",
"expect"
]
},
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
"chai": "4.3.7",
"cypress": "^10.0.0",
"cypress-file-upload": "5.0.8",
"lambdatest-cypress-cli": "3.0.4"
},
"devDependencies": {
"@cypress/eslint-plugin-dev": "5.0.0",
"eslint": "7.0.0",
"eslint-plugin-mocha": "5.3.0"
}
}

```
# Now Run the following command to fetch and Install the Relative Dependancies

> npm install

> npm update

## Note: If you face any Mocha or ESlint realted dependency issues in any process of execution the command, you can overlapped all the dependancied using the below command-

> npm config set legacy-peer-deps true

> npm install

> npm update

## To Run Code on Lambda Automation test build, Run the below command-

> lambdatest-cypress run

