import { useEffect, useState } from 'react';
import { PRODUCT_URL, RENTER_URL, SELLER_URL, TRANSACTION_URL, getInitialData } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';

export default function AddTransaction() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

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

    const addTransaction = async (event) => {
        event.preventDefault();

        await fetch(TRANSACTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startTime: startTime,
                endTime: endTime,
                seller: seller,
                renter: renter,
                product: product,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ' + JSON.stringify(data));
            })
            .catch((error) => {
                console.error('Error: ' + error);
            });
    };

    const handleClearEntries = () => {
        setEndTime("");
        setStartTime("");
        setSeller("");
        setRenter("");
    };

    useEffect(() => {
        if (!sellerDataIsLoaded && !renterDataIsLoaded && !productDataIsLoaded) {
            getInitialData([
                { url: SELLER_URL, setData: setSellerData },
                { url: RENTER_URL, setData: setRenterData },
                { url: PRODUCT_URL, setData: setProductData },
            ]);

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
    }, [sellerData, renterData, productData]);

    return (
        <VStack alignItems="flex-start">
            <Heading>Add Transaction</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={addTransaction}>
                    <VStack
                        alignItems="flex-start"
                    >
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>Start Time</FormLabel>
                            <Input w="50vw" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
                        </VStack>
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>End Time</FormLabel>
                            <Input w="50vw" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
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
    );
}
