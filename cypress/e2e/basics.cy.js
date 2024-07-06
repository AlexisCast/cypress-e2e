/// <reference types="Cypress"/>

describe("tasks page", () => {
	it("should render the main image", () => {
		cy.visit("http://localhost:5176/");
		cy.get(".main-header img");             // nesting
		//cy.get(".main-header").find("img");     // find must be after 'get', same thing as line 6
	});

	it("should display the page tile", () => {
		cy.visit("http://localhost:5176/");
		cy.get("h1").should("have.length", 1);
		cy.get("h1").contains("My Cypress Course Tasks");
		// cy.contains("My Cypress Course Tasks");
	});
});
