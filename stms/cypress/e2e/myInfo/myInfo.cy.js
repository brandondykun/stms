describe("My info page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/home");
    cy.contains("My Info").click();
  });

  afterEach(() => {
    cy.logout();
    cy.visit("/home");
  });

  it("Navigates to my info page when user clicks My Info in navbar", () => {
    cy.url().should("include", "/user-info");
    cy.get(".page-title").should("contain", "My Info");
  });

  it("Displays the Edit Info button", () => {
    cy.get(".edit-button-container").should("contain.text", "Edit Info");
  });

  it("Navigates to the edit info page when Edit Info link is clicked", () => {
    cy.get("#edit-info-link").click({ force: true });
    cy.url().should("include", "/user-info/").and("include", "/edit");
  });

  it("Displays the View Comments button", () => {
    cy.get(".title-link-container > .comments-link").should(
      "contain.text",
      "View Comments"
    );
  });

  it("Navigates to the comments page when View Comments link is clicked", () => {
    cy.get(".title-link-container > .comments-link").click({ force: true });
    cy.url().should("include", "/comments/");
  });

  it("Displays the 5 main info containers", () => {
    cy.get("#name-rank-title").should("contain.text", "Name/Rank");
    cy.get("#assignment-scores-title").should(
      "contain.text",
      "Assignment/Scores"
    );
    cy.get("#dates-title").should("contain.text", "Dates");
    cy.get("#education-title").should("contain.text", "Military Education");
    cy.get("#schools-title").should("contain.text", "Scheduled Schools");
  });

  it("Displays correct Name/Rank information", () => {
    cy.get('[data-cy="first-name"]').should(
      "contain.text",
      "First Name: Brandon"
    );
    cy.get('[data-cy="middle-name"]').should(
      "contain.text",
      "Middle Name: William"
    );
    cy.get('[data-cy="last-name"]').should("contain.text", "Last Name: Dykun");
    cy.get('[data-cy="rank"]').should("contain.text", "Rank: SSG");
    cy.get('[data-cy="grade"]').should("contain.text", "Grade: E6");
    cy.get('[data-cy="jfo"]').should("contain.text", "JFO Qualified: Yes");
  });

  it("Displays correct Assignment/Scores information", () => {
    cy.get('[data-cy="section"]').should("contain.text", "Section: BN STAFF");
    cy.get('[data-cy="team"]').should("contain.text", "Team: HQ");
    cy.get('[data-cy="role"]').should("contain.text", "Role: BN FSNCO");
    cy.get('[data-cy="acft-score"]').should("contain.text", "ACFT Score: 530");
    cy.get('[data-cy="acft-pass"]').should("contain.text", "ACFT Pass: Yes");
    cy.get('[data-cy="m4-score"]').should("contain.text", "M4 Qual Score: 39");
  });

  it("Displays correct Dates information", () => {
    cy.get('[data-cy="pebd"]').should("contain.text", "PEBD: 05/22/2006");
    cy.get('[data-cy="tis"]').should("contain.text", "TIS:");
    cy.get('[data-cy="dor"]').should("contain.text", "DOR:");
    cy.get('[data-cy="tig"]').should("contain.text", "TIG:");
    cy.get('[data-cy="ets"]').should("contain.text", "ETS:");
    cy.get('[data-cy="ets-in"]').should("contain.text", "ETS In:");
  });

  it("Displays correct Military Education information", () => {
    cy.get('[data-cy="dlc-1"]').should("contain.text", "DLC 1 Complete: Yes");
    cy.get('[data-cy="blc"]').should("contain.text", "BLC Complete: Yes");
    cy.get('[data-cy="dlc-2"]').should("contain.text", "DLC 2 Complete: Yes");
    cy.get('[data-cy="alc"]').should("contain.text", "ALC Complete: Yes");
    cy.get('[data-cy="dlc-3"]').should("contain.text", "DLC 3 Complete: Yes");
    cy.get('[data-cy="slc"]').should("contain.text", "SLC Complete: No");
    cy.get('[data-cy="license"]').should(
      "contain.text",
      "Drivers License: Yes"
    );
  });
});
