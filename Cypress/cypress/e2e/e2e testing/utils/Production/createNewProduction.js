function createNewProduction(productionName){
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click');
    cy.get(`.q-form [aria-label='Name']`).type(productionName).wait(5000);
    cy.get(`.q-form > .q-card__section > div.col-lg-6 > label  [tabindex='-1']`).then(($error)=>{
        if($error.hasClass('text-negative'))
        {
            cy.log('Slug should be unique.')
        }
        else
        {
            cy.get(`.q-form > .q-card__section > :nth-child(4) > label > div`).click().then(()=>{
                cy.get(`[role='listbox'] .q-item__label`).contains('overlay').click();
                cy.get('.block').contains('Submit').should('be.visible').click();
            })
            
        }
    })   
}

export {createNewProduction};