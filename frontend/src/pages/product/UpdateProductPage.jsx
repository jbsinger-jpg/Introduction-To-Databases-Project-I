import { useState } from 'react';
import { PRODUCT_URL } from '../../backend_config';
import { Box, Button, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';

export default function UpdateProductPage() {
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const updateProduct = async (event) => {
        event.preventDefault();

        await fetch(PRODUCT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                address: address
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
        setAddress("");
        setFirstName("");
        setLastName("");
    };

    return (
        <VStack alignItems="flex-start">
            <Heading>Add Seller</Heading>
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
                            <FormLabel>First Name</FormLabel>
                            <Input w="50vw" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                        </VStack>
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>Last Name</FormLabel>
                            <Input w="50vw" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                        </VStack>
                        <VStack
                            alignItems="flex-start"
                        >
                            <FormLabel>Address</FormLabel>
                            <Input w="50vw" value={address} onChange={(event) => setAddress(event.target.value)} />
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
