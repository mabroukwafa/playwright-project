import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { BASE_URL } from '../../utils/envConfig';
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { expect } from "@playwright/test";
import { pageFixture } from "./hooks/browserContextFixture";

setDefaultTimeout(30_000);


let productPage: ProductPage
let cartpage: CartPage
let allproducts: string[]
let selectedProduct: string

Given('I navigate to the homepage', async () => {
    await pageFixture.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 })
});

When('I click on the first button', async () => {
    productPage = new ProductPage();
    await productPage.addFirstProductToCart(pageFixture.page);
});

When('I add product number {int}', async (productNumber: number) => {
    productPage = new ProductPage();
    const products = await productPage.getAllProductsName(pageFixture.page);

    if (productNumber < 1 || productNumber > products.length) {
        throw new Error(`Product number must be between 1 and ${products.length}.`);
    }

    selectedProduct = products[productNumber - 1];
    await productPage.addAnyProductToCart(pageFixture.page, productNumber - 1);
});

When('Go to the cart page', async()=>{
    await productPage.goToCart(pageFixture.page); 
})

When('I add all products',async()=>{
    await productPage.addAllProductToCart(pageFixture.page)
    allproducts = await productPage.getAllProductsName(pageFixture.page)

})

Then('I should see the first item added', async () => {
    cartpage = new CartPage()
    await cartpage.getFirstProductInCart(pageFixture.page);
    expect (await cartpage.getFirstProductInCart(pageFixture.page)).toEqual(await productPage.getFirstProductName(pageFixture.page))
});

Then('I should see all products added',async()=>{
    cartpage= new CartPage()
    expect(await cartpage.getAllProductsInCart(pageFixture.page)).toEqual(allproducts)
})

Then('I should see the selected product added', async () => {
    cartpage = new CartPage();
    expect(await cartpage.getAllProductsInCart(pageFixture.page)).toContain(selectedProduct);
});