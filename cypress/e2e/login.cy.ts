// https://docs.cypress.io/api/introduction/api.html

describe('Test functionallity of login', () => {
  it('Login with wrong credentials should return 400', () => {
    cy.login('wrong@wrong.be', 'wrong')
    cy.wait(2000)
    cy.url().should('include', '/')
    cy.window().its('localStorage').invoke('getItem', 'authTokens').should('not.exist')
  })

  it('Login with correct credentials should return 200', () => {
    cy.login('string@string.be', 'string')
    cy.wait(2000)
    cy.url().should('include', '/home')
    cy.window().its('localStorage').invoke('getItem', 'authTokens').should('exist')
  })
})
