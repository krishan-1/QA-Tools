//This function upload assets
function uploadAssets() {
  cy.wait(2000);
  cy.contains("Upload").click(); //click upload button
  const p = "coffee.jpg";
  cy.get(
    ".q-uploader__header-content > .q-btn  > .q-btn__wrapper > .q-btn__content > input"
  ).attachFile(p);
  cy.wait(8000); //upload file
  cy.get(".q-uploader__file--uploaded > .q-uploader__file-header").click(); //Hit right click
  cy.get(".asset-upload-dialog__card > .items-center > .q-btn ").click(); //Hit cross icon
  cy.get(".col-4 > .q-btn--rectangle").click(); //Hit cross icon
}

export { uploadAssets };
