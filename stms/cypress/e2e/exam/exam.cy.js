// Helpful page selectors
// cy.get('[data-cy="question-number-message"]')
// cy.get('[data-cy="question-text"]')
// cy.get('[data-cy="option-0"]')
// cy.get('[data-cy="option-1"]')
// cy.get('[data-cy="option-2"]')
// cy.get('[data-cy="option-3"]')
// cy.get('[data-cy="feedback-text"]')
// cy.get('[data-cy="submit-button"]')
// cy.get('[data-cy="next-button"]')
// cy.get('[data-cy="exit-exam-button"]')

// colors that needed to be displayed as rgb
const transparent = "rgba(0, 0, 0, 0)";
const gold = "rgb(254, 195, 10)";
const greenBorder = "rgb(0, 128, 0)";
const greenText = "rgb(2, 166, 2)";
const red = "rgb(255, 0, 0)";
const white = "rgb(193, 193, 193)";
const grey = "rgb(128, 128, 128)";

describe("FIST Exam", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/home");
  });

  afterEach(() => {
    cy.logout();
    cy.visit("/home");
  });

  it("loads exam landing page with options for full exam or quick 10", () => {
    cy.get("[data-cy='nav-bar-exam']").should("contain.text", "Exam").click();
    cy.get(".page-title").should(
      "have.text",
      "FIST Written Exam Practice Test"
    );

    cy.get('[data-cy="exam-paragraph"]')
      .should("be.visible")
      .and(
        "contain.text",
        "You are about to start a practice FIST Certification written exam."
      );

    cy.get('[data-cy="exam-start-text"]')
      .should("be.visible")
      .and("have.text", "Click the Start button below to start the Full exam.");

    cy.get('[data-cy="back-button"]')
      .should("be.visible")
      .and("have.text", "Back");

    cy.get('[data-cy="start-resume-button"]')
      .should("be.visible")
      .and("have.text", "Start");

    cy.get('[data-cy="quick-10-text"]')
      .should("be.visible")
      .and(
        "have.text",
        "Don't want to do a full test? Hit a quick 10 random questions."
      );

    cy.get('[data-cy="quick-10-button"]')
      .should("be.visible")
      .and("have.text", "Quick 10");
  });

  /**
   * Full Quick 10 exam test
   */

  it.only("allows user to complete quick 10 exam when they select Quick 10 button", () => {
    /**
     * Navigate to exam landing page
     */
    cy.get("[data-cy='nav-bar-exam']").click();

    /**
     * Begin quick 10 exam
     */
    cy.get('[data-cy="quick-10-button"]').click();
    cy.url().should("include", "/quick-ten/");

    /**
     * Before exam, the loading screen should display
     */
    cy.get('[data-cy="loading-display"]').should("be.visible");

    /**
     * After 5 seconds the loading screen should disappear, and the first question should appear
     */
    cy.wait(5100);
    cy.get('[data-cy="loading-display"]').should("not.exist");
    cy.get('[data-cy="question-container"]').should("be.visible");

    /**
     * The URL should show question/0
     */
    cy.url().should("include", "/quick-ten/question/0");

    /**
     * Question message should show the user on question 1
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 1 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "In the initial call for fire the observer should announce __________ to indicate the observer cannot see the target (because of vegetation, terrain, weather, intensity of the conflict, or smoke)."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "Unobserved");
    cy.get('[data-cy="option-1"]').should("have.text", "Lost");
    cy.get('[data-cy="option-2"]').should("have.text", "Lost line of sight");
    cy.get('[data-cy="option-3"]').should("have.text", "Cannot observe");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-3"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 2
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 2 ***
     */

    /**
     * The URL should show question/1
     */
    cy.url().should("include", "/quick-ten/question/1");

    /**
     * Question message should show the user on question 2
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 2 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "JTACs and FAC(A)s can use __________ to develop and correlate targeting data, mark targets, and provide terminal guidance operations."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "LLDRs");
    cy.get('[data-cy="option-1"]').should(
      "have.text",
      "Ground burst illumination"
    );
    cy.get('[data-cy="option-2"]').should("have.text", "JFOs");
    cy.get('[data-cy="option-3"]').should("have.text", "Digitally aided CAS");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-2"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 3
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 3 ***
     */

    /**
     * The URL should show question/2
     */
    cy.url().should("include", "/quick-ten/question/2");

    /**
     * Question message should show the user on question 3
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 3 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "A __________ is the observer's determination of the location of the burst, or the mean point of impact (MPI) of a group of bursts, with respect to the adjusting point as observed along the observer-target line."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "Spotting");
    cy.get('[data-cy="option-1"]').should("have.text", "Correction");
    cy.get('[data-cy="option-2"]').should("have.text", "Impact");
    cy.get('[data-cy="option-3"]').should("have.text", "Adjusting point");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-0"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 4
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 4 ***
     */

    /**
     * The URL should show question/3
     */
    cy.url().should("include", "/quick-ten/question/3");

    /**
     * Question message should show the user on question 4
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 4 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "A __________ consists of a number of planned targets of a similar nature that are planned for sequential attack."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "Sequential Targets");
    cy.get('[data-cy="option-1"]').should("have.text", "Series of Targets");
    cy.get('[data-cy="option-2"]').should("have.text", "Group of Targets");
    cy.get('[data-cy="option-3"]').should("have.text", "Program of Targets");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-3"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 5
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 5 *** INCORRECT ANSWER TEST
     */

    /**
     * The URL should show question/4
     */
    cy.url().should("include", "/quick-ten/question/4");

    /**
     * Question message should show the user on question 5
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 5 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "__________ is best used on danger close missions and other missions requiring the observer to make small adjustments to bring fires onto the target in order to minimize collateral damage."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "One round adjust");
    cy.get('[data-cy="option-1"]').should("have.text", "Creeping fire");
    cy.get('[data-cy="option-2"]').should("have.text", "Hasty bracketing");
    cy.get('[data-cy="option-3"]').should("have.text", "Successive bracketing");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the wrong answer
     */
    cy.get('[data-cy="option-0"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit incorrect answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have red border
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${red}`
    );

    /**
     * Feedback text should say Incorrect and have text color red
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Incorrect. Try again.")
      .and("have.css", "color", red);

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Select correct answer
     */

    cy.get('[data-cy="option-1"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 6
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     *
     */

    /**
     * QUESTION 6 ***
     */

    /**
     * The URL should show question/5
     */
    cy.url().should("include", "/quick-ten/question/5");

    /**
     * Question message should show the user on question 6
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 6 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "The goal of the Field Artillery is to achieve __________. This enables greater effectiveness and a reduced logistical footprint. It requires that all five of the requirements for accurate fire are consistently being met."
    );
    cy.get('[data-cy="option-0"]').should(
      "have.text",
      "Accurate and sufficient fires"
    );
    cy.get('[data-cy="option-1"]').should(
      "have.text",
      "Lasting operational effects"
    );
    cy.get('[data-cy="option-2"]').should(
      "have.text",
      "First round fire for effect"
    );
    cy.get('[data-cy="option-3"]').should(
      "have.text",
      "Fires that support the scheme of maneuver"
    );

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-2"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 7
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 7 ***
     */

    /**
     * The URL should show question/6
     */
    cy.url().should("include", "/quick-ten/question/6");

    /**
     * Question message should show the user on question 7
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 7 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "___________ is an immediately available prearranged barrier of fire designed to impede enemy movement across defensive lines or areas."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "On-call Target");
    cy.get('[data-cy="option-1"]').should("have.text", "Final Protective Fire");
    cy.get('[data-cy="option-2"]').should("have.text", "Immediate Suppression");
    cy.get('[data-cy="option-3"]').should("have.text", "Defensive Fires");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-1"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 8
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 8 ***
     */

    /**
     * The URL should show question/7
     */
    cy.url().should("include", "/quick-ten/question/7");

    /**
     * Question message should show the user on question 8
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 8 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "True / False: The three transmissions of a fire mission are: 1) Observer ID and warning order 2) Target location and target description 3) Method of engagement and method of fire and control."
    );
    cy.get('[data-cy="option-0"]').should("have.text", "True");
    cy.get('[data-cy="option-1"]').should("have.text", "False");

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-1"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 9
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 9 ***
     */

    /**
     * The URL should show question/8
     */
    cy.url().should("include", "/quick-ten/question/8");

    /**
     * Question message should show the user on question 9
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 9 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "The warning order clears the net for the fire mission. The warning order consists of:"
    );
    cy.get('[data-cy="option-0"]').should(
      "have.text",
      "Type of adjustment, callsign, and method of target location"
    );
    cy.get('[data-cy="option-1"]').should(
      "have.text",
      "Mission type, type of adjustment, and the size of element to FFE"
    );
    cy.get('[data-cy="option-2"]').should(
      "have.text",
      "Callsign, type of adjustment, and the method of target location"
    );
    cy.get('[data-cy="option-3"]').should(
      "have.text",
      "Type of mission, the size of the element to FFE, and the method of target location"
    );

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    cy.get('[data-cy="next-button"]')
      .should("have.text", "Next Question")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the correct answer
     */
    cy.get('[data-cy="option-3"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="next-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * Next button should no longer be disabled
     */
    cy.get('[data-cy="next-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to question 10
     */
    cy.get('[data-cy="next-button"]').click();

    /**
     * QUESTION 10 *** ANOTHER INCORRECT ANSWER TEST
     */

    /**
     * The URL should show question/9
     */
    cy.url().should("include", "/quick-ten/question/9");

    /**
     * Question message should show the user on question 10
     */
    cy.get('[data-cy="question-number-message"]').should(
      "have.text",
      "Question 10 of 10"
    );

    /**
     * Question contents
     */
    cy.get('[data-cy="question-text"]').should(
      "have.text",
      "The illumination shell is a base ejection projectile containing a flare attached to a parachute. What is NOT a use of Illumination?"
    );
    cy.get('[data-cy="option-0"]').should(
      "have.text",
      "Illuminate areas of suspected threat activity"
    );
    cy.get('[data-cy="option-1"]').should(
      "have.text",
      "Provide illumination for night adjustment of fires"
    );
    cy.get('[data-cy="option-2"]').should(
      "have.text",
      "Mark friendly location for CAS attacks"
    );
    cy.get('[data-cy="option-3"]').should(
      "have.text",
      "Harass threat positions"
    );

    /**
     * All exam buttons should exist and be in the correct enabled/disabled status
     */
    cy.get('[data-cy="submit-button"]')
      .should("have.text", "Submit")
      .and("be.disabled");
    // Next button should bow not exist
    cy.get('[data-cy="next-button"]').should("not.exist");
    // View Results button should be visible
    cy.get('[data-cy="results-button"]')
      .should("be.visible")
      .and("have.text", "View Results")
      .and("be.disabled");
    cy.get('[data-cy="exit-exam-button"]')
      .should("exist")
      .and("contain.text", "Exit Exam");

    /**
     * Select the wrong answer
     */
    cy.get('[data-cy="option-3"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * View Results button should still be disabled
     */
    cy.get('[data-cy="results-button"]').should("be.disabled");

    /**
     * Submit incorrect answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have red border
     */
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${red}`
    );

    /**
     * Feedback text should say Incorrect and have text color red
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Incorrect. Try again.")
      .and("have.css", "color", red);

    /**
     * Next button should still be disabled
     */
    cy.get('[data-cy="results-button"]').should("be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Select correct answer
     */
    cy.get('[data-cy="option-2"]').click();

    /**
     * Selected answer should get gold border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${gold}`
    );

    /**
     * Non selected answers should not have a border change
     */
    cy.get('[data-cy="option-0"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-1"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );
    cy.get('[data-cy="option-3"]').should(
      "have.css",
      "border",
      `1px solid ${transparent}`
    );

    /**
     * Submit button should no longer be disabled
     */
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    /**
     * View Results button should still be disabled
     */
    cy.get('[data-cy="results-button"]').should("be.disabled");

    /**
     * Submit correct answer
     */
    cy.get('[data-cy="submit-button"]').click();

    /**
     * Option should have green border
     */
    cy.get('[data-cy="option-2"]').should(
      "have.css",
      "border",
      `1px solid ${greenBorder}`
    );

    /**
     * Feedback text should say Correct and have text color green
     */
    cy.get('[data-cy="feedback-text"]')
      .should("have.text", "Correct")
      .and("have.css", "color", greenText);

    /**
     * View Results button should no longer be disabled
     */
    cy.get('[data-cy="results-button"]').should("not.be.disabled");

    /**
     * Submit button should be disabled
     */
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    /**
     * Click next question to navigate to Exam Results Page
     */
    cy.get('[data-cy="results-button"]').click();

    /**
     * *** Exam Results Page ***
     */
    cy.url().should("include", "/exam/results");

    /**
     * Results page should have Exam Results Title
     */
    cy.get('[data-cy="results-title"]').should("have.text", "Exam Results");

    /**
     * Results summary should display 8 out of 10 correct
     */
    cy.get('[data-cy="results-summary"]').should(
      "have.text",
      "You got 8 out of 10 questions correct."
    );

    /**
     * Results percent should show 80%
     */
    cy.get('[data-cy="results-percent"]').should("have.text", "80%");

    /**
     * Top exit button should be visible
     */
    cy.get('[data-cy="top-exit-button"]').should("be.visible");

    /**
     * Wrong answer text should be correct
     */
    cy.get('[data-cy="wrong-answers-text"]').should(
      "have.text",
      "Here are the questions you need to work on:"
    );

    /**
     * Question 1
     */
    cy.get('[data-cy="question-text-0"]').should(
      "have.text",
      "__________ is best used on danger close missions and other missions requiring the observer to make small adjustments to bring fires onto the target in order to minimize collateral damage."
    );

    /**
     * Option 1 WRONG ANSWER
     */
    cy.get('[data-cy="question-0-option-0"]')
      .should("have.text", "One round adjust")
      .and("have.css", "border", `1px solid ${red}`)
      .and("have.css", "text-decoration-line", "line-through")
      .and("have.css", "color", white);

    /**
     * Option 2 CORRECT ANSWER
     */
    cy.get('[data-cy="question-0-option-1"]')
      .should("have.text", "Creeping fire")
      .and("have.css", "border", `1px solid ${greenBorder}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", white);

    /**
     * Option 3
     */
    cy.get('[data-cy="question-0-option-2"]')
      .should("have.text", "Hasty bracketing")
      .and("have.css", "border", `1px solid ${transparent}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", grey);

    /**
     * Option 4
     */
    cy.get('[data-cy="question-0-option-3"]')
      .should("have.text", "Successive bracketing")
      .and("have.css", "border", `1px solid ${transparent}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", grey);

    /**
     * Question 2
     */
    cy.get('[data-cy="question-text-1"]').should(
      "have.text",
      "The illumination shell is a base ejection projectile containing a flare attached to a parachute. What is NOT a use of Illumination?"
    );

    /**
     * Option 1
     */
    cy.get('[data-cy="question-1-option-0"]')
      .should("have.text", "Illuminate areas of suspected threat activity")
      .and("have.css", "border", `1px solid ${transparent}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", grey);

    /**
     * Option 2
     */
    cy.get('[data-cy="question-1-option-1"]')
      .should("have.text", "Provide illumination for night adjustment of fires")
      .and("have.css", "border", `1px solid ${transparent}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", grey);

    /**
     * Option 3 CORRECT ANSWER
     */
    cy.get('[data-cy="question-1-option-2"]')
      .should("have.text", "Mark friendly location for CAS attacks")
      .and("have.css", "border", `1px solid ${greenBorder}`)
      .and("have.css", "text-decoration-line", "none")
      .and("have.css", "color", white);

    /**
     * Option 4 WRONG ANSWER
     */
    cy.get('[data-cy="question-1-option-3"]')
      .should("have.text", "Harass threat positions")
      .and("have.css", "border", `1px solid ${red}`)
      .and("have.css", "text-decoration-line", "line-through")
      .and("have.css", "color", white);

    /**
     * Before exiting the exam, Local storage item "questions" should exist and have a length of 10
     */
    cy.window().then(() => {
      expect(JSON.parse(localStorage.getItem("questions"))).to.have.lengthOf(
        10
      );
    });

    /**
     * Exit the Exam
     */
    cy.get('[data-cy="bottom-exit-button"]').click();

    /**
     * Should redirect to home
     */
    cy.url().should("include", "/home", () => {
      expect(localStorage.getItem("questions")).to.not.exist();
    });

    /**
     * Local storage item "questions" should have been cleared
     */
    cy.window().then(() => {
      expect(localStorage.getItem("questions")).to.eql(null);
    });
  });
});
