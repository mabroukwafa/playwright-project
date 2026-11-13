import { Page } from "@playwright/test";
import { cartPageLocators } from "../locators/CartPageLocator";

// Provides methods for reading product details from the cart page.
export class CartPage {


    async getFirstProductInCart(page: Page) {
        return await page.locator(cartPageLocators.productWrapper).first().getByRole('heading').textContent();
    }

    async getAllProductsInCart(page: Page) {
        const products = await page.locator(cartPageLocators.productWrapper).getByRole('heading').allTextContents();
        return products;
    }


}

