import {test} from '@playwright/test'
import {pageFactory} from "../../pages/pageFactory";

let pages
let page
let context
test.describe('Home Page Verification Test', async () => {
    test.beforeAll(async ({browser}) => {
        context = await browser.newContext()
        page = await context.newPage()
        const pageFact = new pageFactory(page)
        pages = {
            homePage: await pageFact.HomePage(page)
        }
    })
    test.beforeEach(async () => {
        await pages.homePage.navigateToHomePage()
    })

    const products = ['IPO', 'Mutual Funds', 'Offers & Rewards', 'Refer & Earn', 'Subscription Plans']
    products.forEach(product => {
        test(`Verify product navigation for ${product}`, async ()=>{
            await pages.homePage.verifyProductsCard()
            await pages.homePage.productsNavigation(product)
        })
    })

    const rem_products = ['Futures & Options', 'ETF', 'MTF']
    rem_products.forEach(rem_product => {
        test(`Verify product navigation for ${rem_product}`, async ()=>{
            await pages.homePage.verifyProductsCard()
            await pages.homePage.rem_productsNavigation(rem_product)
        })
    })

    test('Verify research recommendation card visible', async () => {
        await pages.homePage.verifyResearchRecommendation()
        await pages.homePage.viewTradingIdeasNavigation()
    })
    test('Verify Join our community card visible', async () => {
        const channel = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn']
        await pages.homePage.validateJoinOurCommunityCard()
        for(const item of channel) {
            await pages.homePage.validateSocialMediaLink(item)
        }
    })
    const externalServices = ['Smallcase', 'Vested', 'SensibullLearn options']
    externalServices.forEach(service => {
        test(`Verify external service navigation for ${service}`, async () => {
            await pages.homePage.verifyExternalServicesCard()
            await pages.homePage.validateExternalServiceNavigation(service)
        })
    })
})