describe("Primary navigation links navigate user correctly", () => {
  it("Displays the navbar when a user logs in", () => {
    cy.login();
    cy.visit("/home");
    cy.get(".primary-nav").should("be.visible");
    cy.get(".primary-nav").should("contain.text", "Home");
    cy.get(".primary-nav").should("contain.text", "My Info");
    cy.get(".primary-nav").should("contain.text", "Exam");
    cy.get(".primary-nav").should("contain.text", "Admin");
    cy.get(".primary-nav").should("contain.text", "Sign Out");
    cy.logout();
  });

  it("Displays the primary navbar and is able to navigate to all links", () => {
    cy.login();
    cy.visit("/home");
    cy.contains("My Info").click();
    cy.url().should("include", "/user-info");
    cy.contains("Exam").click();
    cy.url().should("include", "/exam");
    cy.contains("Admin").click();
    cy.url().should("include", "/admin");
    cy.contains("Sign Out").click();
    cy.url().should("include", "/login");
    cy.logout();
  });

  it("Displays the side navbar on admin page and is able to navigate to all admin links", () => {
    cy.login();
    cy.visit("/home");
    // navigate to Admin Page
    cy.contains("Admin").click();
    cy.url().should("include", "/overview");
    // navigates to reassign
    cy.contains("Reassign").click();
    cy.url().should("include", "/reassign");
    // navigates to schools
    cy.contains("Schools").click();
    cy.url().should("include", "/schools");
    // navigates to ets time
    cy.contains("ETS Time").click();
    cy.url().should("include", "/ets");
    // navigates to delete account
    cy.contains("Delete Account").click();
    cy.url().should("include", "/delete-account");
    // navigates back to overview
    cy.contains("Overview").click();
    cy.url().should("include", "/overview");
    // log user out
    cy.logout();
  });
});
