/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      getBySel(selector: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/')
  cy.get('[data-testid="loginButton"]').click()
  cy.get('[data-testid="email"]').type(username)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="loginSubmit"]').click()
})

Cypress.Commands.add('getBySel', (selector: string) => {
  return cy.get(`[data-testid=${selector}]`)
})

export {}
