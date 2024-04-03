const express = require('express');
const axios = require('axios');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Access token for authentication
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTUwNDI1LCJpYXQiOjE3MTIxNTAxMjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY2MTg1OWI4LTg1NjUtNDNjZC1hOTE0LTlhMTVlYjM2M2NlNiIsInN1YiI6InNzNTkwOUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI2NjE4NTliOC04NTY1LTQzY2QtYTkxNC05YTE1ZWIzNjNjZTYiLCJjbGllbnRTZWNyZXQiOiJnbU1Cb2JNdENuRFdQQkdlIiwib3duZXJOYW1lIjoiU3VqYWwgR2FuZ3NoZXR0aXdhciIsIm93bmVyRW1haWwiOiJzczU5MDlAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjExMTAwMzAxMDgxMCJ9.teiITg6pH7K1RcQudbPG0npj77R4y5E_pujzsVk2-GE";

// Function to make authenticated requests to the test server
const makeRequestToTestServer = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error making request to test server:", error);
    throw error;
  }
};

// GET /categories/:categoryname/products endpoint
app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top, minPrice, maxPrice, sortBy, sortOrder, page } = req.query;

  try {
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`;
    const products = await makeRequestToTestServer(url);
    res.json(products);
  } catch (error) {
    console.error("Error handling request to get products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /categories/:categoryname/products/:productid endpoint
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`;
    const product = await makeRequestToTestServer(url);
    res.json(product);
  } catch (error) {
    console.error("Error handling request to get product details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Top Products Microservice!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
