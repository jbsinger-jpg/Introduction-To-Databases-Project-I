import { useEffect, useState } from 'react';
import { PRODUCT_URL, SELLER_URL, getInitialData } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';

export default function AddProductPage() {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [seller, setSeller] = useState("");
    const [sellerOptions, setSellerOptions] = useState([]);
    const [sellerData, setSellerData] = useState(null);
    const [sellerDataIsLoaded, setSellerDataIsLoaded] = useState(false);

    const addProduct = async (event) => {
        event.preventDefault();

        await fetch(PRODUCT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: price,
                seller_id: seller,
                description: description
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
        setDescription("");
        setPrice("");
        setSeller("");
    };

    useEffect(() => {
        if (!sellerDataIsLoaded) {
            getInitialData([{ url: SELLER_URL, setData: setSellerData }]);
            if (sellerData) {
                setSellerDataIsLoaded(true);
                let options = [];
                for (let i = 0; i < sellerData.length; i++) {
                    options.push({ label: sellerData[i].first_name + " " + sellerData[i].last_name, key: sellerData[i].id, value: sellerData[i].id });
                }

                setSellerOptions(options);
            }
        }
        // eslint-disable-next-line
    }, [sellerData]);

    return (
        <VStack alignItems="flex-start">
            <Heading>Add Product</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={addProduct}>
                    <VStack
                        alignItems="flex-start"
                    >
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>Price</FormLabel>
                            <Input w="50vw" value={price} onChange={(event) => setPrice(event.target.value)} />
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
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>Description</FormLabel>
                            <Input w="50vw" value={description} onChange={(event) => setDescription(event.target.value)} />
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
