import {test} from '@playwright/test'
import {urls} from '../../utils/config'
import {pageFactory} from "../../pages/pageFactory";

test.describe('Navigation bar Verification Test', async () => {
    let pages
    let page
    let context
    
    test.beforeEach(async ({browser}) => {
        context = await browser.newContext()
        page = await context.newPage()
        const pageFact = new pageFactory(page)
        pages = {
            homePage: await pageFact.HomePage(page),
            navigationPage: await pageFact.NavigationPage(page),
        }
        await pages.homePage.navigateToHomePage()
    })
    
    test.afterEach(async () => {
        if (context) {
            await context.close()
        }
    })
    test('Verify Angelone logo on header', async () => {
        await pages.navigationPage.verifyAngelOneLogoVisible()
    })
    test('Verify Indices visible on Header', async () => {
        const indices = ['SENSEX', 'NIFTY'];
        for (const index of indices) {
            await pages.navigationPage.verifyIndicesVisibleOnHeader(index, true);
        }
    })
    test('Verify icons visible on Header', async () => {
        const options = ['market', 'watchlist', 'portfolio', 'orders, tools', 'alerts']
        for (const index of options) {
            await pages.navigationPage.verifyIconsOnHeader(index, true);
        }
    })
})