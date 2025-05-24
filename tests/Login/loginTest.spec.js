import {test} from '@playwright/test'
import {urls} from '../../utils/config'
import {pageFactory} from "../../pages/pageFactory";

let pages
let page
let context
test.describe('Login Verification Test', async () => {
    test.beforeAll(async ({browser}) => {
       context = await browser.newContext()
        page = await context.newPage()
        const pageFact = new pageFactory(page)
        pages = {
           loginPage: await pageFact.LoginPage(page)
        }
    })
    test('Navigate and confirm slider content', async () => {
        await pages.loginPage.gotoUrl(urls.base)
        await pages.loginPage.verifySliderContainer()
    })
    test('Verify login', async () => {
        await pages.loginPage.gotoUrl(urls.base)
        await pages.loginPage.verifyLoginHeader()
        await pages.loginPage.selectLoginByClientId()
        await pages.loginPage.selectLoginByPhone()
        await pages.loginPage.verifyProceedButtonDisabled()
        await pages.loginPage.enterLoginText('phone_number',process.env.MOBILE)
        await pages.loginPage.clickProceedButton()
        await pages.loginPage.verifyOTPInputIsVisible()
        await pages.loginPage.clickResendOTP()
    })
})