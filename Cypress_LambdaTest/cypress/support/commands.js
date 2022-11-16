import 'cypress-file-upload'
Cypress.Commands.addAll(
{
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
        cy.wait(5000);
    },

    navigateToTestOrg(orgName){
        cy.get('.q-header > .q-toolbar > .items-center > button').eq(1).click()
        cy.contains('Switch Organization').click()
        cy.contains(orgName).click()
        cy.wait(5000);
    }
})


  
