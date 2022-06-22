describe("first test", () => {
  it("should go to home ", () => {
    cy.visit("http://localhost:3000").title().should("eq", "로그인 | Giber Eats");
  });
});