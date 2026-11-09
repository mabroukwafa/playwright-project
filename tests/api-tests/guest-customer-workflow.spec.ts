import test, { expect } from "@playwright/test";

test('browser product and create order', async({request})=>{
// Fetch the product catalog and verify the request succeeded.
const productsResponse = await request.get('/products');
expect(productsResponse.status()).toBe(200);

// Confirm the response contains a successful list of products.
const productsBody = await productsResponse.json();
expect(productsBody.success).toBe(true);
expect(Array.isArray(productsBody.data)).toBe(true)

// Select a product that has stock available for the order.
const products = productsBody.data;
const availableProduct = products.find(product => product.stock >0);
expect(availableProduct).toBeDefined();
expect(availableProduct.stock).toBeGreaterThan(0);

// Prepare a guest customer order containing one available product.
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
        productId: availableProduct.id,
        quantity: 1
      }
    ]
  };
const orderResponse = await request.post('/orders',{
    data: orderPayload
})

// Verify the API accepted the order and returned JSON.
expect(orderResponse.status()).toBe(201)
expect(orderResponse.headers()['content-type']).toBe('application/json');

const orderBody = await orderResponse.json();

console.log('order created', orderBody);

// Check the success flag and the expected order details.
expect(orderBody).toHaveProperty('success',true);

const orderData = orderBody.data;
expect(orderData).toHaveProperty('orderId');
expect(orderData).toHaveProperty('message','Order created successfully')

// Ensure the generated order ID is a non-empty string.
expect(typeof orderData.orderId).toBe('string');
expect(orderData.orderId.length).toBeGreaterThan(0)

})