describe('Test functionallity of My images', () => {
  it('User with images should get list of images', () => {
    cy.login('string@string.be', 'string')
    cy.getBySel('accountButton').click()
    cy.getBySel('userEmail').should('contain', 'string@string.be')
    cy.getBySel('myImagesButton').click()
    cy.url().should('include', '/images')
    cy.wait(1000)
    cy.get('[data-testid="imagesList"] > div').should('have.length.greaterThan', 0)
    cy.get('[data-testid="imagesList"] > div > div > div').first().click()
    cy.getBySel('imageDetailsModal').should('be.visible')
  })

  it('User without images should get message that there are no images', () => {
    cy.login('test@test.be', 'string')
    cy.getBySel('accountButton').click()
    cy.getBySel('userEmail').should('contain', 'test@test.be')
    cy.getBySel('myImagesButton').click()
    cy.url().should('include', '/images')
    cy.wait(1000)
    cy.getBySel('imagesList').should('have.length', 0)
    cy.getBySel('noImagesMessage').should('be.visible')
  })
})
