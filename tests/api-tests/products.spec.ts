import {test, expect} from '@playwright/test';

test('get all products',async({request})=>{
    
    // Request the complete product catalog.
    const response = await request.get('/products');
    
    // Verify that the request succeeded and returned JSON.
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(response.headers()['content-type']).toBe('application/json');
    
    // Check that the response contains a non-empty list of products.
    const responseBody = await response.json();
    
    expect(responseBody).toHaveProperty('success',true);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
    console.log(responseBody);

});