import test, { expect } from "@playwright/test";

test('create order', async({request})=>{
    
   // Define the guest customer details and the product to order.
   const orderPayload = {
        customerDetails: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            address: "1234 Main St.",
            city: "Rhyolite",
            zipCode: "89003",
            country: "United States"
        },
        items: [
            {
                productId: "504",
                quantity: 1
            }
        ]
    };

    // send post request 
    const ordeerResponse= await request.post('/orders',{
        data: orderPayload
    });
    const orderBody = await ordeerResponse.json();
    
    // Verify that the API reports success and includes order data.
    expect(orderBody).toHaveProperty('success', true);
    expect(orderBody).toHaveProperty('data');
    console.log(orderBody)
});
