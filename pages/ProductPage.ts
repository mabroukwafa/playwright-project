import {Page} from '@playwright/test';  
import { productPageLocators } from '../locators/ProductPageLocators';

// Provides methods for interacting with products and the shopping cart.
export class ProductPage {

    

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
        console.log(await this.getAddedProductName(page, i))
       
      }
    }

    async getAllProductsName(page:Page){
      console.log(await page.locator(productPageLocators.productWrapper).getByRole('heading').allTextContents());
    }




}