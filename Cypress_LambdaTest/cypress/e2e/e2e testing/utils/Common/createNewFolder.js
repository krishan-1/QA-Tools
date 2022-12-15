let folderNames = [];

function createNewFolder(folderName) {
  cy.contains("i", "create_new_folder").click(); //click to Create New Folder Button
  cy.get(`input[aria-label='Folder Name']`).type(folderName);
  cy.intercept("/user-media-folders/").as("folderCreate");
  cy.intercept("/currentuser/media/folders/?*").as("fetchFolders");
  cy.get(".q-btn__wrapper > span > span ").contains("Ok").click();
  cy.wait("@folderCreate").then(() => {
    cy.log("folder created successfully ...");
    cy.wait("@fetchFolders");
  });
}

export { createNewFolder };
