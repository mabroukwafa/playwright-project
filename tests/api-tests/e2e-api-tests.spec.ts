import test, { APIRequestContext, expect, Page } from "@playwright/test";

let apiContext: APIRequestContext;

// Creates an HTTP context shared by the API tests.
test.beforeAll(async({ playwright }) =>{

    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.valentinos-magic-beans.click',
        // Adds the HTTP headers sent with each request.
        extraHTTPHeaders:{
            'Accept': 'application/json',
            'Contetnt-Type': 'application/json',
        },
    });
});

// Releases the HTTP context resources after the tests finish.
test.afterAll(async({})=>{
    await apiContext.dispose();
});

test('has tite', async({ page }) =>{
    // Sends a request to the API, then checks that the home page is displayed.
    const newOrderResponse = await apiContext.post('/orders');
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
    // Calls the order lookup endpoint.
    const orderLookUpResponse = await apiContext.post('/orders/lookup');
});

test('get started link', async({ page }) =>{
    // Checks that the "Get started" link leads to the installation page.
    await page.goto('/');
    await page.getByRole('link', {name: 'Get started'}).click();
    await expect(page.getByRole('heading', { name: 'Installation'})).toBeVisible();
});
