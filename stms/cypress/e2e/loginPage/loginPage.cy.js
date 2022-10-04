describe("Login Page", () => {
  it("Visits the Login Page", () => {
    cy.visit("/login");
  });

  it("Displays Login and Register Links", () => {
    cy.visit("/login");
    cy.contains("Log In");
    cy.contains("Register");
  });

  it("Can navigate to Register Page", () => {
    cy.visit("/login");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
  });

  it("Accepts email input", () => {
    cy.visit("/login");
    cy.get('[aria-label="email"]')
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });

  it("Accepts password input", () => {
    cy.visit("/login");
    cy.get('[aria-label="password"]')
      .type("password123")
      .should("have.value", "password123");
  });
});
