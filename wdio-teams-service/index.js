const axios = require('axios')
const passBlock = {
    'type': 'TextBlock',
    'text': 'Passed',
    'wrap': true,
    'size': 'Large',
    'weight': 'Bolder',
    'color': 'Good',
}
const failedBlock = {
    'type': 'TextBlock',
    'text': 'Failed',
    'wrap': true,
    'size': 'Large',
    'weight': 'Bolder',
    'color': 'Attention',
}

const base = {
    'type': 'message',
    'attachments': [{
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'contentUrl': null,
        'content': {
            'type': 'AdaptiveCard',
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'version': '1.2',
            'body': []
        }
    }]
}
let OSName
let browser
class MSteamsService {
    constructor(serviceConfig) {
        this.notifyOnPass = serviceConfig.notifyOnPass || false
        if(!serviceConfig.webhookURL){
            console.error('webhookURL must be specified')
            return
        }
        this.webhookURL = serviceConfig.webhookURL;
        this.title = serviceConfig.title || 'WebdriverIO Teams Reporter'
        this.videoSlowdownMultiplier = serviceConfig.videoSlowdownMultiplier || 3
    }

    before(capabilities, specs) {
        console.log('test5664 ' + JSON.stringify(capabilities))
        if(capabilities.hostname === 'localhost'){
            const os = require('os')
            os.platform()
            os.release()
            OSName = `${os.platform()}-${os.release()}`
        }
        browser = capabilities.browserName
    }

    async afterTest(test, context, { error, result, duration, passed, retries }){
        const hasError = await error
        const suite = await test.parent
        const testName = await test.title
        const title = await createTitleBlock(suite, testName, new Date())
        await base.attachments[0].content.body.push(title)
        if(hasError !== undefined){
            await base.attachments[0].content.body.push(failedBlock)
        } else {
            await base.attachments[0].content.body.push(passBlock)
        }
        const details = await createDetailsBlock(OSName, browser)
        await base.attachments[0].content.body.push(details)
        if(hasError !== undefined){
            const errorBlock = await createErrorBlock(error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
            await base.attachments[0].content.body.push(errorBlock)
        }
        if(hasError === undefined && this.notifyOnPass){
            await axios({
                method: 'post',
                url: this.webhookURL,
                data: base
            })
        } else if(hasError !== undefined){
            await axios({
                method: 'post',
                url: this.webhookURL,
                data: base
            })
        }
    }


}

function createTitleBlock(suiteName, testName, date){
    let block = {
        'type': 'ColumnSet',
        'columns': [
            {
                'type': 'Column',
                'items': [
                    {
                        'type': 'Image',
                        'style': 'Person',
                        'url': 'https://webdriver.io/img/webdriverio.png',
                        'size': 'Small'
                    }
                ],
                'width': 'auto'
            },
            {
                'type': 'Column',
                'items': [
                    {
                        'type': 'TextBlock',
                        'weight': 'Bolder',
                        'text': `${suiteName}-${testName}`,
                        'wrap': true
                    },
                    {
                        'type': 'TextBlock',
                        'spacing': 'None',
                        'text': `Ran ${date} `,
                        'isSubtle': true,
                        'wrap': true
                    }
                ],
                'width': 'stretch'
            }
        ]
    }
    return block
}
function createDetailsBlock(OS, browser){
    let block = {
        'type': 'TextBlock',
        'text': `OS - ${OS}\n\nBrowser - ${browser}`,
        'wrap': true,
        'separator': true,
    }
    return block
}

function createErrorBlock(errorMessage){
    const block = {
        'type': 'Container',
        'items': [
            {
                'type': 'TextBlock',
                'text': 'Error Message',
                'wrap': true,
                'separator': true,
                'size': 'Large',
                'weight': 'Bolder',
                'color': 'Attention'
            },
            {
                'type': 'TextBlock',
                'text': `${errorMessage}`,
                'wrap': true
            }
        ],
        'separator': true,
    }
    return block
}

module.exports = MSteamsService