/// <reference types="Cypress"/>

describe("page navigation", () => {
	it("should navigate between pages", () => {
		cy.visit("http://localhost:5176/");
		cy.get('[data-cy="header-about-link"]').click();
		cy.location("pathname").should("eq", "/about"); // about page
		cy.go("back"); // back button
		cy.location("pathname").should("eq", "/"); // home page
		cy.get('[data-cy="header-about-link"]').click();
		cy.get('[data-cy="header-home-link"]').click(); // honme page
	});
});
