//This test will fetch the data from kurator.json
before(function(){
    cy.fixture('kurator.json').then((kuratorData)=>{
        this.kuratorData = kuratorData
    })
})

//This test will validate the login functionality
it('login to kurator',function(){
    // cy.log("email"+this.kuratorData.email)
    cy.visit('https://admin-staging.sourcesync.io/#/login?redirect=%2F')
    cy.contains('Login').click()
    cy.get('#username').type(this.kuratorData.email).should('have.value','sourcedev@gmail.com')
    cy.get('#password').type(this.kuratorData.password).should('have.value','Source0ne')
    cy.get('#kc-login').click()
    // cy.login(this.kuratorData.email,this.kuratorData.password)
    // cy.wait(2000)
    // console.log("home page URL : ",cy.url())
    // console.log("home page URL : ",cy.location('pathname'))
})

//This test will validate the logout functionality
it('logout to kurator',()=>{
    cy.logout()
    console.log('login page URL : ',cy.url())
})

