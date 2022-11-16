import {createNewProduction} from '../../utils/Production/createNewProduction'

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

//This test will validate the create new Production functionality
it('validate create new Production functionality as overlay',function(){
    cy.contains('div','Productions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Production 
    createNewProduction('cypress overlay production','overlay');
})

it('validate create new Production functionality as video type mp4',function(){
    cy.contains('div','Productions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Production 
    createNewProduction('cypress mp4 production','video','mp4');
})

it('validate create new Production functionality as video type vimeo',function(){
    cy.contains('div','Productions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Production 
    createNewProduction('cypress vimeo production','video','vimeo');
})

it('validate create new Production functionality as video type youtube',function(){
    cy.contains('div','Productions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Production 
    createNewProduction('cypress youtube production','video','youtube');
})