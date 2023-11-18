describe('Posts', function () {
  beforeEach(function () {
    cy.visit('');
  });

  it('page can be opened', function () {
    cy.contains('Posts');
  });

  it('page contains search field', function () {
    cy.contains('label', 'Search by title');
  });

  it('page contains table data', function () {
    cy.get('tbody').find('tr').its('length').should('equal', 100);

    cy.contains('Id');
    cy.contains('Title');
    cy.contains('Body');
    cy.contains('qui est esse');
    cy.contains(
      'dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut saepe quidem repellat excepturi ut quia sunt ut sequi eos ea sed quas',
    );
  });

  describe('Search', function () {
    it('filters a few posts', function () {
      cy.get('input').type('qui ');
      cy.get('tbody').find('tr').its('length').should('equal', 9);
      cy.contains('est et quae odit qui non').should('exist');
    });

    it('filters one post', function () {
      cy.get('input').type('qui est esse');
      cy.get('tbody').find('tr').its('length').should('equal', 1);
      cy.contains('est et quae odit qui non').should('not.exist');
    });
  });

  describe('Edit', function () {
    it('each post has a button', function () {
      cy.get('button').its('length').should('equal', 100);
    });

    it('edit form can be opened', function () {
      cy.get('input').type('qui est esse');
      cy.get('button').first().click();
      cy.contains('Edit post').should('exist');
    });

    it('edit form can be closed', function () {
      cy.get('input').type('qui est esse');
      cy.get('button').first().click();
      cy.contains('button', 'Cancel').click();
      cy.contains('Edit post').should('not.exist');
    });

    it('update button should be initially disabled', function () {
      cy.get('input').type('qui est esse');
      cy.get('button').first().click();
      cy.contains('button', 'Update').should('be.disabled');
    });

    it('form can be submitted', function () {
      cy.get('input').type('qui est esse');
      cy.get('button').first().click();
      cy.get('form')
        .contains('label', 'Title')
        .parent()
        .find('input')
        .type('123');
      cy.contains('button', 'Update').should('be.enabled').click();
      cy.contains('Edit post').should('not.exist');
    });
  });
});
