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
    async validateNewTab(element) {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            element.click(),
        ])
        // Don't close the new tab here, let the caller handle it
        return newTab
    }

    async findElementByScroll(target){
        for (let i = 0; i < 10; i++) {
            try {
                const count = await target.count()
                if (count > 0) {
                    // Check if element is visible in viewport
                    const isVisible = await target.first().isVisible().catch(() => false)
                    if (isVisible) {
                        break
                    }
                }
                await this.page.mouse.wheel(0, 1000); // Scroll down
                // Wait for DOM to stabilize after scrolling
                await this.page.waitForLoadState('domcontentloaded');
            } catch (error) {
                // If page is closed or context is invalid, break out of loop
                console.warn(`Error in findElementByScroll: ${error.message}`);
                break;
            }
        }
    }
}