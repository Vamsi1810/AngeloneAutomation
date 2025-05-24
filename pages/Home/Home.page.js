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
        this.news = 'News'
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
        await this.findElementByScroll(card_heading)
        await expect(card_heading).toBeVisible()
    }
    async validateSocialMediaLink(channel) {
        const link = await this.page.getByAltText(channel)
        await expect(link).toBeVisible()
    }
    async verifyExternalServicesCard() {
        const card = this.getElementByText(this.externalServicesHeading)
        await this.findElementByScroll(card)
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
    async verifyFeaturesCard() {
        const card = this.getElementByText('Features')
        await this.findElementByScroll(card)
        await expect(card).toBeVisible()
    }

    async featureNavigation(feature) {
        const featureItem = await this.getElementByText(feature, true)
        await expect(featureItem).toBeVisible()
        
        if(feature === 'Basket Order') {
            await featureItem.click()
            await expect(this.page.getByRole('tab', {name: feature})).toBeVisible()
        }
        else if(feature === 'GTT') {
            await featureItem.click()
            await expect(this.page.getByRole('tab', {name: feature})).toBeVisible()
        }
        else if(feature === 'Stock SIP') {
            await featureItem.click()
            await expect(this.page.getByRole('tab', {name: feature, exact: true})).toBeVisible()
        }
        else if(feature === 'Alerts') {
            await featureItem.click()
            await expect(this.page.getByRole('tab', {name: feature})).toBeVisible()
        }
        else if(feature === 'TradeOne'){
            const featureItem = this.page.getByText(feature)
            const newTab = await this.validateNewTab(featureItem)
            await expect(newTab.url()).toContain(urls.trade_one)
        }
        else if(feature === 'Smart API') {
            const item = this.page.getByText('Smart API')
            const newTab = await this.validateNewTab(item)
            const smartAPI = newTab.getByRole('link', { name: 'SmartAPI logo' })
            await expect(smartAPI).toBeVisible()
        }
        else if(feature === 'Stock Pledging'){
            await featureItem.click()
            const item = this.page.getByText('Pledged')
            await expect(item).toBeVisible()
        }
        else if(feature === 'For advanced F&O analysis') {
            const newTab = await this.validateNewTab(featureItem)
            await expect(newTab.url()).toContain(urls.sensibull)
        }
    }

    async validateNewsTabInHome() {
        await expect(this.page.getByRole
        ('heading', { name: this.news, exact: true }))
            .toBeVisible()
    }
    async verifyNewsNavigation(){
        const view_all = this.page.locator('div').filter({ hasText: /^NewsVIEW ALL$/ }).getByRole('button')
        await view_all.click()
        const newsTab = this.page.getByText(this.news, { exact: true })
        await expect(newsTab).toBeVisible()
    }
    async verifyMarketMoverHeading() {
        const header = this.getHeadingElement('Market Movers')
        await expect(header).toBeVisible()
    }
    async verifyGainerLooserNavigation(category) {
        await this.page.getByRole('button', { name: category }).click()
        await this.page.getByRole('button', { name: 'VIEW ALL ' }).first().click()
        await expect(this.getElementByText(category)).toBeVisible()
    }
    async verifyHighLowNavigation(category) {
        await this.page.getByRole('button', { name: category }).click()
        await this.page.getByRole('button', { name: 'VIEW ALL ' }).nth(1).click()
        await expect(this.getElementByText('52W '+category)).toBeVisible()
    }
}