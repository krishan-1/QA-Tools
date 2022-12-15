import {createNewProduction} from '../utils/Production/createNewProduction'

//This test will fetch the data from kurator.json
before(function(){
    cy.fixture('kurator.json').then((kuratorData)=>{
        this.kuratorData = kuratorData;
    })
})

//This test will validate login functionality
it('login',function(){
    cy.login(this.kuratorData.email,this.kuratorData.password);
})

//This test will validate change org functionality
it('changeOrg',function(){
    cy.navigateToTestOrg('QA');
})

//This test will validate the create new SAM functionality
it('validate create new SAM functionality',function(){
    cy.contains('div','Productions').should('be.visible').trigger('click');
    cy.wait(2000);
    createNewProduction('unique production');
})