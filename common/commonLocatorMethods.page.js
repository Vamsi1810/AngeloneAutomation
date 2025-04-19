import {expect} from "@playwright/test";

export class commonLocatorMethodsPage {
    constructor(page) {
        this.page = page
    }

    getButtonElement(buttonName) {
        return this.page.getByRole('button', { name: buttonName })
    }

    getHeadingElement(text) {
        return this.page.getByRole('heading', { name: text })
    }

    getElementByText(text, exact = false) {
        return exact ? this.page.getByText(text, {exact: true}) : this.page.getByText(text)
    }

    getElementByTitle(titleName) {
        return this.page.getByTitle(titleName)
    }

    getElementByDataTestId(testId) {
        return this.page.getByTestId(testId)
    }

    getElementByTextAndTag(tagName, text) {
        return this.page.locator(`${tagName}`, {hasText: `${text}`})
    }

    getElementAfterFilterApplied(parentLoc, childLoc) {
        return parentLoc.filter({has : childLoc})
    }

    getElementByFilterText(locator, text) {
        return locator.filter({hasText: text})
    }

    getMpinElement() {
        return this.page.locator('input#login\\|input\\|mpin')
    }
    async validateNewTabUrl(elementClick, newUrl) {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            elementClick.click(),
        ])
        await newTab.waitForLoadState('load')

        const newTabUrl = newTab.url()
        await expect(newTabUrl, `Expected url to contain:${newUrl} \nCurrent url:${newTabUrl}`).toContain(newUrl) // Use .toContain for partial match
        await newTab.close()
        await this.page.bringToFront()
    }
}