import { describe, it } from 'vitest';
import { FormInputTypes } from '../../src/types/UserData';

// Helper to go to the next step
const goNext = () => cy.findByText('Next').click();

describe('User Registration', () => {
  beforeEach(() => {
    cy.fixture('userRegistrationData.json').as('userData');
  });

  it('Visits the page', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Register form').should('exist');
  });

  it('Visits the page', () => {
    cy.get<FormInputTypes>('@userData').then((user) => {
      cy.findByLabelText('Name').type(user.name);
      cy.findByLabelText('Surname').type(user.surname);
      goNext();
      cy.findByLabelText('Address').type(user.address);
      cy.findByLabelText('City').type(user.city);
      goNext();
      cy.findByLabelText('Email').type(user.email);
      cy.findByLabelText('Password').type(user.password);
    });
  });

  it('Submit the form', () => {
    // Intercept post-user request so we can check the body
    cy.intercept('POST', '/post-user').as('postUser');
    cy.findByText('Submit').click();

    cy.wait('@postUser').then(({ request }) => {
      cy.get<FormInputTypes>('@userData').then((user) => {
        expect(JSON.parse(request.body)).to.eql(user);
      });
    });

    cy.findByText('Welcome new user!').should('exist');
  });
});
