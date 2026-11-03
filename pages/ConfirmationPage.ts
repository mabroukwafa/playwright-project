import { Page } from "@playwright/test";
import { confirmationPageLocators} from "../locators/ConfirmationPageLocator";

export class ConfirmationPage {

    async fillConfirmationCode(page: Page, number: string) {
        await page.locator(confirmationPageLocators.confirmationNumberLocator).fill(number); 
        await page.locator(confirmationPageLocators.confirmButton).click();  
        }
    

}