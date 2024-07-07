/// <reference types="Cypress" />

describe("Newsletter", () => {
	beforeEach(() => {
		cy.task("seedDatabase");
	});

	it("should display a success message", () => {
		cy.intercept("POST", "/newsletter*", {
			status: 201,
		}).as("subscribe"); // intercept any http request localhost:3000/newsletter?anything
		cy.visit("/");
		cy.get('[data-cy="newsletter-email"]').click();
		cy.get('[data-cy="newsletter-email"]').type("test@example.com");
		cy.get('[data-cy="newsletter-submit"]').click();
		cy.wait("@subscribe"); // not necessay but it is great practice to know that the next line depends on the interceptor
		cy.contains("Thanks for signing up");
	});

	it("should display validation error", () => {
		cy.intercept("POST", "/newsletter*", {
			message: "Email exist already.",
		}).as("subscribe"); // intercept any http request localhost:3000/newsletter?anything
		cy.visit("/");
		cy.get('[data-cy="newsletter-email"]').click();
		cy.get('[data-cy="newsletter-email"]').type("test@example.com");
		cy.get('[data-cy="newsletter-submit"]').click();
		cy.wait("@subscribe"); // not necessay but it is great practice to know that the next line depends on the interceptor
		cy.contains("Email exist already.");
	});
});
