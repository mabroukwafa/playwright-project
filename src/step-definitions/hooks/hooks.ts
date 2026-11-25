import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, firefox } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";


let browser: Browser
// BeforeAll runs one before all scenarios 
BeforeAll(async function(){
    

})
//afterall scenarios
AfterAll(async function(){

})

//before each scenario 
Before(async function(){
    browser= await firefox.launch({headless: false});
    pageFixture.context= await browser.newContext()
    pageFixture.page = await pageFixture.context.newPage()
    
})

//after each scenario 
After(async function(){
    await pageFixture.page.close();
    await browser.close()

})