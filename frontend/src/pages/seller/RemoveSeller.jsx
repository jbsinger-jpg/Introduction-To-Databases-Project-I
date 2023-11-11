import { Box, Button, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { SELLER_URL } from '../../backend_config';

export default function RemoveSeller() {
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const removeSeller = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(SELLER_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    address: address,
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
        setAddress("");
        setFirstName("");
        setLastName("");
    };

    return (
        <VStack alignItems="flex-start">
            <Heading>Remove Seller</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={removeSeller}>
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
