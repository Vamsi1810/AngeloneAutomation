import {commonLocatorMethodsPage} from "../common/commonLocatorMethods.page";
import {LoginPage} from "./Login/Login.page";
import {HomePage} from "./Home/Home.page";
import { NavigationPage } from "./Home/Navigation.page";

export class pageFactory extends commonLocatorMethodsPage{
    constructor(page) {
        super(page)
    }
    async HomePage() {
        return new HomePage(this.page)
    }
    async LoginPage() {
        return new LoginPage(this.page)
    }
    async NavigationPage() {
        return new NavigationPage(this.page)
    }
}