import {uploadAssets} from '../../utils/Assets/assetsUpload'
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

//This test validate change org functionality
it('changeOrg',function(){
    cy.navigateToTestOrg('QA');
})

//This test will validate the Create New Folder functionality inside Assets tab
it('validate create new folder in Assets',function(){
    cy.contains('Assets').click() //click Assets tab available in menu
    cy.wait(2000)
    allFolderName('cypress assets folder');
    uploadAssets();
})

