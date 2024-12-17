import {FieldTypeDefinition, NAVITEMS, TypeFieldSchema} from "../../support/types";

const typeToHTMLType = {
    "string": "input",
    "text": "input",
    "textarea": "input",
    "text_format": "textarea",
    "text_long": "textarea",
    /*
    "text_with_summary": "textarea",
    "string_long": "textarea",
    "email": "input",
    "password": "input",
    "telephone": "input",
    "float": "input",
    'decimal': "input",
    'integer': "input",
    'boolean': "select",
    "select": "select",
    "radios": "select",
    "checkboxes": "checkbox",
    "list_string": "select",
    "datetime": "input",
    "daterange": "input",
    "fieldset": "input",
    "link": "input",
    "path": "input",
    "color_field_type": "input",
    'image': "input",
    'managed_file': "input",
    'entity_reference': "input",
    "voting_api_field": "input",
    "language":"hidden",
    'hidden': "hidden",
    */
}

describe("oaexample load and populate add forms", async () => {
    beforeEach(() => {
        cy.loginBackground(Cypress.env("email"), Cypress.env("password")).then(e => {
            console.log(e);

            cy.clickIf('[aria-label="Dismiss EULA Notice"]')
        });
    })

    it("oaexample load and populate add forms", () => {

        cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
        cy.visit(Cypress.env("REACT_APP_APP_HOST"));
        cy.assertMenuReady();

        NAVITEMS.forEach(navItem => {
            cy.clickIf('[aria-label="Open Drawer"]')

            cy.intercept('GET', `${navItem.api}*`).as(`Get${navItem.type}`) // wildcard for query params
            cy.grab(`#ObjectTypesMenu a[href="${navItem.screen}" i]`).showClick();
            cy.wait(`@Get${navItem.type}`).then((interception) => {
                expect(interception.response).to.exist;
                expect(interception.response.statusCode).to.eq(200);
            });

            cy.clickIf('[aria-label="Close Drawer"]')

            cy.intercept('GET', `/forms${navItem.screen}/0/add*`).as(`GetForm${navItem.type}`) // wildcard for query params
            cy.grab(`[data-href="/forms${navItem.screen}/0/add" i]`).showClick();

//            cy.wait(`@GetForm${navItem.type}`).its('response.status').should('eq', 200)

//            cy.wait(`@GetForm${navItem.type}`).then((interception) => {
//                expect(interception.response).to.exist;
//                expect(interception.response.statusCode).to.eq(200);

            cy.log(`Populate Form ${navItem.type}`);

            const fields: FieldTypeDefinition[] = Object.values(TypeFieldSchema[navItem.type])

            for (let f in fields) {
                let field = fields[f];

                const inputTag = typeToHTMLType[field.field_type];
                if (!inputTag) {
                    console.warn('skipping ' + field.field_type, field);
                    continue;
                }

                const selector = `${inputTag}[name="${field.machine}"]`;

                if (field.field_type === 'textarea' || field.field_type === 'text') {
                    cy.grab(selector).type(`Testing ${new Date().getTime()}`);
                }
            }

            cy.grab('button[aria-label="Submit" i]').scrollIntoView({
                behavior: "smooth",
                block: "start",
                offset: {top: -150, left: 0},
            });

//            })

        })

    })
})

