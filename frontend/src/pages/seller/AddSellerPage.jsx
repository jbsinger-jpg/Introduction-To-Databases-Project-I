import { Box, Button, FormLabel, HStack, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { SELLER_URL } from '../../backend_config';

export default function AddSellerPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    const toast = useToast();

    const addSeller = async (event) => {
        event.preventDefault();

        await fetch(SELLER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                address: `${street}, ${city}, ${state}, ${zip}`
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ' + JSON.stringify(data));
                if (data.message === 'Seller already exists') {
                    toast({
                        title: "Duplicate Seller",
                        description: data.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
                else {
                    toast({
                        title: "Info",
                        description: data.message,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error: ' + error);
            });
    };

    const handleClearEntries = () => {
        setFirstName("");
        setLastName("");
        setStreet("");
        setCity("");
        setState("");
        setZip("");
    };

    return (
        <VStack alignItems="flex-start">
            <Heading>Add Seller</Heading>
            <Box
                display="flex"
            >
                <form onSubmit={addSeller}>
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
                            <HStack>
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>Street</FormLabel>
                                    <Input
                                        value={street}
                                        onChange={(event) => setStreet(event.target.value)}
                                        isRequired
                                    />
                                </VStack>
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>City</FormLabel>
                                    <Input
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
                                        isRequired
                                    />
                                </VStack>
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>State</FormLabel>
                                    <Input
                                        value={state}
                                        onChange={(event) => setState(event.target.value)}
                                        isRequired
                                    />
                                </VStack>
                                <VStack
                                    alignItems="flex-start"
                                >
                                    <FormLabel>Zip</FormLabel>
                                    <Input
                                        value={zip}
                                        onChange={(event) => setZip(event.target.value)}
                                        isRequired
                                    />
                                </VStack>
                            </HStack>
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
