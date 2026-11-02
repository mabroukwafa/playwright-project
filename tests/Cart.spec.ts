/*import {test, expect} from 'playwright/test'
import { productPageLocators } from '../locators/ProductPageLocators'

test('item is added to the shopping cart', async({page})=> {

    await page.goto('https://valentinos-magic-beans.click/')

    const firstProductWrapper = page.locator(productPageLocators.firstProductWrapper ).first()
    const firstProductName= await firstProductWrapper.getByRole('heading').first().textContent()
    const firstProductPrice= await firstProductWrapper.locator(productPageLocators.firstProductPrice).first().textContent()
    const firstButton= firstProductWrapper.getByRole('button', {name: productPageLocators.buttonAddToCartName})
    
    await firstButton.click()
    
   

    await page.locator(productPageLocators.cartbtnAttribute).getByRole('button').click()

    const firstProductHeading = page.getByRole('heading', {name: firstProductName! })

    //await expect (firstProductHeading).toBeVisible()
    //const subTotalWrapper = await page.getByText('Subtotal').textContent()
    const subTotalWrapper = await page.locator('.justify-between').getByText('Subtotal').locator('..')
    const subtotal = await subTotalWrapper.locator('.font-semibold').textContent()                 

    console.log(subtotal)
    const numberPrice= Number(subtotal?.substring(1))
    const priceNumber= Number(firstProductPrice?.substring(1))
    expect (numberPrice).toEqual(priceNumber)
})*/