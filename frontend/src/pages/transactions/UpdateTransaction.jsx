import { useEffect, useState } from "react";
import { PRODUCT_URL, RENTER_URL, SELLER_URL, TRANSACTION_URL, getInitialData } from "../../backend_config";
import { Box, Button, FormLabel, HStack, Heading, Select, VStack } from "@chakra-ui/react";

export default function UpdateTransaction() {
    // transaction data
    const [transactionData, setTransactionData] = useState(null);
    const [transactionOptions, setTransactionOptions] = useState(null);
    const [transactionDataIsLoaded, setTransactionDataIsLoaded] = useState(false);
    const [transaction, setTransaction] = useState("");

    // Seller variables
    const [seller, setSeller] = useState("");
    const [sellerOptions, setSellerOptions] = useState([]);
    const [sellerData, setSellerData] = useState(null);
    const [sellerDataIsLoaded, setSellerDataIsLoaded] = useState(false);

    // Renter variables
    const [renter, setRenter] = useState("");
    const [renterOptions, setRenterOptions] = useState([]);
    const [renterData, setRenterData] = useState(null);
    const [renterDataIsLoaded, setRenterDataIsLoaded] = useState(false);

    // Product variables
    const [product, setProduct] = useState("");
    const [productOptions, setProductOptions] = useState([]);
    const [productData, setProductData] = useState(null);
    const [productDataIsLoaded, setProductDataIsLoaded] = useState(false);

    const updateTransaction = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${TRANSACTION_URL}/${transaction}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`DELETE request failed with status ${response.status}`);
            }

            // Process the successful response
            const result = await response.json();
            console.log('DELETE successful:', result);

            getInitialData([{ url: TRANSACTION_URL, setData: setTransactionData }]);
        } catch (error) {
            console.error('DELETE request error:', error.message);
        }
    };

    const handleClearEntries = () => {
        setRenter("");
        setSeller("");
        setTransaction("");
        setProduct("");
    };

    useEffect(() => {
        if (!transactionDataIsLoaded && !sellerDataIsLoaded && !renterDataIsLoaded && !productDataIsLoaded) {
            getInitialData([
                { url: SELLER_URL, setData: setSellerData },
                { url: RENTER_URL, setData: setRenterData },
                { url: PRODUCT_URL, setData: setProductData },
                { url: TRANSACTION_URL, setData: setTransactionData }
            ]);

            if (transactionData) {
                setTransactionDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < transactionData.length; i++) {
                    options.push({ label: transactionData[i].alias, key: transactionData[i].id, value: transactionData[i].id });
                }

                setTransactionOptions(options);
            }

            if (renterData) {
                setRenterDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < renterData.length; i++) {
                    options.push({ label: renterData[i].first_name + " " + renterData[i].last_name, key: renterData[i].id, value: renterData[i].id });
                }

                setRenterOptions(options);
            }

            if (sellerData) {
                setSellerDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < sellerData.length; i++) {
                    options.push({ label: sellerData[i].first_name + " " + sellerData[i].last_name, key: sellerData[i].id, value: sellerData[i].id });
                }

                setSellerOptions(options);
            }

            if (productData) {
                setProductDataIsLoaded(true);
                let options = [];

                for (let i = 0; i < productData.length; i++) {
                    options.push({ label: productData[i].description, key: productData[i].id, value: productData[i].id });
                }

                setProductOptions(options);
            }
        }
        // eslint-disable-next-line
    }, [transactionData, productData, sellerData, renterData]);

    return (
        <>
            {transactionData && transactionData.length ?
                <VStack alignItems="flex-start">
                    <Heading>Update Transaction</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={updateTransaction}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <VStack alignItems="start">
                                    <FormLabel>Transaction</FormLabel>
                                    <Select w="50vw"
                                        value={transaction}
                                        onChange={(event) => {
                                            setTransaction(event.target.value);
                                            for (let i = 0; i < transactionData.length; i++) {
                                                if (Number(transactionData[i].id) === Number(event.target.value)) {
                                                    setSeller(transactionData[i].seller_id);
                                                    setRenter(transactionData[i].renter_id);
                                                    setProduct(transactionData[i].product_id);
                                                }
                                                else {
                                                    handleClearEntries();
                                                }
                                            }
                                        }}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {transactionOptions && transactionOptions.map(transaction => {
                                            return (
                                                <option
                                                    key={transaction.key}
                                                    value={transaction.value}
                                                >
                                                    {transaction.label}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </VStack>
                                <VStack alignItems="start">
                                    <FormLabel>Product</FormLabel>
                                    <Select w="50vw"
                                        value={product}
                                        onChange={(event) => setProduct(event.target.value)}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {productOptions && productOptions.map(product => {
                                            return (
                                                <option
                                                    key={product.key}
                                                    value={product.value}
                                                >
                                                    {product.label}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </VStack>
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>Seller</FormLabel>
                                    <Select w="50vw"
                                        value={seller}
                                        onChange={(event) => setSeller(event.target.value)}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {sellerOptions && sellerOptions.map(seller => {
                                            return (
                                                <option
                                                    key={seller.key}
                                                    value={seller.value}
                                                >
                                                    {seller.label}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </VStack>
                                <VStack alignItems="start">
                                    <FormLabel>Renter</FormLabel>
                                    <Select w="50vw"
                                        value={renter}
                                        onChange={(event) => setRenter(event.target.value)}
                                    >
                                        <option value="" key={-1}>N/A</option>
                                        {renterOptions && renterOptions.map(renter => {
                                            return (
                                                <option
                                                    key={renter.key}
                                                    value={renter.value}
                                                >
                                                    {renter.label}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </VStack>
                                <HStack bottom="0" position="fixed" w="90vw">
                                    <Button type="submit"> Submit </Button>
                                    <Button onClick={handleClearEntries}> Clear </Button>
                                </HStack>
                            </VStack>
                        </form>
                    </Box>
                </VStack>
                :
                <VStack h="70vh" w="50vw" alignItems="center" justifyContent="center">
                    <div>
                        No transactions Exist Add One!
                    </div>
                </VStack>
            }
        </>
    );
}
