import { commonLocatorMethodsPage } from "../../common/commonLocatorMethods.page";
import {expect} from "@playwright/test";

export class LoginPage extends commonLocatorMethodsPage {
    constructor(page) {
        super(page)
        this.loginHeading = 'Login / Register'
        this.loginByPhone = 'Login / Register with Phone'
        this.loginByClient = 'Login with Client ID'
        this.login_input = 'input#login\\|input\\|'
        this.verifyOTP = 'input#login\\|input\\|verify_otp'
        this.resendOTP = 'Resend OTP'
        this.resendOTPSuccess = 'Resend OTP Successful'

        this.proceed = 'Proceed'
    }
    async gotoUrl(url){
        await this.page.goto(url,{ waitUntil: 'domcontentloaded' })
    }
    async verifySliderContainer(){
        const container = await this.page.locator('div.slider-container')
        const list = container.locator('div.slide')
        await list.first().waitFor({state : 'attached'})
        const count = list.count
        for (let i = 0; i < count; i++){
            const item = list.nth(i);
            await expect(item.locator('img')).toBeVisible()
            await expect(item.locator('h2')).toBeVisible()
            await expect(item.locator('p')).toBeVisible()
        }
    }
    async verifyLoginHeader() {
        const heading = this.page.getByRole('heading', { name: this.loginHeading })
        await expect(heading).toBeVisible()
    }
    async selectLoginByPhone() {
        await this.getElementByText(this.loginByPhone).click()
    }

    async selectLoginByClientId() {
        await this.getElementByText(this.loginByClient).click()
    }

    async enterLoginText(method, text) {
        await this.page.locator(this.login_input+method).fill(text)
    }
    async clickProceedButton() {
        await this.getButtonElement(this.proceed).click()
    }
    async verifyProceedButtonDisabled() {
        await expect(this.page.locator(this.proceed).isDisabled()).toBeTruthy()
    }
    async verifyOTPInputIsVisible() {
        await expect(this.page.locator(this.verifyOTP)).toBeVisible()
    }
    async clickResendOTP(){
        await this.page.getByText(this.resendOTP).click()
        await this.page.waitForTimeout(30000)
        await this.page.getByText(this.resendOTP).click()
        await expect(this.getElementByText(this.resendOTP)).toBeVisible()
    }
}