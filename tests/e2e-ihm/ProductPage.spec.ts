import{ expect, test } from '@playwright/test';
import{ ProductPage } from '../../pages/ProductPage';
import { BASE_URL } from '../../utils/envConfig';

test.describe("product page ", ()=>{

    let productPage : ProductPage

    test.beforeEach(async ({page})=>{
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        console.log('Navigated to the product page');
        await expect(page).toHaveURL("https://valentinos-magic-beans.click/")
    })
    test('first item is added to the shopping cart', async({page})=> {
    await productPage.addFirstProductToCart(page);
    })  

   test('add ALL products in cart', async({page})=> {
    
  // await productPage.addAllProductToCart(page);
    await productPage.getAllProductsName(page);

   })
})
