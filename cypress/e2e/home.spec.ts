describe('My First Test', () => {
  beforeEach(() => {
    cy.visit("/");
  })
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Home');
    cy.title().should('eq', 'AngularVAdmin')
    cy.contains('chart').click();
  });
})
