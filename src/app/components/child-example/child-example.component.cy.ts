import { ChildExampleComponent } from './child-example.component'

describe('ChildExampleComponent', () => {
  it('should mount', () => {
    cy.mount(ChildExampleComponent)
  })
})