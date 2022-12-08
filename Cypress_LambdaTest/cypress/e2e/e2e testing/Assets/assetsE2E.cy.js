import { createFolder } from "../../utils/Common/createNewFolder";
describe("Assets E2E Testing", function () {
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

  it("click to assets tab", function () {
    cy.intercept("/currentuser/media/folders/?*").as("loadAssets");
    cy.contains("div", "Assets").click();
    cy.wait("@loadAssets");
  });

  it("upload assets", function () {
    cy.contains("Upload").click(); //click upload button
    cy.intercept("/user-medias").as("fetchAssets");
    cy.get(
      ".q-uploader__header-content > .q-btn  > .q-btn__wrapper > .q-btn__content > input"
    ).attachFile(p);
    cy.wait("@fetchAssets").then((interceptor) => {
      assetsCount = interceptor.response.body;
      cy.get(".q-uploader__file--uploaded > .q-uploader__file-header").click(); //Hit right click
      cy.get(".asset-upload-dialog__card > .items-center > .q-btn ").click(); //Hit cross icon
      cy.get(".col-4 > .q-btn--rectangle").click(); //Hit cross icon
    });
  });

  it(
    "validate more than 2000 px size alert",
    { scrollBehavior: false },
    function () {
      cy.get(".q-table__grid-content > div div.q-img__image")
        .eq(0)
        .then(($element) => {
          var img = new Image();
          img.src = $element
            .css("background-image")
            .substring(
              $element.css("background-image").indexOf(`"`) + 1,
              $element.css("background-image").lastIndexOf(`"`)
            );
          img.onload = function () {
            return this.width;
          };
          if (img.onload() >= 2000) {
            cy.get(".image-list__card")
              .eq(0)
              .scrollIntoView({ offset: { top: -150, left: 0 } })
              .find("i.text-negative.q-mr-sm.q-icon")
              .realHover()
              .then(() => {
                cy.get("div[role=complementary]").then(($tooltip) => {
                  expect($tooltip).to.contain(
                    "Image size is larger than 2000px"
                  );
                  cy.log($tooltip.text());
                });
              });
          } else {
            cy.get(".image-list__card")
              .eq(0)
              .within(() => {
                cy.get("i.text-negative.q-mr-sm.q-icon").should("not.exist");
              });
          }
        });
    }
  );

  it("validate pagination", function () {
    if (assetsCount == 0) {
      //pagination should not be shown
      cy.get(".q-table__bottom .q-table__control").should("not.exist");
    } else if (assetsCount > 0 && assetsCount <= 10) {
      //all arrow should be disable
      cy.get(".q-table__bottom .q-table__control")
        .eq(1)
        .find("button")
        .should("not.exist");
      cy.get(".q-select__dropdown-icon").click();
      cy.intercept("/currentuser/media?*").as("fetchAssets");
      cy.contains("div", "50").click();
      cy.wait("@fetchAssets").then(() => {
        cy.get(".q-field__native > span").invoke("text").should("eq", "50");
      });
    } else if (assetsCount > 10) {
      cy.get(".q-table__bottom .q-table__control > button")
        .eq(0)
        .should("be.disabled");
      cy.get(".q-table__bottom .q-table__control > button")
        .eq(1)
        .should("be.disabled");
      cy.intercept("/currentuser/media?*").as("fetchAssets");
      cy.get(".q-table__bottom .q-table__control > button")
        .eq(2)
        .should("not.be.disabled")
        .click();
      cy.wait("@fetchAssets").then(() => {
        cy.intercept("/currentuser/media?*").as("fetchAssets");
        cy.get(".q-table__bottom .q-table__control > button")
          .eq(1)
          .should("not.be.disabled")
          .click();
        cy.wait("@fetchAssets").then(() => {
          cy.intercept("/currentuser/media?*").as("fetchAssets");
          cy.get(".q-table__bottom .q-table__control > button")
            .eq(3)
            .should("not.be.disabled")
            .click();
          cy.wait("@fetchAssets").then(() => {
            cy.intercept("/currentuser/media?*").as("fetchAssets");
            cy.get(".q-table__bottom .q-table__control > button")
              .eq(0)
              .should("not.be.disabled")
              .click();
            cy.wait("@fetchAssets").then(() => {
              cy.get(".q-select__dropdown-icon").click();
              cy.intercept("/currentuser/media?*").as("fetchAssets");
              cy.contains("div", "50").click();
              cy.wait("@fetchAssets").then(() => {
                cy.get(".q-field__native > span")
                  .invoke("text")
                  .should("eq", "50");
              });
            });
          });
        });
      });
    }
  });

  it("validate Assets Label", function () {
    cy.get(".q-table__grid-content > div").eq(0).click();
    cy.get("aside.q-drawer--right")
      .find("div.text-word-break")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(p);
      });
  });

  it("validate uploaded and last updated date & time", function () {
    cy.contains("Uploaded")
      .parent()
      .siblings()
      .children()
      .invoke("text")
      .then((text) => {
        cy.log(
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
        expect(text).include(
          new Date().toLocaleDateString(),
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      });
    cy.contains("Last Updated")
      .parent()
      .siblings()
      .children()
      .invoke("text")
      .then((text) => {
        expect(text).include(
          new Date().toLocaleDateString(),
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      });
  });

  it("validate copy link available into right side box", function () {
    let url1;
    cy.get(".q-table__grid-content > div div.q-img__image")
      .eq(0)
      .then((ele) => {
        url1 = ele
          .css("background-image")
          .substring(
            ele.css("background-image").indexOf(`"`) + 1,
            ele.css("background-image").lastIndexOf(`"`)
          );
      });
    cy.get("aside.q-drawer--right button")
      .eq(0)
      .focus()
      .click()
      .then(() => {
        cy.window()
          .its("navigator.clipboard")
          .invoke("readText")
          .then((text) => {
            expect(url1).to.equal(text);
          });
      });
  });

  it("validate download button", function () {
    cy.get("aside.q-drawer--right button").eq(2).click(); //Click on download button
    cy.get(".q-card").within(() => {
      cy.contains("Download").click();
    });
    cy.get("aside.q-drawer--right")
      .find("div.text-word-break")
      .invoke("text")
      .then((assetsLabel) => {
        cy.readFile(
          path.join(Cypress.config("downloadsFolder"), assetsLabel.trim())
        );
      });
  });

  it("validate description field, save & cross & refresh button", function () {
    cy.get(`[aria-label="Description"]`)
      .clear()
      .type("Writing some description here.");
    cy.intercept("/currentuser/media?*").as("save");
    cy.contains("span", "Save").click();
    cy.wait("@save").then(() => {
      cy.contains("i", "close").click();
    });
    cy.intercept("/currentuser/media?*").as("refresh");
    cy.contains("i", "refresh").click();
    cy.wait("@refresh").then(() => {
      cy.get(".q-table__grid-content > div").eq(0).click();
      cy.get(`[aria-label="Description"]`)
        .invoke("val")
        .should("eq", "Writing some description here.");
    });
    cy.contains("i", "close").click();
  });

  it("validate duplicate functionality", function () {
    var beforeMoveLabelText;
    cy.get(".q-table__grid-content > div ")
      .eq(0)
      .within(() => {
        cy.get(".ellipsis-2-lines")
          .invoke("text")
          .then((beforeMoveLabelText) => {
            this.beforeMoveLabelText = beforeMoveLabelText;
          });
        cy.contains("i", "more_vert").click();
      });
    cy.get(".q-menu > .q-list > div").eq(1).click();
    cy.intercept("/currentuser/media?*").as("duplicate");
    cy.get(".q-dialog-plugin").within(() => {
      cy.contains("span", "Duplicate").click();
    });
    cy.wait("@duplicate").then(() => {
      cy.get(".q-table__grid-content > div ")
        .eq(1)
        .find(".ellipsis-2-lines")
        .invoke("text")
        .then((afterMoveLabelText) => {
          expect(this.beforeMoveLabelText).to.equal(afterMoveLabelText);
        });
    });
  });
  it("create and open new folder", function () {
    const folderName = "folder1";
    createFolder(folderName);
  });

  it("validate move functionality", function () {
    var beforeMoveLabelText;
    cy.get(".q-table__grid-content > div")
      .eq(0)
      .within(() => {
        cy.get(".ellipsis-2-lines")
          .invoke("text")
          .then((beforeMoveLabelText) => {
            this.beforeMoveLabelText = beforeMoveLabelText;
          });
        cy.contains("i", "more_vert").click();
      });
    cy.get(".q-menu > .q-list > div").eq(0).click();
    cy.get(".q-pa-md").within(() => {
      cy.contains("div", "folder1").click();
      cy.contains("span", "Select").click();
    });
    cy.contains("span", "Move").click();
    cy.get(".q-table__grid-content > div ").eq(0).should("not.exist");
    cy.contains("div", "folder1").click();
    cy.get(".q-table__grid-content > div ")
      .eq(0)
      .find(".ellipsis-2-lines")
      .invoke("text")
      .then((afterMoveLabelText) => {
        expect(this.beforeMoveLabelText).to.equal(afterMoveLabelText);
      });
  });

  it("validate delete assets", function () {
    cy.get(".q-table__grid-content > div ")
      .eq(0)
      .within(() => {
        cy.get(".ellipsis-2-lines")
          .invoke("text")
          .then((beforeMoveLabelText) => {
            this.beforeMoveLabelText = beforeMoveLabelText;
          });
        cy.contains("i", "more_vert").click();
      });
    cy.get(".q-menu > .q-list > div").eq(4).click();
    cy.intercept("/currentuser/media?*").as("delete");
    cy.contains("span", "Delete").click();
    cy.wait("@delete").then(() => {
      cy.get(".q-table__grid-content").find("div").should("not.exist");
    });
    cy.intercept("/currentuser/media?*").as("delete");
    cy.contains("div.ellipsis", "Home").click();
    cy.wait("@delete").then(() => {
      cy.get(".q-table__grid-content > div ")
        .eq(0)
        .within(() => {
          cy.get(".ellipsis-2-lines")
            .invoke("text")
            .then((beforeMoveLabelText) => {
              this.beforeMoveLabelText = beforeMoveLabelText;
            });
          cy.contains("i", "more_vert").click();
        });
      cy.get(".q-menu > .q-list > div").eq(4).click();
      cy.intercept("/currentuser/media?*").as("delete");
      cy.contains("span", "Delete").click();
      cy.wait("@delete").then(() => {
        cy.get(".q-table__grid-content").find("div").should("not.exist");
      });
    });
  });

  it("rename folder from folder1 to tempFolder", function () {
    cy.intercept("/currentuser/media/folders/?*").as("fetchFolder");
    cy.get(".q-tree__children .ellipsis").within(() => {
      cy.contains("div", "folder1").click();
    });
    cy.wait("@fetchFolder").then(() => {
      cy.get(".q-table__grid-content")
        .find("div")
        .should("not.exist")
        .then(() => {
          cy.get(".q-tree__children .ellipsis").within(() => {
            cy.contains("div", "folder1").rightclick();
          });
          cy.contains("div", "Rename Folder").click();
          cy.get('[aria-label="Folder Name"]').clear().type("tempFolder");
          cy.intercept("/currentuser/media/folders/?*").as("loadData");
          cy.contains("span", "OK").click();
          cy.wait("@loadData").then(() => {
            cy.get(".q-tree__children .ellipsis")
              .invoke("text")
              .should("contain", "tempFolder");
          });
        });
    });
  });

  it("delete folder", function () {
    cy.get(".q-table__grid-content")
      .find("div")
      .should("not.exist")
      .then(() => {
        cy.get(".q-tree__children .ellipsis").within(() => {
          cy.contains("div", "tempFolder").rightclick();
        });
        cy.contains("div", "Delete Folder").click();
        cy.intercept("/currentuser/media/folders/?*").as("fetchFolder");
        cy.contains("span", "OK").click();
        cy.wait("@fetchFolder").then(() => {
          cy.contains(".q-tree__children .ellipsis", "tempFolder").should(
            "not.exist"
          );
        });
      });
  });
});
