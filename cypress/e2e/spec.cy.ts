import { createVerify } from "crypto";

describe("Log In", () => {
  it("See Log in page", () => {
    cy.visit("/").title().should("eq", "로그인 | Giber Eats");
  });
  
  it("can fill out form", () => {
    cy.visit("/")
    .get('[name="email"]').type("test@gmail.com")
    .get('[name="password"]').type("qwe12312312312321")
    .get('.text-lg').should("not.have.class", "pointer-events-none");

    //TODO: can log in
  });

  it("See email and password validation errors", () => {
    cy.visit("/")
    .get('[name="email"]').type("bad-email")
    .get('.grid > :nth-child(1)').should("have.text", "이메일 형식이 아닙니다.")
    .get('[name="password"]').type("qwe1")
    .get('.grid > :nth-child(4)').should("have.text", "최소 8자리 이상이어야 합니다.");
  });
});