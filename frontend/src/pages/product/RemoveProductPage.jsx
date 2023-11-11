import { useState } from 'react';
import { Box, Button, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';

import { PRODUCT_URL } from '../../backend_config';

export default function RemoveProductPage() {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [renter, setRenter] = useState("");

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

    return (
        <VStack alignItems="flex-start">
            <Heading>Remove Product</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={removeProduct}>
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
