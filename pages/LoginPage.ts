import {Page} from '@playwright/test';
import {loginPageLocators} from '../locators/LoginPageLocator';

// Provides method for filling in and submitting the login form.
export class LoginPage {

    async fillLoginForm(page: Page, email: string, password: string) {
        await page.locator(loginPageLocators.loginEmail).fill(email);
        await page.locator(loginPageLocators.loginPassword).fill(password);
        await page.locator(loginPageLocators.buttonLogin).click();
    }
}
