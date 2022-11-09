const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'nu5phk',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "watchForFileChanges":false,
    "defaultCommandTimeout":10000
  }
});
