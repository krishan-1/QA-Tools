function createNewFolder(folderName){
    cy.contains('i','create_new_folder').click(); //click to Create New Folder Button
    cy.get(`input[aria-label='Folder Name']`).type(folderName);
    cy.get('.q-btn__wrapper > span > span ').contains('Ok').click();
    cy.wait(5000);
    cy.get('.q-tree__children > div [class="ellipsis"] ').each(($element,index,$list)=>{
        if($element.text().trim() === folderName)
        {
            cy.wait(2000);
            cy.log($element.text());
            $element.trigger('click');
        }
    })
}

export {createNewFolder};
