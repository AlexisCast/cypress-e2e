/// <reference types="Cypress" />

describe("Auth", () => {
	beforeEach(() => {
		cy.task("seedDatabase");
	});

	it("should signup", () => {
		cy.visit("/signup");
		cy.get('[data-cy="auth-email"]').click();
		cy.get('[data-cy="auth-email"]').type("test2@example.com");
		cy.get('[data-cy="auth-password"]').click();
		cy.get('[data-cy="auth-password"]').type("123123123");
		cy.get('[data-cy="auth-submit"]').click();
		cy.location("pathname").should("eq", "/takeaways");
		cy.getCookie("__session").its("value").should("not.be.empty");
	});

	it("should login", () => {
		cy.visit("/login");
		cy.get('[data-cy="auth-email"]').click();
		cy.get('[data-cy="auth-email"]').type("test@example.com"); // user exist beacuse of seed-test.js
		cy.get('[data-cy="auth-password"]').click();
		cy.get('[data-cy="auth-password"]').type("testpassword");
		cy.get('[data-cy="auth-submit"]').click();
		cy.location("pathname").should("eq", "/takeaways");
		cy.getCookie("__session").its("value").should("not.be.empty");
	});

	it("should logout", () => {
		cy.visit("/login");
		cy.get('[data-cy="auth-email"]').click();
		cy.get('[data-cy="auth-email"]').type("test@example.com"); // user exist beacuse of seed-test.js
		cy.get('[data-cy="auth-password"]').click();
		cy.get('[data-cy="auth-password"]').type("testpassword");
		cy.get('[data-cy="auth-submit"]').click();
		cy.location("pathname").should("eq", "/takeaways");
		cy.getCookie("__session").its("value").should("not.be.empty");

		cy.contains("Logout").click();
		cy.location("pathname").should("eq", "/");
		cy.getCookie("__session").its("value").should("be.empty");
	});

	it("should logout, reusable 'login' command", () => {
		cy.login();

		cy.contains("Logout").click();
		cy.location("pathname").should("eq", "/");
		cy.getCookie("__session").its("value").should("be.empty");
	});
});
