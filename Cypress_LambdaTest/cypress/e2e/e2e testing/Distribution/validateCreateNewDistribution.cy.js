import {createNewDistribution} from '../../utils/Distribution/createNewDistribution'

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

//This test will validate the create new Distribution functionality
it('validate create new distribution functionality as overlay',function(){
    cy.contains('div','Distributions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Distribution 
    createNewDistribution('cypress overlay distribution','overlay');
})

it('validate create new distribution functionality as video type mp4',function(){
    cy.contains('div','Distributions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Distribution 
    createNewDistribution('cypress mp4 distribution','video','mp4');
})

it('validate create new distribution functionality as video type vimeo',function(){
    cy.contains('div','Distributions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Distribution 
    createNewDistribution('cypress vimeo distribution','video','vimeo');
})

it('validate create new distribution functionality as video type youtube',function(){
    cy.contains('div','Distributions').should('be.visible').trigger('click');
    cy.wait(2000);
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Distribution 
    createNewDistribution('cypress youtube distribution','video','youtube');
})