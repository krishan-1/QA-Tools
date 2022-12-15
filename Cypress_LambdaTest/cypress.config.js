const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rv4w7g",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
