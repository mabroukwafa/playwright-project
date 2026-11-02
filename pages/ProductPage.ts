import {Page} from '@playwright/test';  
import { productPageLocators } from '../locators/ProductPageLocators';

export class ProductPage {

    constructor(private page: Page) {}
   
   /* async addFirstProductToCart() {
        const firstProductWrapper = this.page.locator(productPageLocators.productWrapper ).first()
        await firstProductWrapper.getByRole('button', {name: productPageLocators.buttonAddToCartName}).click()
    }*/
    async addFirstProductToCart(page:Page) {
       await page.locator(productPageLocators.locatorAddToCart).first().click();
       
    }  

    async goToCart(page:Page) {
        await page.locator(productPageLocators.cartbtnAttribute).click();
    }

    async getFirstProductName(page:Page) {
        const firstProductWrapper = page.locator(productPageLocators.productWrapper ).first()
        const firstProductName= await firstProductWrapper.getByRole('heading').first().textContent()
        return firstProductName
    }   

    async addAnyProductToCart(page:Page, nth:number) {
      await page.locator(productPageLocators.locatorAddToCart).nth(nth).click();   
    }

    async getAddedProductName(page:Page, nth:number ) {
        const productWrapper = await page.locator(productPageLocators.productWrapper).nth(nth)
        const addedProductName= await productWrapper.getByRole('heading').first().textContent()
        return addedProductName
    }
    
    async addAllProductToCart(page:Page){
      const buttons = await page.locator(productPageLocators.locatorAddToCart)
      const count= await buttons.count();
      console.log(count);
      for(let i=0;i<count;i++)
      {
        await buttons.nth(i).click();
        console.log(await this.getAddedProductName(this.page, i))
       
      }
    }
   

   /* async addAllProductsToCart(): Promise<void> {
  const products = this.page.locator(productPageLocators.productWrapper);
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const addButton = products
      .nth(i)
      .getByRole('button', {
        name: productPageLocators.buttonAddToCartName,
        exact: true,
      });

    await addButton.click();
  }
}*/

}