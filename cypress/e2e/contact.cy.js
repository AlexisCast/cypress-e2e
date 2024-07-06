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

	it("should submit the form, with chaining and 'and'", () => {
		cy.visit("http://localhost:5176/about");
		cy.get('[data-cy="contact-input-message"]').type("Hello World");
		cy.get('[data-cy="contact-input-name"]').type("Baz Buzz");
		cy.get('[data-cy="contact-input-email"]').type("test@hotmail.com");
		cy.get('[data-cy="contact-btn-submit"]')
			.contains("Send Message")
			.and("not.have.attr", "disabled"); // or use 'shouldd()'
		cy.get('[data-cy="contact-btn-submit"]').click();
		cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
		cy.get('[data-cy="contact-btn-submit"]').should(
			"have.attr",
			"disabled"
		);
	});

	it("should submit the form, with chaining, 'and', values/Alieses", () => {
		cy.visit("http://localhost:5176/about");
		cy.get('[data-cy="contact-input-message"]').type("Hello World");
		cy.get('[data-cy="contact-input-name"]').type("Baz Buzz");
		cy.get('[data-cy="contact-input-email"]').type("test@hotmail.com");
		cy.get('[data-cy="contact-btn-submit"]')
			.contains("Send Message")
			.and("not.have.attr", "disabled"); // or use 'should()'
		cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
		cy.get("@submitBtn").click();
		cy.get("@submitBtn").contains("Sending...");
		cy.get("@submitBtn").should("have.attr", "disabled");
	});

	it("should submit the form, with chaining, 'and', values/Alieses, then()", () => {
		cy.visit("http://localhost:5176/about");
		cy.get('[data-cy="contact-input-message"]').type("Hello World");
		cy.get('[data-cy="contact-input-name"]').type("Baz Buzz");
		cy.get('[data-cy="contact-input-email"]').type("test@hotmail.com");
		cy.get('[data-cy="contact-btn-submit"]').then((el) => {
			expect(el.attr("disabled")).to.be.undefined;
			expect(el.text()).to.eq("Send Message");
		});
		// cy.get('[data-cy="contact-btn-submit"]')
		// 	.contains("Send Message")
		// 	.should("not.have.attr", "disabled"); // or use 'and()'
		cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
		cy.get("@submitBtn").click();
		cy.get("@submitBtn").contains("Sending...");
		cy.get("@submitBtn").should("have.attr", "disabled");
	});
});
