describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: 'herra testi',
      username: 'testi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('login')
    cy.contains('Department of Computer Science, University of Helsinki 2023')
  })
  it('user can log in', function() {
    cy.get('#username').type('testi')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('blogs')
  })
})