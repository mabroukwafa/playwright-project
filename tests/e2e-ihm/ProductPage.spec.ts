import{ expect, test } from '@playwright/test';
import{ ProductPage } from '../../pages/ProductPage';
import { BASE_URL } from '../../utils/envConfig';

test.describe("product page ", ()=>{

    let productPage : ProductPage

    test.beforeEach(async ({page})=>{
        // Initialize the product page object and open the catalog.
        productPage = new ProductPage();
        await page.goto(BASE_URL);
        console.log('Navigated to the product page');
        await expect(page).toHaveURL("https://valentinos-magic-beans.click/")
    })
    test('first item is added to the shopping cart', async({page})=> {
    // Add the first product to the shopping cart.
    await productPage.addFirstProductToCart(page);
    })  

   test('add ALL products in cart', async({page})=> {
    
  // Retrieve the names of all products displayed in the catalog.
    await productPage.addAllProductToCart(page);
    await productPage.getAllProductsName(page);
   })
})
