describe("Login Page", () => {
  it("Visits the Register Page", () => {
    cy.visit("/register");
  });

  it("Displays Login and Register Links", () => {
    cy.visit("/register");
    cy.contains("Log In");
    cy.contains("Register");
  });

  it("Can navigate to Login Page", () => {
    cy.visit("/register");
    cy.contains("Log In").click();
    cy.url().should("include", "/login");
  });

  it("Accepts email input", () => {
    cy.visit("/register");
    cy.get('[aria-label="email"]')
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });

  it("Accepts password input", () => {
    cy.visit("/register");
    cy.get('[aria-label="password"]')
      .type("password123")
      .should("have.value", "password123");
  });

  it("Accepts password input", () => {
    cy.visit("/register");
    cy.get('[aria-label="confirm password"]')
      .type("password123")
      .should("have.value", "password123");
  });

  it("Accepts password input", () => {
    cy.visit("/register");
    cy.get('[aria-label="join code"]')
      .type("CODE-123")
      .should("have.value", "CODE-123");
  });
});
