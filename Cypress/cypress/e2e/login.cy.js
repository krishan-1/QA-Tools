
describe('Kurator',()=>{
    it('Login',()=>{
        cy.visit('https://admin-staging.sourcesync.io/#/login?redirect=%2F')
        
        cy.get('.q-btn__content').click()

        cy.get('#username').type('sourcedev@gmail.com')

        cy.get('#password').type('Source0ne')

        cy.get('#kc-login').click()
    })
})