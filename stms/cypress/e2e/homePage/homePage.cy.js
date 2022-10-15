describe("Home Page Auth", () => {
  it("Does not show the home page if user is not logged in", () => {
    cy.logout();
    cy.visit("/home");
    cy.url().should("not.include", "/home");
  });
});

describe("Home Page", () => {
  // beforeEach(() => {
  //   // log the user in
  //   // cy.login();
  // });

  it("Navigates to home and URL contains /home", () => {
    cy.login();
    cy.visit("/home");
    cy.url().should("include", "/home");
    cy.logout();
  });

  it("Displays the home page title", () => {
    cy.login();
    cy.visit("/home");
    cy.get(".page-title").should("contain.text", "Section Overview");

    cy.get(":nth-child(1) > :nth-child(1) > .section-title").should(
      "contain.text",
      "BN STAFF"
    );
    cy.get(":nth-child(1) > :nth-child(2) > .section-title").should(
      "contain.text",
      "ALPHA"
    );
    cy.get(":nth-child(2) > :nth-child(1) > .section-title").should(
      "contain.text",
      "BRAVO"
    );
    cy.get(":nth-child(2) > :nth-child(2) > .section-title").should(
      "contain.text",
      "CHARLIE"
    );
    cy.logout();
  });
});
