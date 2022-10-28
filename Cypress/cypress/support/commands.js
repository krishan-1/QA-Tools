Cypress.Commands.addAll({
    
    login(email,password){ 
    cy.visit('https://admin-staging.sourcesync.io/#/login?redirect=%2F')
    cy.contains('Login').click()
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('#kc-login').click()
    },

    logout(){
        cy.contains('Source Digital').click()
        cy.get('.q-menu > .q-list >  :nth-child(3)').click()
    }
})
