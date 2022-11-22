function createNewSAM(samName)
{
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click');
    cy.get(`.q-form [aria-label='Name']`).type(samName).wait(5000);
    cy.get(`.q-form > .q-card__section > div.col-lg-6 > label  [tabindex='-1']`).then(($error)=>
    {
        
        if($error.hasClass('text-negative'))
        {
            cy.log('Slug should be unique.');
            cy.contains('i','close').click();
            samName = samName.concat('-c');
            createNewSAM(samName);
        }

        else
        {
            cy.get('.block').contains('Submit').should('be.visible').click();
        }
    })   
}

export {createNewSAM};