import {commonLocatorMethodsPage} from "../../common/commonLocatorMethods.page";
import {expect} from "@playwright/test";
import {urls} from "../../utils/config";

export class HomePage extends commonLocatorMethodsPage {
    constructor(page) {
        super(page)
        this.productsHeading = 'Products'
        this.research_recommendation = 'Research Recommendations'
        this.viewTradingIdeas = 'VIEW ALL TRADING IDEAS'
        this.joinCommunity = 'Join our Community'
        this.externalServicesHeading = 'External Services'
        this.smallcaseText = 'Smallcase'
        this.vestedText = 'Vested'
        this.sensibullText = 'Sensibull'
    }
    async navigateToHomePage(){
        await this.page.goto(urls.home)
    }

    async verifyProductsCard() {
        const card =  this.getElementByText(this.productsHeading)
        await expect(card).toBeVisible()
    }

    async productsNavigation(product) {
        const productItem = await this.getElementByText(product, true)
        await expect(productItem).toBeVisible()
        if(product === 'IPO')
            await this.validateNewTabUrl(productItem, urls.ipo)
        else if(product === 'Mutual Funds')
            await this.validateNewTabUrl(productItem, urls.mf)
        else if(product === 'Refer & Earn')
            await this.validateNewTabUrl(productItem, urls.refer_earn)
        else if(product === 'Subscription Plans')
            await this.validateNewTabUrl(productItem, urls.subscription_plans)
        else if(product === 'Offers & Rewards')
            await this.validateNewTabUrl(productItem, urls.offers_rewards)
    }

    async rem_productsNavigation(product) {
        const productItem = await this.getElementByText(product, true)
        await expect(productItem).toBeVisible()
        await productItem.click()
        if(product === 'Futures & Options')
            await expect(urls.f_o).toContain(this.page.url())
        else if(product === 'ETF')
            await expect(urls.etf).toContain(this.page.url())
        else if(product === 'MTF')
            await expect(urls.mtf).toContain(this.page.url())
    }
    async verifyResearchRecommendation() {
        const card = this.getElementByText(this.research_recommendation)
        await expect(card).toBeVisible()
    }
    async viewTradingIdeasNavigation() {
        const button =  this.getButtonElement(this.viewTradingIdeas)
        await expect(button).toBeVisible()
        await button.click()
        await expect(urls.trading_idea).toContain(this.page.url())
    }
    async validateJoinOurCommunityCard() {
        const card_heading = this.getElementByText(this.joinCommunity)
        await expect(card_heading).toBeVisible()
    }
    async validateSocialMediaLink(channel) {
        const link = await this.page.getByAltText(channel)
        await expect(link).toBeVisible()
    }
    async verifyExternalServicesCard() {
        const card = this.getElementByText(this.externalServicesHeading)
        await expect(card).toBeVisible()
    }
    async validateExternalServiceNavigation(service) {
        const serviceLink = this.getElementByText(service)
        await expect(serviceLink).toBeVisible()
        
        if(service === 'Smallcase')
            await this.validateNewTabUrl(serviceLink, urls.smallcase)
        else if(service === 'Vested')
            await this.validateNewTabUrl(serviceLink, urls.vested)
        else if(service === 'Sensibull')
            await this.validateNewTabUrl(serviceLink, urls.sensibull)
    }
}