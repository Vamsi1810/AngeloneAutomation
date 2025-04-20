import {test} from '@playwright/test'
import {pageFactory} from "../../pages/pageFactory";

let pages
let page
let context
test.describe('Home Page Verification Test @smoke', async () => {
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

    const features = ['Basket Order', 'GTT', 'Stock SIP', 'Alerts', 'TradeOne', 'Smart API', 'Stock Pledging', 'For advanced F&O analysis']
    features.forEach(feature => {
        test(`Verify feature navigation for ${feature}`, async () => {
            await pages.homePage.verifyFeaturesCard()
            await pages.homePage.featureNavigation(feature)
        })
    })

    test('Verify news section present in home page', async () => {
        await pages.homePage.validateNewsTabInHome()
        await pages.homePage.verifyNewsNavigation()
    })

    const gainer_looser_movers = ['Gainers', 'Losers']
    gainer_looser_movers.forEach(market_mover => {
        test(`Verify market movers list by ${market_mover}`, async () => {
            await pages.homePage.verifyMarketMoverHeading()
            await pages.homePage.verifyGainerLooserNavigation(market_mover)
        })
    })

    const high_low_movers = ['High', 'Low']
    high_low_movers.forEach(market_mover => {
        test(`Verify market movers list by ${market_mover}`, async () => {
            await pages.homePage.verifyMarketMoverHeading()
            await pages.homePage.verifyHighLowNavigation(market_mover)
        })
    })
})