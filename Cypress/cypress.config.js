const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9wv5c6',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    "watchForFileChanges":false,
    "defaultCommandTimeout":12000,
    "chromeWebSecurity":false
  },
});
