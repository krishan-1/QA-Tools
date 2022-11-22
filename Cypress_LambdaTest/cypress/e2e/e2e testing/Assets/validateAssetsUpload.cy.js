import { uploadAssets } from "../../utils/Assets/assetsUpload";

//This function fetch kurator.json data and store it to this.kuratorData variable
before(function () {
  cy.fixture("kurator.json").then((kuratorData) => {
    this.kuratorData = kuratorData;
  });
});

//This Test validate login to kurator staging environment
it("login", function () {
  cy.login(this.kuratorData.email, this.kuratorData.password);
});

//This test validate change org functionality
it("changeOrg", function () {
  cy.navigateToTestOrg("QA");
});

//This Test validate upload assets functionality
it("upload assets", function () {
  cy.wait(2000);
  cy.contains("Assets").click(); //click Assets tab available in menu
  cy.wait(2000);
  uploadAssets();
});
