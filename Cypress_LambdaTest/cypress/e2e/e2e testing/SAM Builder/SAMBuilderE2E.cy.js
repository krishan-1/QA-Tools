describe("SAM Builder E2E Testing", function () {
  const p = "coffee.jpg";
  const path = require("path");
  var assetsCount;

  before(function () 
  {
    cy.fixture("kurator.json").then((kuratorData) => 
    {
      this.kuratorData = kuratorData;
      cy.window().then(() => 
      {
        localStorage.setItem("jwt", this.kuratorData.jwt);
        localStorage.setItem("tenant.id", this.kuratorData.tenant_id);
      });
      cy.visit("https://admin-staging.sourcesync.io/#/");
    });
  })

  it('click to SAM Builder Tab',function()
  {
    cy.intercept('/currentuser/activations?*').as('fetchActivations');
    cy.contains("div", "SAM Builder").click();
    cy.wait('@fetchActivations');
  })

  it('create/click new SAM',function()
  {
    cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click');
    cy.intercept('/activations/count?*').as('fetchCountOfActivations')
    cy.get(`.q-form [aria-label='Name']`).type('cypress activation');
    cy.wait('@fetchCountOfActivations').then((interceptor)=>
    {
        expect(interceptor.response.body).to.equal(0,'SAM should be unique.');
        cy.intercept('POST','/activations').as('activationCreated');
        cy.intercept('/activations/*').as('activationOpen');
        cy.get('.block').contains('Submit').should('be.visible').click();
        cy.wait('@activationCreated').then(()=>
        {
            cy.wait('@activationOpen');
        })
    })
  })

  describe('validate choose template',function()
  {
    it('Click on Choose Template',function()
    {
      cy.get(`[role="tab"]`).eq(0).click();
    })

    it("Validate Brand Template", function () 
    {
      cy.intercept("/template-blocks?*").as("fetchTemplate");
      cy.get(".q-table__grid-content > div").eq(0).click();
      cy.wait("@fetchTemplate").then(()=>
      {
        cy.get(`[role="tab"]`).eq(2).click();
          cy.get(".list-group > div").then(($element) => 
          {
            cy.get($element).should("have.length", 6);
            cy.get($element).eq(0).should("include.text", "Image SmartBlock");
            cy.get($element).eq(1).should("include.text", "Markdown SmartBlock");
            cy.get($element).eq(2).should("include.text", "Video SmartBlock");
            cy.get($element).eq(3).should("include.text", "Markdown SmartBlock");
            cy.get($element).eq(4).should("include.text", "Action SmartBlock");
            cy.get($element).eq(5).should("include.text", "Social Smartblock");
            cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
          });
        });
      })

      it("Validate Location Template", function () 
      {
        cy.get(`[role="tab"]`).eq(0).click();
        cy.intercept("/template-blocks?*").as("fetchTemplate");
        cy.get(".q-table__grid-content > div").eq(1).click();
        cy.wait("@fetchTemplate").then(() => 
        {
          cy.get(`[role="tab"]`).eq(2).click();
          cy.get(".list-group > div").then(($el) => 
          {
            cy.get($el).should("have.length", 5);
            cy.get($el).eq(0).should("include.text", "Markdown SmartBlock");
            cy.get($el).eq(1).should("include.text", "Image SmartBlock");
            cy.get($el).eq(2).should("include.text", "Location SmartBlock");
            cy.get($el).eq(3).should("include.text", "Markdown SmartBlock");
            cy.get($el).eq(4).should("include.text", "Social Smartblock");
            cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
          });
        });
      })

      it("Validate Person-Bio Template", function () 
      {
        cy.get(`[role="tab"]`).eq(0).click();
        cy.intercept("/template-blocks?*").as("fetchTemplate");
        cy.get(".q-table__grid-content > div").eq(2).click();
        cy.wait("@fetchTemplate").then(() => 
        {
          cy.get(`[role="tab"]`).eq(2).click();
          cy.get(".list-group > div").then(($el) => 
          {
            cy.get($el).should("have.length", 4);
            cy.get($el).eq(0).should("include.text", "Markdown SmartBlock");
            cy.get($el).eq(1).should("include.text", "Image SmartBlock");
            cy.get($el).eq(2).should("include.text", "Markdown SmartBlock");
            cy.get($el).eq(3).should("include.text", "Social Smartblock");
            cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
          });
        });
      })

      it("Validate Custom Template", function () 
      {
        cy.get(`[role="tab"]`).eq(0).click();
        cy.intercept("/template-blocks?*").as("fetchTemplate");
        cy.get(".q-table__grid-content > div").eq(3).click();
        cy.wait("@fetchTemplate").then(() => 
        {
          cy.get(`[role="tab"]`).eq(2).click();
          cy.get(".list-group > div").should('not.exist');
        });
      });
  })

  describe('validate Edit SAM Overlay',function()
  {
    it('Click on Edit SAM Overlay',function(){
      cy.get(`[role="tab"]`).eq(1).click();
    })

    it('Validate Preview Text In Edit SAM Overlay', function()
    {
      let text = 'verify the preview text';
      cy.get('input[aria-label="Preview Text"]').type(text)
      cy.get('.smartblock-display__label>div').each(($label)=>
      {
          expect($label.text().trim()).to.equal(text);
      })
    })

    it('Validate Display Image In Edit SAM Overlay',function()
    {
      cy.contains('span','URL').click();
      cy.intercept('/currentuser/media/folders/?*').as('loading');
      cy.intercept('/currentuser/media?*').as('fetchMedia');
      cy.contains('div','Select from Assets').click();
      cy.wait('@fetchMedia').then(()=>
      {
        cy.wait('@loading').then(()=>
        {
          cy.get('.q-table__grid-content>div').eq(0).then(($element)=> 
          {
            cy.get('.image-list__card .q-img__image').eq(0).then(($el)=> 
            {
              let srcBefore = $el.css("background-image").substring($el.css("background-image").indexOf(`"`) + 1,$el.css("background-image").lastIndexOf(`"`));
              let nameMediaBefore = $el.css("background-image").substring($el.css("background-image").indexOf(`user-media/`) + 11,$el.css("background-image").lastIndexOf(`"`));
              cy.wrap(srcBefore).should('include', nameMediaBefore)
              cy.log(srcBefore, 'before upload')
            })
            cy.wrap($element).click()
            cy.wait('@loading').then(()=>
            {
              cy.get(".col.q-mt-sm .q-img__image").then(($newEl)=>
              {
                let srcAfter = $newEl.css("background-image").substring($newEl.css("background-image").indexOf(`"`) + 1,$newEl.css("background-image").lastIndexOf(`"`));
                let nameMediaAfter = $newEl.css("background-image").substring($newEl.css("background-image").indexOf(`user-media/`) + 11,$newEl.css("background-image").lastIndexOf(`"`));
                cy.wrap(srcAfter).should('include',nameMediaAfter)
                cy.log(srcAfter, 'after upload')
                cy.get(".smartblock-display__avatar img").each(($img)=>
                {
                  let srcImg = $img.attr("src").substring($img.attr("src").indexOf(`"`) + 1,$img.attr("src").lastIndexOf(`"`));
                  cy.log(srcImg)
                  cy.get($img).should('have.attr', 'src').should('include',nameMediaAfter)
                })
              })
            })
          })
        })
      })
    })

    it('convert to smart block toggle should be enable and Display smart block should be enable and visible',function()
    {
      cy.get('.q-list--bordered .q-expansion-item').eq(4).should('have.class','q-expansion-item--expanded').then(()=>
      {
        cy.get('.q-list--bordered .q-expansion-item').eq(4).within(()=>
        {
          cy.get(`[aria-label="Convert to SmartBlocks"] > div.q-toggle__inner`).should('have.class','q-toggle__inner--truthy');
          cy.get('.q-card__section--horiz').within(()=>
          {
            cy.get('strong').invoke('text').should('contains','Display Smartblock');
            cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should('have.class','q-toggle__inner--truthy');
          })
        })
      })
    })
  })
})

