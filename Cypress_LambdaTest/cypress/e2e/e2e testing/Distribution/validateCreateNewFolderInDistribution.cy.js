import { createNewDistribution } from '../../utils/Distribution/createNewDistribution';
import {allFolderName} from '../../utils/Common/createNewFolder';

//This test will fetch kurator.json data
before(function()
{
    cy.fixture('kurator.json').then((kuratorData)=>
    {
        this.kuratorData = kuratorData;
    })
})

//This test will validate the login functionality
it('login',function()
{
    cy.login(this.kuratorData.email,this.kuratorData.password);
})

//This test will validate change org functionality
it('changeOrg',function()
{
    cy.navigateToTestOrg('QA');
})

//This test will validate the Create New Folder functionality in Distribution
it('validate create new Distribution functionality as overlay',function()
{
    cy.contains('div','Distributions').should('be.visible').trigger('click');
    allFolderName('cypress distribution folder'); //This will create folder
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click'); //This will click to Create New Production 
    createNewDistribution('cypress overlay distribution','overlay'); //This will create new distribution
})


