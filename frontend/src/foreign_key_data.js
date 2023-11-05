// ======================================================
// Foreign Key Functions
// ======================================================
// TODO: See if there is a way to make an app route with the foreign key
// relationship now that you know that this exists, should not have to merge
// two tables on the frontend
const getProductOwner = (ownerId, productData, sellerData) => {
    const productDataCopy = [...productData];
    productDataCopy.filter(product => product.owner === ownerId);

    const sellerID = productDataCopy[0].owner;
    const sellerDataCopy = [...sellerData];

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