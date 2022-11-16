
describe('Kurator',()=>{
    it('Login',()=>{
        cy.visit('https://admin-staging.sourcesync.io/#/login?redirect=%2F')
        
        cy.get('.q-btn__content').click()

        cy.get('#username').type('sourcedev@gmail.com')

        cy.get('#password').type('Source0ne')

        cy.get('#kc-login').click()

        cy.get('.q-item > :nth-child(3) > .q-icon').click()

        cy.get(':nth-child(2) > .q-item__section--side > .q-icon').click()

        cy.get(':nth-child(3) > .q-item__section--side').click()

        cy.wait(5000)

        cy.get(':nth-child(4) > .q-item > .q-item__section--main > .q-item__label').click()

        cy.wait(5000)

        cy.get('.q-tree > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(3) > .q-tree__node-header').click()

        cy.get('.full-width.row > :nth-child(1) > .q-btn__wrapper > .q-btn__content > .q-icon').click()

        //cy.get('#f_11c5cc7f-b722-4bc1-8b48-aff6d4cfe811').type('SAM For Cypress Test')
        cy.get(':nth-child(1) > .q-field > .q-field__inner > .q-field__control').type('SAM For Cypress Demo')

        cy.get('.justify-end > .q-btn--standard > .q-btn__wrapper').click()



    })
})