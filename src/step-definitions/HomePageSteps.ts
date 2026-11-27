import { After, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { BASE_URL } from '../../utils/envConfig';
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { expect } from "@playwright/test";
import { pageFixture } from "./hooks/browserContextFixture";

setDefaultTimeout(30_000);


let productPage: ProductPage
let cartpage: CartPage
let allproducts:any
let firstProduct: any
let product: any

Given('I navigate to the homepage', async () => {
    await pageFixture.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 })
});

When('I click on the first button', async () => {
    productPage = new ProductPage();
    await productPage.addFirstProductToCart(pageFixture.page);
    firstProduct = await productPage.getFirstProductName(pageFixture.page)
});


When('I add all products',async()=>{
    await productPage.addAllProductToCart(pageFixture.page)
    allproducts = await productPage.getAllProductsName(pageFixture.page)
});

When('I add the product NUMBER {int}',async(number: number)=>{
    await productPage.addAnyProductToCart(pageFixture.page,number)
    product = await productPage.getAddedProductName(pageFixture.page,number+1)
    console.log(product)
});

When('Go to the cart page', async()=>{
    await productPage.goToCart(pageFixture.page); 
})

Then('I should see the first item added', async () => {
    cartpage = new CartPage()
    expect (await cartpage.getFirstProductInCart(pageFixture.page)).toEqual(firstProduct)
});

Then('I should see all products added',async()=>{
    cartpage= new CartPage()
    expect(await cartpage.getAllProductsInCart(pageFixture.page)).toEqual(allproducts)
})

Then('I should see the selected product added',async()=>{
    cartpage= new CartPage()
    console.log(await cartpage.getAllProductsInCart(pageFixture.page))
    expect(await cartpage.getAllProductsInCart(pageFixture.page)).toContain(product)
})