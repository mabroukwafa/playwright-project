import{test, expect} from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";

test('print api calls to products', async({page})=>{
    // Log each outgoing request's HTTP method and URL.
    page.on('request', request => 
        console.log(request.method(), request.url()));
    // Open the products page and wait for its network activity to finish.
    await page.goto('/products');
    await page.waitForLoadState('networkidle')
  
})

test ('intercept api call to products',async({page})=>{
    
    // Define sample product data to return instead of calling the live API.
    const someProducts = {
        success: true,
        source: 'dynamodb',
        data: [{
            name: 'Product 1',
            price: 10.99,
            id: '0'
        },
        {
            name: 'Product 2',
            price: 20.99,
            id: '1'
        }
        ]
    }       
    // Fulfill requests to the products endpoint with the sample response.
    await page.route('https://api.valentinos-magic-beans.click/products', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(someProducts)
        })
    })
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    // Verify that the first mocked product appears on the page.
    let productpage = new ProductPage(page);
    await productpage.getAllProductsName(page);
    const firstProductHeading = page.getByRole('heading', {
        name: someProducts.data[0].name
    })
    await expect(firstProductHeading).toBeVisible()
})
