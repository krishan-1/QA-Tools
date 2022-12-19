describe("SAM Builder E2E Testing", function () {
  const p = "coffee.jpg";
  const path = require("path");
  var assetsCount;

  before(function () {
    cy.fixture("kurator.json").then((kuratorData) => {
      this.kuratorData = kuratorData;
      cy.window().then(() => {
        localStorage.setItem("jwt", this.kuratorData.jwt);
        localStorage.setItem("tenant.id", this.kuratorData.tenant_id);
      });
      cy.visit("https://admin-staging.sourcesync.io/#/");
    });
  });

  it("click to SAM Builder Tab", function () {
    cy.intercept("/currentuser/activations?*").as("fetchActivations");
    cy.contains("div", "SAM Builder").click();
    cy.wait("@fetchActivations");
  });

  it("create new SAM", function () {
    cy.get(`.q-page [role='img']`)
      .contains("add")
      .should("be.visible")
      .trigger("click");
    cy.intercept("/activations/count?*").as("fetchCountOfActivations");
    cy.get(`.q-form [aria-label='Name']`).type("cypress activation");
    cy.wait("@fetchCountOfActivations").then((interceptor) => {
      expect(interceptor.response.body).to.equal(0, "SAM should be unique.");
      cy.intercept("POST", "/activations").as("activationCreated");
      cy.intercept("/activations/*").as("activationOpen");
      cy.get(".block").contains("Submit").should("be.visible").click();
      cy.wait("@activationCreated").then(() => {
        cy.wait("@activationOpen");
      });
    });
  });

  it("Click on Edit SAM Overlay", function () {
    cy.get(`[role="tab"]`).eq(1).click();
  });

  it("Validate Preview Text In Edit SAM Overlay", function () {
    let text = "verify the preview text";
    cy.get('input[aria-label="Preview Text"]').type(text);
    cy.get(".smartblock-display__label>div").each(($label) => {
      expect($label.text().trim()).to.equal(text);
    });
  });

  it("convert to smart block toggle should be enable and Display smart block should be enable and visible", function () {
    cy.get(".q-list--bordered .q-expansion-item")
      .eq(4)
      .should("have.class", "q-expansion-item--expanded")
      .then(() => {
        cy.get(".q-list--bordered .q-expansion-item")
          .eq(4)
          .within(() => {
            cy.get(
              `[aria-label="Convert to SmartBlocks"] > div.q-toggle__inner`
            ).should("have.class", "q-toggle__inner--truthy");
            cy.get(".q-card__section--horiz").within(() => {
              cy.get("strong")
                .invoke("text")
                .should("contains", "Display Smartblock");
              cy.get(
                `[aria-label="Enable Block"] > div.q-toggle__inner`
              ).should("have.class", "q-toggle__inner--truthy");
            });
          });
      });
  });
});
