import { useState } from 'react';
import { PRODUCT_URL } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';

export default function UpdateProductPage() {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [renter, setRenter] = useState("");

    const updateProduct = async (event) => {
        event.preventDefault();

        await fetch(PRODUCT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: price,
                renter: renter,
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
        setRenter("");
    };

    return (
        <VStack alignItems="flex-start">
            <Heading>Update Product</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={updateProduct}>
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
                            <FormLabel>Renter</FormLabel>
                            <Input w="50vw" value={renter} onChange={(event) => setRenter(event.target.value)} />
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
