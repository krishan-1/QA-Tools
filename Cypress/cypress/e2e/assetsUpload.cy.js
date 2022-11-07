//This function fetch kurator.json data and store it to this.kuratorData variable
before(function(){
    cy.fixture('kurator.json').then((kuratorData)=>{
        this.kuratorData  = kuratorData
    })
})

//This Test validate login to kurator staging environment
it('login',function(){
    cy.login(this.kuratorData.email,this.kuratorData.password)
})

//This test validate change org functionality
it('changeOrg',function(){
    cy.navigateToTestOrg();
})

//This Test validate upload assets functionality 
it('upload assets',function(){
    let counts = uploadAssets();
    // assertUploadValidation(counts[0],counts[1])
})

let assertUploadValidation = function(beforeUploadingCount,afterUploadingCount){
    return assert.equal(afterUploadingCount, beforeUploadingCount + 1, "Assets Uploaded Successfully")
}












//This function upload assets
let uploadAssets = function(){
    cy.wait(2000)
    cy.contains('Assets').click() //click Assets tab available in menu
    cy.wait(2000)
    cy.get('.q-table__container > .q-table__bottom > .q-table__control > span').each(($element,index,$list)=>{       
    
    cy.contains('Upload').click() //click upload button
    const p = 'coffee.jpg'
    cy.get('.q-uploader__header-content > .q-btn  > .q-btn__wrapper > .q-btn__content > input').attachFile(p) //upload file
    //To validate is file uploaded or not
        cy.get('.q-uploader__file--uploaded > .q-uploader__file-header').click() //Hit right click
        cy.get('.asset-upload-dialog__card > .items-center > .q-btn ').click() //Hit cross icon
        cy.get('.col-4 > .q-btn--rectangle').click() //Hit cross icon
})
}

