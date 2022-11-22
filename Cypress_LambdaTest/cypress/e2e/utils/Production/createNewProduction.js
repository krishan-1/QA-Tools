const youtubeVideoURL = 'https://www.youtube.com/watch?v=EngW7tLk6R8';
const vimeoVideoURL = 'https://vimeo.com/37385237';
const mp4URL = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

function createNewProduction(...args){
    var productionName = args[0];
    const productionType = args[1];
    const videoType = args[2];
    cy.get(`.q-form [aria-label='Name']`).clear().type(productionName).wait(2000); //This will enter the production name
    cy.get(`.q-form > .q-card__section > div.col-lg-6 > label  [tabindex='-1']`).then(($error)=>{
    //If slug already available with same name
    if($error.hasClass('text-negative'))
    {
        cy.log('Slug should be unique.');
        productionName = productionName.concat('-c');
        createNewProduction(productionName,productionType,videoType);
    }
    //else slug is unique
    else
    {
        cy.get(`.q-form > .q-card__section > :nth-child(4) > label > div`).click().then(()=>{
            //If production type select as overlay
            if(productionType === 'overlay')
                cy.get(`[role='listbox'] .q-item__label`).contains('overlay').click();

            //else production type select as video    
            else if(productionType === 'video')
            {
                cy.get(`[role='listbox'] .q-item__label`).contains('video').click();

                //this will enter video URL as per video type
                switch(videoType)
                {
                    case 'mp4':
                        cy.get(`.q-form > .q-card__section > :nth-child(3) > label > div`).type(mp4URL);
                        break;
                        
                    case 'vimeo':
                        cy.get(`.q-form > .q-card__section > :nth-child(3) > label > div`).type(vimeoVideoURL);
                        break;

                    case 'youtube':
                        cy.get(`.q-form > .q-card__section > :nth-child(3) > label > div`).type(youtubeVideoURL);
                        break;

                    default:
                        cy.log('Provided Video Type was not correct.');
                        break;
                }
            }
            cy.get('.block').contains('Submit').should('be.visible').click().wait(5000);
        })
    }
    })  
}

export {createNewProduction};