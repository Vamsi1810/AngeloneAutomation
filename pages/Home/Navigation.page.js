import {commonLocatorMethodsPage} from "../../common/commonLocatorMethods.page";
import {expect} from "@playwright/test";

export class NavigationPage extends commonLocatorMethodsPage {
    constructor(page) {
        super(page)
        this.icons = 'span.icon-nav-'
    }
    async verifyAngelOneLogoVisible(){
        const logo = await this.page.getByAltText('AngelOne Logo')
        await expect(logo).toBeVisible()
    }
    async verifyIndicesVisibleOnHeader(indexName, match) {
        const element = this.getElementByText(indexName, true).first()
        await expect(element).toBeVisible()
    }
    async verifyIconsOnHeader(iconName) {
        const icon = await this.page.locator(this.icons+iconName)
        await expect(icon).toBeVisible()
    }
}