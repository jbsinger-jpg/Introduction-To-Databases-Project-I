import { useEffect, useState } from 'react';
import { Box, Button, FormLabel, HStack, Heading, Select, VStack } from '@chakra-ui/react';

import { PRODUCT_URL, getInitialData } from '../../backend_config';

export default function RemoveProductPage() {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [renter, setRenter] = useState("");

    const [productData, setProductData] = useState(null);
    const [productOptions, setProductOptions] = useState(null);
    const [productDataIsLoaded, setProductDataIsLoaded] = useState(false);
    const [selectedProductOption, setSelectedProductOption] = useState("");

    const removeProduct = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(PRODUCT_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: price,
                    renter: renter,
                    description: description
                }),
            });

            if (!response.ok) {
                throw new Error(`DELETE request failed with status ${response.status}`);
            }

            // Process the successful response
            const result = await response.json();
            console.log('DELETE successful:', result);
        } catch (error) {
            console.error('DELETE request error:', error.message);
        }
    };

    const handleClearEntries = () => {
        setDescription("");
        setPrice("");
        setRenter("");
    };

    useEffect(() => {
        if (!productDataIsLoaded) {
            getInitialData([{ url: PRODUCT_URL, setData: setProductData }]);

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
    }, [productData]);

    return (
        <>
            {productData && productData.length ?
                <VStack alignItems="flex-start">
                    <Heading>Remove Product</Heading>
                    <Box
                        display="flex"
                    >
                        <form onSubmit={removeProduct}>
                            <VStack
                                alignItems="flex-start"
                            >
                                <FormLabel>Product Options</FormLabel>
                                <Select w="50vw"
                                    value={selectedProductOption}
                                    onChange={(event) => setSelectedProductOption(event.target.value)}
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
                        No Products Exist Add One!
                    </div>
                </VStack>
            }
        </>
    );
}
