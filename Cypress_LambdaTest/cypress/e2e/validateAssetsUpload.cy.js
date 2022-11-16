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
  cy.navigateToTestOrg();
});

//This Test validate upload assets functionality
it("upload assets", function () {
  uploadAssets();
  // assertUploadValidation(counts[0],counts[1])
});

//This function upload assets
let uploadAssets = function () {
  cy.wait(2000);
  cy.contains("Assets").click(); //click Assets tab available in menu
  cy.wait(2000);
  cy.contains("Upload").click(); //click upload button
  const p = "coffee.jpg";
  cy.wait(2000);
  cy.get(
    ".q-uploader__header-content > .q-btn  > .q-btn__wrapper > .q-btn__content > input"
  ).attachFile(p); //upload file
  cy.wait(2000);
  cy.contains("i", "done").click(); //Hit right click
  cy.wait(2000);
  cy.get(".asset-upload-dialog__card > .items-center > .q-btn ").click(); //Hit cross icon
  cy.wait(2000);
  cy.get(".col-4 > .q-btn--rectangle").click(); //Hit cross icon
};
