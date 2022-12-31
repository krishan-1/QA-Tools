describe("SAM Builder E2E Testing", function () 
{
  before(function () 
  {
    cy.fixture("kurator.json").then((kuratorData) => 
    {
      this.kuratorData = kuratorData;
      // cy.window().then(() => 
      // {
      //   localStorage.setItem("jwt", this.kuratorData.jwt);
      //   localStorage.setItem("tenant.id", this.kuratorData.tenant_id);
      // });
      // cy.visit("https://admin-staging.sourcesync.io/#/");
    });
    cy.login('sourcedev@gmail.com','Source0ne');
    cy.changeOrg('QA_CDN-Org');
  })

  it('click to SAM Builder Tab',function()
  {
    cy.intercept('/currentuser/activations?*').as('fetchActivations');
    cy.contains("div", "SAM Builder").click();
    cy.wait('@fetchActivations');
  })

  it('create/click new SAM',function()
  {
    // cy.get(`.q-page [role='img']`).contains('add').should('be.visible').trigger('click');
    // cy.intercept('/activations/count?*').as('fetchCountOfActivations')
    // cy.get(`.q-form [aria-label='Name']`).type('activation for e2e');
    // cy.wait('@fetchCountOfActivations').then((interceptor)=>
    // {
    //     expect(interceptor.response.body).to.equal(0,'SAM should be unique.');
    //     cy.intercept('POST','/activations').as('activationCreated');
    //     cy.intercept('/activations/*').as('activationOpen');
    //     cy.get('.block').contains('Submit').should('be.visible').click();
    //     cy.wait('@activationCreated').then(()=>
    //     {
    //         cy.wait('@activationOpen');
    //     })
    // })
    cy.intercept('/activations/*').as('openActivation');
    cy.intercept('/currentuser/tags?*').as('fetchTags')
    cy.get("table .q-virtual-scroll__content tr").eq(0).click();
    cy.wait('@openActivation').then(()=>{
      cy.wait('@fetchTags');
    });
  })

  // describe('validate choose template',function()
  // {
  //   it('Click on Choose Template',function()
  //   {
  //     cy.get(`[role="tab"]`).eq(0).click();
  //   })

  //   it("Validate Brand Template", function () 
  //   {
  //     cy.intercept("/template-blocks?*").as("fetchTemplate");
  //     cy.get(".q-table__grid-content > div").eq(0).click();
  //     cy.wait("@fetchTemplate").then(()=>
  //     {
  //       cy.get(`[role="tab"]`).eq(2).click();
  //         cy.get(".list-group > div").then(($element) => 
  //         {
  //           cy.get($element).should("have.length", 6);
  //           cy.get($element).eq(0).should("include.text", "Image SmartBlock");
  //           cy.get($element).eq(1).should("include.text", "Markdown SmartBlock");
  //           cy.get($element).eq(2).should("include.text", "Video SmartBlock");
  //           cy.get($element).eq(3).should("include.text", "Markdown SmartBlock");
  //           cy.get($element).eq(4).should("include.text", "Action SmartBlock");
  //           cy.get($element).eq(5).should("include.text", "Social Smartblock");
  //           cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
  //         });
  //       });
  //     })

  //     it("Validate Location Template", function () 
  //     {
  //       cy.get(`[role="tab"]`).eq(0).click();
  //       cy.intercept("/template-blocks?*").as("fetchTemplate");
  //       cy.get(".q-table__grid-content > div").eq(1).click();
  //       cy.wait("@fetchTemplate").then(() => 
  //       {
  //         cy.get(`[role="tab"]`).eq(2).click();
  //         cy.get(".list-group > div").then(($el) => 
  //         {
  //           cy.get($el).should("have.length", 5);
  //           cy.get($el).eq(0).should("include.text", "Markdown SmartBlock");
  //           cy.get($el).eq(1).should("include.text", "Image SmartBlock");
  //           cy.get($el).eq(2).should("include.text", "Location SmartBlock");
  //           cy.get($el).eq(3).should("include.text", "Markdown SmartBlock");
  //           cy.get($el).eq(4).should("include.text", "Social Smartblock");
  //           cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
  //         });
  //       });
  //     })

  //     it("Validate Person-Bio Template", function () 
  //     {
  //       cy.get(`[role="tab"]`).eq(0).click();
  //       cy.intercept("/template-blocks?*").as("fetchTemplate");
  //       cy.get(".q-table__grid-content > div").eq(2).click();
  //       cy.wait("@fetchTemplate").then(() => 
  //       {
  //         cy.get(`[role="tab"]`).eq(2).click();
  //         cy.get(".list-group > div").then(($el) => 
  //         {
  //           cy.get($el).should("have.length", 4);
  //           cy.get($el).eq(0).should("include.text", "Markdown SmartBlock");
  //           cy.get($el).eq(1).should("include.text", "Image SmartBlock");
  //           cy.get($el).eq(2).should("include.text", "Markdown SmartBlock");
  //           cy.get($el).eq(3).should("include.text", "Social Smartblock");
  //           cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should("have.class", "q-toggle__inner--truthy");
  //         });
  //       });
  //     })

  //     it("Validate Custom Template", function () 
  //     {
  //       cy.get(`[role="tab"]`).eq(0).click();
  //       cy.intercept("/template-blocks?*").as("fetchTemplate");
  //       cy.get(".q-table__grid-content > div").eq(3).click();
  //       cy.wait("@fetchTemplate").then(() => 
  //       {
  //         cy.get(`[role="tab"]`).eq(2).click();
  //         cy.get(".list-group > div").should('not.exist');
  //       });
  //     });
  // })

  // describe('validate Edit SAM Overlay',function()
  // {
  //   it('Click on Edit SAM Overlay',function(){
  //     cy.get(`[role="tab"]`).eq(1).click();
  //   })

  //   it('Validate Preview Text In Edit SAM Overlay', function()
  //   {
  //     let text = 'verify the preview text';
  //     cy.get('input[aria-label="Preview Text"]').type(text)
  //     cy.get('.smartblock-display__label>div').each(($label)=>
  //     {
  //         expect($label.text().trim()).to.equal(text);
  //     })
  //   })

  //   it('Validate Display Image using Assets',function()
  //   {
  //     cy.contains('span','URL').click();
  //     cy.intercept('/currentuser/media/folders/?*').as('loading');
  //     cy.intercept('/currentuser/media?*').as('fetchMedia');
  //     cy.contains('div','Select from Assets').click();
  //     cy.wait('@fetchMedia').then(()=>
  //     {
  //       cy.wait('@loading').then(()=>
  //       {
  //         cy.get('.q-table__grid-content>div').eq(0).then(($element)=> 
  //         {
  //           cy.get('.image-list__card .q-img__image').eq(0).then(($el)=> 
  //           {
  //             let srcBefore = $el.css("background-image").substring($el.css("background-image").indexOf(`"`) + 1,$el.css("background-image").lastIndexOf(`"`));
  //             let nameMediaBefore = $el.css("background-image").substring($el.css("background-image").indexOf(`user-media/`) + 11,$el.css("background-image").lastIndexOf(`"`));
  //             cy.wrap(srcBefore).should('include', nameMediaBefore)
  //             cy.log(srcBefore, 'before upload')
  //           })
  //           cy.wrap($element).click()
  //           cy.wait('@loading').then(()=>
  //           {
  //             cy.get(".col.q-mt-sm .q-img__image").then(($newEl)=>
  //             {
  //               let srcAfter = $newEl.css("background-image").substring($newEl.css("background-image").indexOf(`"`) + 1,$newEl.css("background-image").lastIndexOf(`"`));
  //               let nameMediaAfter = $newEl.css("background-image").substring($newEl.css("background-image").indexOf(`user-media/`) + 11,$newEl.css("background-image").lastIndexOf(`"`));
  //               cy.wrap(srcAfter).should('include',nameMediaAfter)
  //               cy.log(srcAfter, 'after upload')
  //               cy.get(".smartblock-display__avatar img").each(($img)=>
  //               {
  //                 let srcImg = $img.attr("src").substring($img.attr("src").indexOf(`"`) + 1,$img.attr("src").lastIndexOf(`"`));
  //                 cy.log(srcImg)
  //                 cy.get($img).should('have.attr', 'src').should('include',nameMediaAfter)
  //               })
  //             })
  //           })
  //         })
  //       })
  //     })
  //   })

  //   it('Convert to SmartBlocks toggle should be enable and Display Smartblock should be present',function()
  //   {
  //     cy.get('.q-list--bordered .q-expansion-item').eq(4).should('have.class','q-expansion-item--expanded').then(()=>
  //     {
  //       cy.get('.q-list--bordered .q-expansion-item').eq(4).within(()=>
  //       {
  //         cy.get(`[aria-label="Convert to SmartBlocks"] > div.q-toggle__inner`).should('have.class','q-toggle__inner--truthy');
  //         cy.get('.q-card__section--horiz').within(()=>
  //         {
  //           cy.get('strong').invoke('text').should('contains','Display Smartblock');
  //           cy.get(`[aria-label="Enable Block"] > div.q-toggle__inner`).should('have.class','q-toggle__inner--truthy');
  //         })
  //       })
  //     })
  //   })
  // })

  describe('validate Edit SAM',function()
  {
    it('Click on Edit SAM',function(){
      cy.get(`.q-tabs__content > div`).eq(2).then(($EditSAMElement)=>
      {
        cy.wrap($EditSAMElement).should('not.have.attr','aria-disabled').then(()=>
        {
          cy.get(`.q-tabs__content > div`).eq(0).click();
          cy.wrap($EditSAMElement).click().then(()=>
          {
            cy.get(`[role="tab"]`).eq(2).invoke('attr', 'aria-selected').should('eq', 'true');
          });
        })
      })
    })
    it("verify choose template button functionality", function ()
    {
      cy.contains('span',"Choose template").click().then(() =>
      {
        cy.get(`[role="tab"]`).eq(0).invoke('attr', 'aria-selected').should('eq', 'true');
      })
    })
    it('verify add block button functionality',function()
    {
      cy.get(`.q-tabs__content > div`).eq(2).click();
      const smartBlockName = 'iFrame SmartBlock';
      // cy.wait(1000).contains('div','Add Blocks').click();
      cy.contains('div','Add Blocks').click();
      cy.get('[aria-label="Find..."]').clear().type(smartBlockName);
      cy.get('.q-pa-sm > .cursor-pointer').within(()=>
      {
        cy.get('strong').invoke('text').should('eq',smartBlockName).then(()=>
        {
          cy.contains('i','add').click();
        })
      })
      cy.get('.q-dialog__inner').within(()=>
      {
        cy.contains('span','Add Blocks').click()
      })
      cy.intercept('/activations/*').as('dataSaved');
      // cy.wait(1000).get('.q-gutter-x-sm button').eq(3).click();
     cy.wait(1000)
      cy.get('.q-gutter-x-sm button').eq(3).click();
      cy.wait('@dataSaved').then(()=>
        {
          cy.get('.q-my-md > div').within(()=>
          {
            cy.get('strong').invoke('text').should('eq',smartBlockName);
          })
        })
      })
    it('verify remove smartblock functionality',function()
    {
      cy.get('.q-my-md > div > div.row').click();
      cy.get('.q-my-md > div').within(()=>
        {
          cy.contains('i','close').click();
        })
      cy.get('.q-dialog-plugin button').eq(1).click();
      cy.intercept('/activations/*').as('dataSaved');
      cy.wait(1000).get('.q-gutter-x-sm button').eq(3).click();
      cy.wait('@dataSaved');
    })
    it("verify import block button functionality",function()
    {
      let smartBlockCountBeforeImporting;
      let smartBlockNamesBeforeImporting = [];
      cy.intercept(" /currentuser/activations/count?*").as("fetchCount");
      cy.intercept("/currentuser/activations?*").as("fetchActivations");
      cy.contains('span','Import Blocks').click();
      cy.wait("@fetchCount").then(()=>
      {
        cy.wait("@fetchActivations").then(()=>
        {
          cy.get(".q-virtual-scroll__content > tr").eq(1).click();
          cy.get(".q-dialog__inner").within(()=>
          {
            cy.get(".row.no-wrap strong").then(($block)=>
            {
              smartBlockCountBeforeImporting = $block.length;
              cy.wrap($block).each(($ele,index,$list)=>
              {
                smartBlockNamesBeforeImporting.push($ele.text());
              })
            })
          });
        })
        cy.contains("Select All").click();
        cy.contains("Import Selected Blocks").click().then(()=>
        {
          cy.wait(1000).get(".row.no-wrap strong").then(($block)=>
          {
            expect($block.length).equal(smartBlockCountBeforeImporting);
            cy.wrap($block).each(($ele,index,$list)=>
            {
              expect($ele.text()).to.equal(smartBlockNamesBeforeImporting[index]);
            })
          })
        })
      })
    })
    it("verify background color & opacity",function()
    {
      let color = "rgba(50, 100, 150, 0.8)";
      cy.wait(1000).get(".q-px-sm > div").eq(1).click()
      cy.get(".q-px-sm > div").eq(1).within(()=>
      {
        cy.get(`[aria-label="Background Color"]`).clear().type(color);
      })
      cy.get(`.q-splitter__after > .full-width > div`).then(($bgDiv)=>
      {
        cy.wrap($bgDiv).should('have.css', 'background-color', color);
        cy.get(".q-px-sm > div").eq(1).within(()=>
        {
          cy.get(`[role="slider"]`).then(($slider)=>
          {
            cy.wrap($slider).type("{rightArrow}{rightArrow}");
          })
        })
        cy.get(".q-slider__text").then(($opText)=>
        {
          cy.wrap($bgDiv).should('have.css', 'background-color').should('include', parseFloat($opText.text()).toFixed(1));
        })
      })
    })
  })










})

