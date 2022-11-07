before(function(){
    cy.fixture('kurator.json').then((kuratorData)=>{
        this.kuratorData = kuratorData
        cy.log("email"+this.kuratorData.email)
    })
})

it('login to kurator',function(){
    cy.log("email"+this.kuratorData.email)
    cy.login(this.kuratorData.email,this.kuratorData.password)
})

it('logout to kurator',()=>{
    cy.logout()
})

