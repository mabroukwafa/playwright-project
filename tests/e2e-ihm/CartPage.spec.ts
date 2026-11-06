import{ expect, test } from '@playwright/test';
import{ ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { BASE_URL, CART_URL } from '../../utils/envConfig';

test.describe("cart page validation", ()=>{

    let productPage : ProductPage
    let cartPage : CartPage

    test.beforeEach(async ({page})=>{
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await page.goto(BASE_URL);
        await expect(page).toHaveURL("https://valentinos-magic-beans.click/")
    })
 

    test('validate first product in the cart page', async({page})=> {
    await productPage.addFirstProductToCart(page);
    await productPage.goToCart(page);
    await expect(page).toHaveURL(CART_URL)
    console.log(await cartPage.getFirstProductInCart(page))
    console.log(await productPage.getFirstProductName(page))
    expect (await cartPage.getFirstProductInCart(page)).toEqual(await productPage.getFirstProductName(page))
    }) 

   test('validate one product in the cart page', async({page})=> {
        const nth= 2
        const productToaddName = await productPage.getAddedProductName(page, nth)
        await productPage.addAnyProductToCart(page, nth)
        await productPage.goToCart(page)
        await expect(page).toHaveURL(CART_URL)
        console.log(await cartPage.getFirstProductInCart(page))
        console.log(productToaddName)
        expect (await cartPage.getFirstProductInCart(page)).toEqual(productToaddName)
    }) 

    test('validate any product in the cart page', async({page})=> {

        const firtsproductToaddName = await productPage.getAddedProductName(page, 1)
        const secondproductToaddName = await productPage.getAddedProductName(page, 0)

        await productPage.addAnyProductToCart(page, 0)
        await productPage.addAnyProductToCart(page, 1)
        
        await productPage.goToCart(page)
        await expect(page).toHaveURL(CART_URL)
        console.log(await cartPage.getAllProductsInCart(page))
        console.log(firtsproductToaddName)
        console.log(secondproductToaddName)
        //expect (await cartPage.getFirstProductInCart(page)).toEqual(productToaddName)
    }) 

    

})
