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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@testing-library/cypress/add-commands';

Cypress.Commands.add("assertLoggedIn", () => {
    cy.window().its("localStorage.giber-token").should("be.a", "string");
});

Cypress.Commands.add("assertLoggedOut", (email, password) => {
    cy.window().its("localStorage.giber-token").should("not.exist");
});

Cypress.Commands.add("Login", (email, password) => {
    cy.assertLoggedOut();
    cy.visit("/");
    cy.title().should("eq", "로그인 | Giber Eats");
    //cy.get('[name="email"]').type("test@gmail.com")
    cy.findByPlaceholderText("이메일").type(email);
    cy.findByPlaceholderText("비밀번호").type(password);
    //cy.get('[name="password"]').type("qwe12312312312321")
    cy.findByRole("button").should("not.have.class", "pointer-events-none").click();
    cy.assertLoggedIn();
});

Cypress.Commands.add("SignUp", (email, password) => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
        console.log(req);
        const { body: { operationName } } = req;
        if (operationName && operationName === "createAccountMutation"){
            req.reply((res) => {
                res.send({
                    data: {
                        createAccount: {
                            ok: true,
                            error: null,
                            __typename: "CreateAccountOutput"
                        },
                    },
                });
            });
        }
    });
    cy.visit("/create-account")
    cy.findByPlaceholderText("이메일").type(email);
    cy.findByPlaceholderText("비밀번호").type(password);

    cy.findByRole("button").should("not.have.class", "pointer-events-none").click();

    cy.wait(1000)
    cy.title().should("eq", "로그인 | Giber Eats");

    cy.findByPlaceholderText("이메일").type(email);
    cy.findByPlaceholderText("비밀번호").type(password);

    cy.findByRole("button").click()
    cy.assertLoggedIn();
});
