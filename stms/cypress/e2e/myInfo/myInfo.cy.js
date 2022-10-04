describe("My info page", () => {
  it("Navigates to my info page when user clicks My Info in navbar", () => {
    cy.login();
    cy.visit("/home");
    cy.contains("My Info").click();
    cy.url().should("include", "/user-info");
    cy.get(".page-title").should("contain", "My Info");

    cy.logout();
  });
});
