// ======================================================
// Foreign Key Functions
// ======================================================
const getProductOwner = (ownerId, productData, sellerData) => {
    const productDataCopy = [...productData];
    productDataCopy.filter(product => product.owner === ownerId);

    const sellerID = productDataCopy[0].owner;
    const sellerDataCopy = [...sellerData];

    console.log(sellerID);

    let sellers = sellerDataCopy.map(seller => {
        if (seller.id === sellerID) {
            return (
                seller.first_name + " " + seller.last_name
            );
        }

        return "";
    });

    sellers = sellers.filter(seller => seller !== "");

    return JSON.stringify(sellers[0]);
};

export { getProductOwner };