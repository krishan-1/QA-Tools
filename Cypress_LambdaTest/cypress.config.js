const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rv4w7g",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 12000,
    chromeWebSecurity: false,
  },
});
