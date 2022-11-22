import { createNewSAM } from '../../utils/SAM Builder/createNewSAM';
import {allFolderName} from '../../utils/Common/createNewFolder';

//This test will fetch kurator.json data
before(function(){
    cy.fixture('kurator.json').then((kuratorData)=>{
        this.kuratorData = kuratorData;
    })
})

//This test will validate the login functionality
it('login',function(){
    cy.login(this.kuratorData.email,this.kuratorData.password);
})

//This test will validate change org functionality
it('changeOrg',function(){
    cy.navigateToTestOrg('QA');
})

//This test will validate the Create New Folder functionality
it('validate create new folder',function(){
    cy.contains('div','SAM Builder').should('be.visible').trigger('click');
    allFolderName('cypress sam folder')
    createNewSAM('cypress sam');
})

