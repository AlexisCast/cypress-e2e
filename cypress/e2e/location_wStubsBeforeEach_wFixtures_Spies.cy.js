/// <reference types="cypress" />

describe("share location", () => {
	beforeEach(() => {
		cy.clock();
		cy.fixture("user-location.json").as("userLocation");
		cy.visit("/").then((win) => {
			cy.get("@userLocation").then((fakePosition) => {
				cy.stub(win.navigator.geolocation, "getCurrentPosition")
					.as("getUserPosition")
					.callsFake((cb) => {
						setTimeout(() => {
							cb(fakePosition);
						}, 1000);
					});
			});
			cy.stub(win.navigator.clipboard, "writeText")
				.as("saveToClipboard")
				.resolves();
			cy.spy(win.localStorage, "setItem").as("storeLocation");
			cy.spy(win.localStorage, "getItem").as("getStoredLocation");
		});
	});

	it("should fetch the user location", () => {
		cy.get('[data-cy="get-loc-btn"]').click();
		cy.get("@getUserPosition").should("have.been.called");
		cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
		cy.get('[data-cy="actions"]').should("contain", "Location fetched");
	});

	it("should share a location URL", () => {
		cy.get('[data-cy="name-input"]').type("Jhon Doe");
		cy.get('[data-cy="get-loc-btn"]').click();
		cy.get('[data-cy="share-loc-btn"]').click();
		cy.get("@saveToClipboard").should("have.been.called");
		cy.get("@userLocation").then((fakePosition) => {
			const { latitude, longitude } = fakePosition.coords;
			cy.get("@saveToClipboard").should(
				"have.been.calledWithMatch",
				new RegExp(
					`${latitude}.*${longitude}.*${encodeURI("Jhon Doe")}`
				)
			);
			cy.get("@storeLocation").should(
				"have.been.calledWithMatch",
				/Jhon Doe/,
				new RegExp(
					`${latitude}.*${longitude}.*${encodeURI("Jhon Doe")}`
				)
			);
		});

		cy.get("@storeLocation").should("have.been.called");

		cy.get('[data-cy="share-loc-btn"]').click();
		cy.get("@getStoredLocation").should("have.been.called");

		cy.get('[data-cy="info-message"]').should("be.visible");
		cy.get('[data-cy="info-message"]').should("have.class", "visible");
		cy.tick(2000); // clock must be declared beforeEach first
		cy.get('[data-cy="info-message"]').should("not.visible");
	});
});
