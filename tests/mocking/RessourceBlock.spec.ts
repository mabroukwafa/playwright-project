import{test} from '@playwright/test';

test('Block resources',async({page})=> {
    // Intercept requests and abort image resources while allowing others through.
    await page.route('**/*',(route)=>{
        if(route.request().resourceType() === 'image'){
            return route.abort();
        }
        return route.continue();
    });
    // Open the products page and wait for its remaining network activity to finish.
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

})