const BASE_URL = 'http://localhost:8081/';
// ======================================================
// Route conventions specified in server.js
// ======================================================
// Example: app.get('/renter' ...
const RENTER_URL = BASE_URL + 'renter';
const PRODUCT_URL = BASE_URL + 'product';
const PRODUCT_OWNER_URL = BASE_URL + "product_owners";
const SELLER_URL = BASE_URL + 'seller';
const TRANSACTION_URL = BASE_URL + 'transaction';

// ======================================================
// Helper Functions
// ======================================================
const getInitialData = (URLs) => {
    for (let i = 0; i < URLs.length; i++) {
        fetch(URLs[i].url)
            .then(res => res.json())
            .then(data => URLs[i].setData(data))
            .catch(error => console.log(error));
    }
};

export {
    RENTER_URL,
    PRODUCT_URL,
    SELLER_URL,
    PRODUCT_OWNER_URL,
    TRANSACTION_URL,
    getInitialData
};