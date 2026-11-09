import { Page } from "@playwright/test";
import { signUpPageLocators } from "../locators/SignUpPageLocator";

// Provides method for completing and submitting the sign-up form.
export class SignUpPage {
    
    async fillSignUpForm(page: Page, firstName: string, lastName: string, email: string, password: string) {

        await page.locator(signUpPageLocators.firstNameInput).fill(firstName); 
        await page.locator(signUpPageLocators.lastNameInput).fill(lastName); 
        await page.locator(signUpPageLocators.emailInput).fill(email); 
        await page.locator(signUpPageLocators.passwordInput).fill(password);
        await page.locator(signUpPageLocators.signUpButton).click();

    }


}