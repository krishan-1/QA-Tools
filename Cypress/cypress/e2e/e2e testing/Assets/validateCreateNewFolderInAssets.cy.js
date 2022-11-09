import {uploadAssets} from '../utils/Assets/assetsUpload'
import {createNewFolder} from '../utils/Common/createNewFolder';

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

//This test will validate the Create New Folder functionality
it('validate create new folder',function(){
    cy.contains('Assets').click() //click Assets tab available in menu
    cy.wait(2000)
    createNewFolder('folder for cypress')
    uploadAssets();
})

