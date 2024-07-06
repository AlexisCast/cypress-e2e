/// <reference types="Cypress"/>

describe("contact form", () => {
	it("should submit the form", () => {
		cy.visit("http://localhost:5176/about");
		cy.get('[data-cy="contact-input-message"]').type("Hello World");
		cy.get('[data-cy="contact-input-name"]').type("Baz Buzz");
		cy.get('[data-cy="contact-input-email"]').type("test@hotmail.com");
		cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
		cy.get('[data-cy="contact-btn-submit"]').should(
			"not.have.attr",
			"disabled"
		);
		cy.get('[data-cy="contact-btn-submit"]').click();
		cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
		cy.get('[data-cy="contact-btn-submit"]').should(
			"have.attr",
			"disabled"
		);
	});
});
